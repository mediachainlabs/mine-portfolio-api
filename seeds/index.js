
export const seed = async (knex) => {
  await knex('images').del();
  await knex('users').del();

  await knex('users').insert({username: 'foo'});
  const user = await knex('users').first();

  const images = [
    'https://mine-prod.s3.amazonaws.com/images/b79a6982de4217a429f06dc887e02995381c6fdc.jpg',
    'https://mine-prod.s3.amazonaws.com/images/169f9418a465cd6727454d0b421c66c750146268.jpg',
    'https://mine-prod.s3.amazonaws.com/images/804dedfaea8e7c73337b1ac6ad2b80fecd6b91e1.jpg',
    'https://mine-prod.s3.amazonaws.com/images/bb6a9b39bc4cea664635ea49d64cd9267ff1e180.jpg',
    'https://mine-prod.s3.amazonaws.com/images/823243354a27bc8cb030e03d3cebcf6403b0abfc.jpg',
  ];

  const user_id = user.id;

  for (let image_url of images) {
    await knex('images').insert({
      image_url,
      user_id
    });
  }
};
