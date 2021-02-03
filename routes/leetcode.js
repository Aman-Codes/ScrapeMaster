const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  usernameExist,
  userDetails,
  problemsSolved,
  rating
} = require('../controllers/leetcode/index');

router.get('/leetcode/exist/:username', usernameExist);
router.get('/leetcode/user_details/:username', userDetails);
router.get('/leetcode/problems_solved/:username', problemsSolved);
router.get('/leetcode/rating/:username', rating);

module.exports = router;