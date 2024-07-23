const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { submitReview, getReviewData } = require('../controllers/review');
const router = express.Router();

// 스터디 리뷰 등록
router.post('/submit/:id', isLoggedIn, submitReview);
// 내가 받은 모든 리뷰 조회
router.get('/', isLoggedIn, getReviewData)

module.exports = router;