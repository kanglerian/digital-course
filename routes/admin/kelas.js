let express = require('express');
let router = express.Router();

const { myCourse, Course, detailCourse } = require('../../models');

router.get('/:id', async (req, res) => {
    const session_store = req.session;
    const myCourses = await myCourse.findAll({
        include: [
            { model: Course, as: 'Course' }
        ],
        where: {
            idUser: req.params.id
        }
    });
    res.render('kelas/kelasku', {
        title: 'Digital Course',
        courses: myCourses,
        user: session_store,
        url: req.url
    });
});

router.get('/detail/:id', async (req, res) => {
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
    res.render('kelas/detailKelas', {
        title: 'Digital Course',
        course: course,
        data: detail,
        user: session_store
    });
});

router.post('/', async (req, res) => {
    const data = await myCourse.findOne({
        where: {
            idCourse: req.body.idCourse,
            idUser: req.body.idUser
        }
    });
    if(data){
        return res.redirect('/');
    };
    try {
        await myCourse.create(req.body);
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/', async (req, res) => {
    const checkCourse = await myCourse.findOne({
        where: {
            id: req.body.id,
            idUser: req.body.idUser
        }
    });
    if(!checkCourse){
        return res.redirect('back');
    }
    await myCourse.destroy({
        where: {
            id: req.body.id
        }
    });
    return res.redirect('back');
});

module.exports = router;