const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  usernameExist,
  verifiedSkills,
  // userDetails,
  // rating
} = require('../controllers/hackerrank/index');

router.get('/hackerrank/exist/:username', usernameExist);
router.get('/hackerrank/verified_skills/:username', verifiedSkills);
// router.get('/hackerrank/user_details/:username', userDetails);
// router.get('/hackerrank/rating/:username', rating);

module.exports = router;