const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isAuthorReview } = require('../middleware');

/* ===== Redirect to the campground ===== */
router.get('/', reviews.redirect);
router.get('/:reviewsId', reviews.redirect);
/*===== End =====*/

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));

router.delete(
	'/:reviewId',
	isLoggedIn,
	isAuthorReview,
	catchAsync(reviews.delete)
);

module.exports = router;
