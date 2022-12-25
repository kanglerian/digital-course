let express = require('express');
let router = express.Router();

const { Course } = require('../../models');

router.get('/', async (req, res) => {
    const session_store = req.session;
    const courses = await Course.findAll();
    res.render('admin/courses', {
        title: 'Digital Course',
        data: courses,
        user: session_store,
        url: req.url
    });
});

router.post('/', async (req, res) => {
    const data = await Course.findOne({
        where: {
            nameCourse: req.body.nameCourse,
        }
    });
    if(data){
        return res.redirect('/dashboard/courses');
    };
    try {
        await Course.create(req.body);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Course.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        return res.redirect('/dashboard/courses');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/', async (req, res) => {
    const checkCourse = await Course.findOne({
        where: {
            id: req.body.id,
        }
    });
    if(!checkCourse){
        return res.redirect('back');
    }
    await Course.destroy({
        where: {
            id: req.body.id
        }
    });
    return res.redirect('back');
});

module.exports = router;