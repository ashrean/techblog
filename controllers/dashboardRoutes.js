const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {

        const user = await Blog.findAll({
            where : {
                user_id : req.session.user_id
            }, include : [{
                model: Comment,
                include : {
                    model : User,
                    attributes : ['user_name']
                }
            }]
        },
        );


        const userPosts = user.map((blog) => post.get({ plain: true}));

            res.render('dashboard', {
                userPosts,
                logged_in: req.session.logged_in,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {

        const post = await Blog.findByPk(req.params.id,
           {  include : [{
                model: Comment,
                include : {
                    model : User,
                    attributes : ['user_name']
                }
            },
        {
            model: User,
            attributes: ['user_name']
        }]
        },
        );


        const editPost = blog.get({ plain: true });

            res.render('editDeletePost', {
                editPost,

            });
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
    }
});



module.exports = router;
