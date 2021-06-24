const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.create = async (req, res, next) => {
	const campground = await Campground.findById(req.params.id);
	const review = new Review(req.body.review);
	campground.reviews.unshift(review);
	review.author = req.user._id;
	await review.save();
	await campground.save();
	req.flash('success', 'Successfully created new review!');
	res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.delete = async (req, res, next) => {
	const { id, reviewId } = req.params;
	await Review.findByIdAndDelete(reviewId);
	const campground = await Campground.findByIdAndUpdate(id, {
		$pull: { reviews: reviewId },
	});
	campground.save();
	req.flash('success', 'Successfully deleted review!');
	res.redirect(`/campgrounds/${id}`);
};

module.exports.redirect = (req, res) => {
	const { id } = req.params;
	res.redirect(`/campgrounds/${id}`);
};
