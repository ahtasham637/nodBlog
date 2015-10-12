var express = require('express');
var router = express.Router();
/* middleware */
var handler = require('../middleware/handler.middleware');
var photoHandler = require('../middleware/photo.middleware');
var loadUser = require('../middleware/loadUser.middleware');
/* controller */
var home = require('./../controllers/home');
var profile = require('./../controllers/profile');
var updateInformation = require('./../controllers/updateInformation');
var account = require('./../controllers/account');
var category = require('./../controllers/category');
var showPost = require('./../controllers/showPost');
var notFound = require('./../controllers/404');
var unAuthorize = require('./../controllers/401');
var authenticate = require('./../controllers/authenticate');
var postbox = require('./../controllers/postbox');
var follow = require('./../controllers/follow');
var postsByCategory = require('./../controllers/postsByCategory');
var search = require('./../controllers/search');
var cmFunction = require('./../controllers/commonFunctions');


/* GET home page. */
router.get('/', loadUser.loadUserOwnProfile, home.index);
router.get('/homeposts', handler.authorize, home.homePosts);
router.get('/getsuggestions', handler.authorize, home.getSuggestions);

/* GET Search */
router.get('/search', search.index);
router.get('/search/:query', cmFunction.notFound);
router.get('/search/:query/getPosts', search.getPosts);

/* Photo/pub */
router.get('/photo', cmFunction.notFound);
router.get('/photo/pub', cmFunction.notFound);

/* 404 */
router.get('/404', notFound.index);
/* Hello */
router.get('/401', unAuthorize.index);

/* authenticate */
router.get('/authenticate', cmFunction.notFound);
/* signup */
router.get('/authenticate/signup', cmFunction.notFound);
router.post('/authenticate/signup', authenticate.signup);
/* login */
router.get('/authenticate/login', cmFunction.notFound);
router.post('/authenticate/login', authenticate.login);

/* update */
router.get('/update', handler.authorize, loadUser.loadUserOwnProfile, updateInformation.index);
router.post('/update', handler.authorize, photoHandler.uploadProfilePhoto, updateInformation.updateInformation);

/* password settings (account page */
router.get('/account', handler.authorize, loadUser.loadUserOwnProfile, account.showAccount);
router.post('/account', handler.authorize, account.changePassword);

/* category */
router.get('/category', handler.authorize, loadUser.loadUserOwnProfile, category.indexCategory);
router.get('/category/display', handler.authorize, category.jsonCategory);
router.get('/category/create', handler.authorize, cmFunction.notFound);
router.post('/category/create', handler.authorize, category.addCategory);
router.get('/category/delete', handler.authorize, cmFunction.notFound);
router.post('/category/delete', handler.authorize, category.rmCategory);
router.get('/category/:name', handler.authorize, cmFunction.notFound);

/* Create Post */
router.get('/createPost', cmFunction.notFound);
router.post('/createPost', handler.authorize, photoHandler.uploadPostPhoto, postbox.createPost);

router.get('/logout', handler.authorize, authenticate.logout);

/* profile & posts */
router.get('/:username', profile.getUserProfile, profile.index);
router.get('/:username/allposts', profile.getUserPosts);
router.get('/:username/:category', profile.getUserProfile, postsByCategory.index);
router.get('/:username/:category/:postUrl', profile.getUserProfile, showPost.getSinglePost); //Show single post
router.put('/:username/:category/:postUrl/update', handler.authorize, showPost.updatePost); //Edit Post
router.delete('/:username/:category/:postUrl/delete', handler.authorize, showPost.deletePost); //Delete post
/* Follow */
router.put('/:username/follow', handler.authorize, follow.followUser);


module.exports = router;
