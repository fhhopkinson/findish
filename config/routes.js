var router                   = require('express').Router();
var multer                   = require('multer');
var s3                       = require('multer-s3');
var uuid                     = require('uuid');
var jwt                      = require('jsonwebtoken');

var staticController = require('../controllers/static');
var authController = require('../controllers/authentication');
var challengesController = require('../controllers/challenges');
var s3Config = require('./s3');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

var upload = multer({
  storage: s3({
    dirname: s3Config.dirname,
    bucket: s3Config.bucket,
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    region: s3Config.region,
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    filename: function(req, file, next) {
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

router.post('/auth/facebook', authController.facebook);
router.post('/auth/github', authController.github);

router.route('/challenges')
  .get(challengesController.index)
  .put(challengesController.create)
  .post(upload.single('file'));

 router.route('/challenges/:id')
   .get(challengesController.show)
   .put(challengesController.update)
   .delete(challengesController.delete);

router.get('/', staticController.index)

module.exports = router;
