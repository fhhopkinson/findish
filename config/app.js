module.exports = {
  port: process.env.PORT || 8000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost/selfless',
  secret: 'notVerySecret'
}