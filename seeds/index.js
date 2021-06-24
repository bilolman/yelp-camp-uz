// requiring the packages
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// connecting to the database
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '60cdb9fcb8d8692e58ded25c',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg/1200px-Tent_camping_along_the_Sulayr_trail_in_La_Taha%2C_Sierra_Nevada_National_Park_%28DSCF5147%29.jpg',
					filename: 'YelpCamp',
				},
				{
					url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEOfzK6RTT25mvm8Tw4vg_w31CL4dqcp2ub3Oa2rF3ZKHBOlCo1Dgdp2OhdLctPiRCpAE&usqp=CAU',
					filename: 'YelpCamp',
				},
				{
					url: 'https://cdn.britannica.com/75/93575-050-8ADFBBE0/fishing-Camping-activities-canoeing-Minnesota-Boundary-Waters.jpg',
					filename: 'YelpCamp',
				},
			],
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt alias quidem illum aliquid molestias blanditiis quibusdam asperiores veniam non? Repellendus eos voluptatibus dolorum ullam veniam animi, dolores aliquam corrupti dolor.',
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	db.close();
});
