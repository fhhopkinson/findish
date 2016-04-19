var Challenge = require('../models/challenge');
// var s3Config = require('../config/s3');

function challengesIndex(req, res) {
	Challenge.find(function(err, challenges) {
		if(err) res.status(404).send(err);

		res.status(200).send(challenges)
	}).select('-__v')
}

//Post

function challengeCreate(req, res) {
	var challenge = new Challenge(req.body);

		challenge.save(function(err) {
			if(error) res.status(500).send(err);
			res.status(201).send(challenge);
		});
}

//get

function challengeShow(req, res) {
	var id = req.params.id;

	Challenge.findById({_id: id}, function(err, challenge) {
		if(err) response.status(404).send(err);
		res.status(200).send(challenge);
	}).select('-__v');
}

//update

function challengeUpdate(req, res) {
	var id = req.params.id;

	Challenge.findById({_id: id}, function(err, challenge) {
		if(err) res.status(404).send(err);

		if(req.body.name) challenge.name = req.body.name;
		if(req.body.desc) challenge.desc = req.body.desc;
		if(req.body.image) challenge.image = req.body.image;
		if(req.body.location) challenge.location = req.body.location;
		if(req.body.position) challenge.position	= req.body.position;

		challenge.save(function(err) {
		  if(err) res.status(500).send(err);

		  res.status(204).send(challenge);
		});
	}).select('-__v');
}

//delete

function challengeDelete(req, res) {
  Challenge.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

module.exports = {
  index: challengesIndex,
  create: challengeCreate,
  show: challengeShow,
  update: challengeUpdate,
  delete: challengeDelete
}