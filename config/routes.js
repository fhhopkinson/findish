var router                   = require('express').Router();
var multer                   = require('multer');
var s3                       = require('multer-s3');
var uuid                     = require('uuid');
var jwt                      = require('jsonwebtoken');
var cors                     = require('cors');
var morgan                   = require('morgan');

var staticController = require('../controllers/static');
var authController = require('../controllers/authentication');
var challengesController = require('../controllers/challenges');
var s3Config = require('../config/s3');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

//IMAGE UPLOADER
//router.use(morgan('dev'));
//router.use(cors({
// origin: 'http://localhost:8000'
//}));

var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: s3Config.dirname,
    // set this to your bucket name
    bucket: s3Config.bucket,
    // your AWS keys
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    // the region of your bucket
    region: s3Config.region,
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

// This will upload a single file.
// router.post('/upload/single', upload.single('file'), function(req, res) {
//   res.status(200).json({ filename: req.file.key });
// });
//router.listen(PORT);
//console.log("Express is listening on port " + PORT);

router.post('/auth/facebook', authController.facebook);
router.post('/auth/github', authController.github);

//router.route('/users')
//  .get(usersController.index);

//router.route('/users/:id')
//.get(usersController.show)
 // .put(upload.single('avatar'), usersController.update);

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
