import env from 'require-env';

const S3_IMGIX_MAP = env.require('S3_IMGIX_MAP').split(',').map(str => str.split('|'));

function encodeQueryParams(params) {
  const fragments = [];
  for (let key of Object.keys(params)) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      fragments.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return fragments.join('&');
}

function makeImgixUrl(url) {
  if (!url) { return null; }
  for (const [s3Host, imgixHost] of S3_IMGIX_MAP) {
    const maybeImgix = url.replace(s3Host, imgixHost);
    if (maybeImgix.includes(imgixHost)) {
      return maybeImgix;
    }
  }
  return null;
}

const DEFAULT_ARGS = {
  fit: 'max'
};

export function scaledImageUrl(url, args = {}) {
  const imgixUrl = makeImgixUrl(url);
  if (!imgixUrl) { return url; }
  if (!Object.keys(args).length) { return imgixUrl; }

  const {width: w, height: h, pixelRatio: dpr, fit} = args;
  const params = encodeQueryParams({...DEFAULT_ARGS, w, h, dpr, fit});
  return imgixUrl + '?' + params;
}
