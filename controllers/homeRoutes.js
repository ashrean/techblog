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





module.exports = router;
