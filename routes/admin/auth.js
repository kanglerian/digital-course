let express = require('express');
let router = express.Router();

const { User } = require('../../models');

router.get('/', async(req, res) => {
  res.render('auth/login', {
    layout: 'layouts/auth',
    title: 'Digital Course',
  });
});

router.get('/register', async(req, res) => {
  res.render('auth/register', {
    layout: 'layouts/auth',
    title: 'Digital Course',
  });
});

router.post('/login', async (req,res) => {
  const session_store = req.session;
  const checkUser = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(!checkUser){
    return res.redirect('back');
  }
  if(checkUser.password != req.body.password){
    return res.redirect('back');
  }
  session_store.no_id = checkUser.id;
  session_store.fullName = checkUser.fullName;
  session_store.email = checkUser.email;
  session_store.status = checkUser.status;
  session_store.logged = true;
  return res.redirect('/');
});

router.post('/register', async (req, res) => {
  if(req.body.fullName == '' | req.body.email == '' | req.body.password == ''){
    return res.redirect('back');
  }
  if(req.body.password != req.body.checkPassword){
    return res.redirect('back');
  }
  const checkEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if(checkEmail){
    return res.redirect('back');
  }
  await User.create(req.body);
  return res.redirect('/auth');
});

router.get('/logout', async(req, res) => {
  req.session.destroy((err) => {
    if(err){
      alert('Gagal logout');
    }else{
      res.redirect('/');
    }
  });
});


module.exports = router;