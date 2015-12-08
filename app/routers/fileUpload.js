import {Router} from 'express';
import uuid from 'node-uuid';
import S3Policy from 's3-policy';
import env from 'require-env';
import bodyParser from 'body-parser';
import cors from 'cors';

const S3_BUCKET = env.require('S3_BUCKET');
const S3_KEY = env.require('S3_KEY');
const S3_SECRET = env.require('S3_SECRET');
const PUBLIC_READ_ACL = 'public-read';

const router = Router();
router.use(cors());
router.use(bodyParser.json());

router.post('/policy', (req, res) => {
  const {extension} = req.body;
  const payload = S3Policy({
    secret: S3_SECRET,
    bucket: S3_BUCKET,
    key: S3_KEY,
    expires: new Date(Date.now() + 60000),
    acl: PUBLIC_READ_ACL,
    conditions: [{success_action_status: '200'}]
  });

  const policy = {
    AWSAccessKeyId: S3_KEY,
    acl: PUBLIC_READ_ACL,
    policy: payload.policy,
    signature: payload.signature,
    success_action_status: 200,
    key: `images/${uuid.v1()}.${extension}`,
    'Content-Length': ''
  };

  res.json({
    policy,
    s3BucketName: S3_BUCKET
  });
});

export default router;


