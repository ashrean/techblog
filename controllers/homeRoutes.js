const router = require('express').Router()
const {Blog, User, Comment} = require('../models/')

router.get('/', async (req,res) => {
    try {
        const blogData = await Blog.findAll({
            include: [User]
        })
        const blogs = blogData.map((blog) => blog.get({plain: true}))
        res.render('all-posts', {blogs})
    }
    catch (err){
        res.status(500).json(err)
    }
})

router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    try {
        res.render('signup');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                }, {
                    model: Comment,
                    include: [
                        User
                    ]
                }
            ]
        });
        const singleBlog = Blog.get({
            plain: true,
        });
        res.render('blog', {
            singleBlog,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err, message: 'Something went wrong'});
    }
});


module.exports = router;
