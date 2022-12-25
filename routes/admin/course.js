let express = require('express');
let router = express.Router();

const { Course, detailCourse } = require('../../models');

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


router.get('/:id', async (req, res) => {
    const session_store = req.session;
    const course = await Course.findOne({
        where: {
            id: req.params.id
        }
    });
    const detail = await detailCourse.findAll({
        where: {
            idCourse: req.params.id
        }
    });
    res.render('admin/detailCourse', {
        title: 'Digital Course',
        course: course,
        data: detail,
        user: session_store
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

router.post('/detail', async (req, res) => {
    try {
        await detailCourse.create(req.body);
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

router.patch('/detail/:id', async (req, res) => {
    try {
        await detailCourse.update(req.body,{
            where: {
                id: req.params.id
            }
        });
        return res.redirect('back');
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

router.delete('/detail', async (req, res) => {
    const checkDetail = await detailCourse.findOne({
        where: {
            id: req.body.id,
        }
    });
    if(!checkDetail){
        return res.redirect('back');
    }
    await detailCourse.destroy({
        where: {
            id: req.body.id
        }
    });
    return res.redirect('back');
});

module.exports = router;