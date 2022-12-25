let express = require('express');
let router = express.Router();

const { Course } = require('../models');

router.get('/', async (req, res) => {
  if (req.query.course_key != 'course') {
    return res.json({
      message: 'API key salah'
    });
  }
  const courses = await Course.findAll();
  res.status(200).json({
    data: courses
  });
});

router.get('/:id', async (req, res) => {
  if (req.query.course_key != 'course') {
    return res.json({
      message: 'API key salah'
    });
  }
  const course = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!course) {
    return res.json({
      message: 'course tidak ditemukan'
    });
  }
  res.status(200).json({
    message: 'course berhasil ditemukan',
    data: course
  });
});

router.post('/add', async (req, res) => {
  if (req.query.course_key != 'course') {
    return res.json({
      message: 'API key salah'
    });
  }
  const checkCourse = await Course.findOne({
    where: {
      nameCourse: req.body.nameCourse
    }
  });
  if (checkCourse) {
    return res.json({
      message: 'course sudah ada'
    });
  }
  await Course.create(req.body);
  res.json({
    message: 'course telah ditambahkan'
  })
});

router.patch('/:id', async (req, res) => {
  if (req.query.course_key != 'course') {
    return res.json({
      message: 'API key salah'
    });
  }
  const checkCourse = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!checkCourse) {
    return res.json({
      message: 'course tidak ditemukan'
    });
  }
  await Course.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  res.json({
    message: 'course telah diupdate'
  })
});

router.delete('/:id', async (req, res) => {
  if (req.query.course_key != 'course') {
    return res.json({
      message: 'API key salah'
    });
  }
  const checkCourse = await Course.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!checkCourse) {
    return res.json({
      message: 'course tidak ditemukan'
    });
  }
  await Course.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json({
    message: 'course telah dihapus'
  })
});

module.exports = router;