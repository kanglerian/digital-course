let express = require('express');
let router = express.Router();

const { User } = require('../../models');

router.get('/', async (req, res) => {
    const session_store = req.session;
    const users = await User.findAll();
    res.render('admin/users', {
        title: 'Digital Course',
        data: users,
        user: session_store,
        url: req.url
    });
});

router.post('/', async (req, res) => {
    const data = await User.findOne({
        where: {
            email: req.body.email,
        }
    });
    if(data){
        return res.redirect('/dashboard/users');
    };
    try {
        await User.create(req.body);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await User.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        return res.redirect('/dashboard/users');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/', async (req, res) => {
    const checkUser = await User.findOne({
        where: {
            id: req.body.id,
        }
    });
    if(!checkUser){
        return res.redirect('back');
    }
    await User.destroy({
        where: {
            id: req.body.id
        }
    });
    return res.redirect('back');
});

module.exports = router;