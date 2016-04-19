module.exports = {
  dirname: 'uploads',
  bucket: process.env.AWS_PROJECT4_BUCKET_NAME,
  secretAccessKey: process.env.AWS_PROJECT4_SECRET_KEY,
  accessKeyId: process.env.AWS_PROJECT4_ACCESS_KEY,
  region: 'eu-west-1',
  endpoint: 'https://s3-eu-west-1.amazonaws.com/'
};