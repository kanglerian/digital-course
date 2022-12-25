let express = require('express');
let router = express.Router();

const { Course } = require('../models');

/* GET home page. */
router.get('/', async(req, res) => {
  const session_store = req.session;
  const courses = await Course.findAll({
    where: {
      status: 1
    }
  }); 
  res.render('index', {
    title: 'Digital Course',
    courses: courses,
    user: session_store
  });
});

module.exports = router;
