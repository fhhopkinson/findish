var Challenge = require('../models/challenge');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/selfless');

Challenge.collection.drop();


Challenge.create([{
	name: "Places",
	location: "London",
	image: "https://media.timeout.com/images/100644443/image.jpg",
	desc: "Places in London That Are Unmissable, Honest!",
	gallery: [],
	position: [{
		name: "Speaker's Corner",
		lat: '51.512989',
		lng: '-0.161501'
	},{
		name: "Imperial War Museum",
		lat: "51.495309",
		lng: "-0.108536"
	},{
		name: "Brick Lane",
		lat: "51.521942",
		lng: "-0.071708"
	},{
 		name: "The Pagoda",
 		lat: "51.481889",
 		lng: "-0.158259"
 	},{
 		name: "The Olympic Park",
 		lat: "51.543256",
 		lng: "-0.012480"
 	},{
		name: "The Gerkhin",
		lat: "51.514245",
		lng: "-0.080210"
	}]
	},{	
		name: "Landmarks",
	location: "London",
	image: 'http://cdn.londonandpartners.com/visit/london-organisations/big-ben/63602-640x360-bigben_tilt_640.jpg',
	desc: "Landmarks in London making London London.",
	gallery: [],
	position:[{
		name: "Imperial War Museum",
		lat: "51.495309",
		lng: "-0.108536"
	},{
		name: "Buckingham Palace",
		lat: "51.500863",
		lng: "-0.141709"
	},{
		name: "Tower of London",
		lat: "51.50771",
		lng: "-0.075334"
	},{
		name: "City Hall",
		lat: "51.504689",
		lng: "-0.078658"
	},{
		name: "Wellington Arch",
		lat: "51.502396",
		lng: "-0.150869"
	}]
},{
	name: "Statues",
	location: "London",
	desc: "The Best Statues Here. Don't Be Statuesque",
	image: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Winston-churchill-statue-parliament-square-london-uk.jpg',
	gallery: [],
	position:[{ 
		name: "Achilles",
		lat: "51.504525",
		lng: "-0.152765"
	},{
		name: "The Birthday Cake",
		lat: "51.501814",
		lng: "-0.140564"
	},{
		name: "Churchill",
		lat: "51.500825",
		lng: "-0.126396"
	},{
		name: "Nelson",
		lat: "51.507732",
		lng: "-0.127933"
	},{
		name: "Eros",
		lat: "51.509122",
		lng: "-0.134905"
	},{
		name: "Boudician Rebellion",
		lat: "51.501070",
		lng: "-0.123696"
	}]
},{	
	name: "Bridges",
	location: "London",
	image: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Tower_bridge_London_Twilight_-_November_2006.jpg',
	desc: "Not Jeff Bridges, London's Bridges Instead!",
	gallery: [],
	position:[{ 
		name: "London Bridge",
		lat: "51.507703",
		lng: "-0.087728"
	},{
		name: "Albert Bridge",
		lat: "51.482395",
		lng: "-0.166779"
	},{
		name: "Tower Bridge",
		lat: "51.505960",
		lng: "-0.075290"
	},{
		name: "Chelsea Bridge",
		lat: "51.484577",
		lng: "-0.149748"
	},{
		name: "Wandsworth Bridge",
		lat: "51.464963",
		lng: "-0.187894"
	},{
		name: "Kew Bridge",
		lat: "51.486815",
		lng: "-0.287084"
	}] 
}], function(err, challenges) {
		if(err) console.error(err);
		else console.log(challenges);

		mongoose.connection.close();
	});

