let express = require('express');
let router = express.Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  if(req.query.course_key != 'course'){
    return res.json({
      message: 'API key salah'
    });
  }
  const users = await User.findAll();
  try {
    res.status(200).json({
      data: users
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async(req, res) => {
  if(req.query.course_key != 'course'){
    return res.json({
      message: 'API key salah'
    });
  }
  const user = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if(!user){
    return res.json({
      message: 'akun tidak ditemukan'
    });
  }
  try {
    res.status(200).json({
      message: 'akun berhasil ditemukan',
      data: user
    });
  } catch (error) {
    console.log(error);
  }
});

router.patch('/:id', async(req, res) => {
  if(req.query.course_key != 'course'){
    return res.json({
      message: 'API key salah'
    });
  }
  const checkUser = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if(!checkUser){
    return res.json({
      message: 'Akun tidak ditemukan'
    });
  }
  try {
    await User.update(req.body,{
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: 'Akun telah diupdate'
    })
  } catch (error) {
    console.log(error);
  }
});


router.delete('/:id', async(req, res) => {
  if(req.query.course_key != 'course'){
    return res.json({
      message: 'API key salah'
    });
  }
  const checkUser = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  if(!checkUser){
    return res.json({
      message: 'Akun tidak ditemukan'
    });
  }
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      message: 'Akun telah dihapus'
    })
  } catch (error) {
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
  const checkEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(checkEmail){
    return res.json({
      message: 'email telah ada'
    });
  }
  try {
    await User.create(req.body);
    res.status(200).json({
      message: 'registrasi berhasil'
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async (req,res) => {
  const checkUser = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(!checkUser){
    return res.json({
      message: 'user tidak ditemukan'
    });
  }
  if(checkUser.password != req.body.password){
    return res.json({
      message: 'password salah'
    });
  }
  res.status(200).json({
    message: 'login berhasil',
    data: {
      fullName: checkUser.fullName,
      email: checkUser.email
    }
  });
});

router.post('/forgot', async (req, res) => {
  const checkEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(!checkEmail){
    return res.json({
      message: 'akun tidak ditemukan'
    });
  }
  try {
    res.status(200).json({
      message: 'Akun ditemukan',
      data: `Password kamu adalah ${checkEmail.password}`
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/reset', async (req, res) => {
  const checkEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(!checkEmail){
    return res.json({
      message: 'akun tidak ditemukan'
    });
  }
  const random = () => {
    let result = '';
    let character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charLength = character.length;
    for (let i = 0; i < 8; i++) {
      result += character.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }
  const newPassword = {
    password: random()
  }
  try {
    await User.update(newPassword,{
      where: {
        id: checkEmail.id
      }
    });
    let account = await User.findOne({
      where: {
        id: checkEmail.id
      }
    });
    res.status(200).json({
      message: 'Password telah direset',
      data: `Password kamu adalah ${account.password}`
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;