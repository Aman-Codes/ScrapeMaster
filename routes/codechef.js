const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  usernameExist,
  userDetails,
  problemsSolved,
  rating
} = require('../controllers/codechef/index');

router.get('/codechef/exist/:username', usernameExist);
router.get('/codechef/user_details/:username', userDetails);
router.get('/codechef/problems_solved/:username', problemsSolved);
router.get('/codechef/rating/:username', rating);

module.exports = router;