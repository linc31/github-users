var express = require('express');
var router = express.Router();
var githubCtrl = require('../controllers/github');


/* GET home page. */
router.get('/', githubCtrl.userDetails);
router.post('/', githubCtrl.userDetails);
router.post('/search', githubCtrl.search);

router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/', function(req, res, next) {
  var options = {
    url: `${rootURL}users/${req.body.username}`,
    headers: {
      'User-Agent': 'linc31',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  };
  request(options, function(err, response, body) {
    var userData = JSON.parse(body);
    options.url = userData.repos_url;
    request(options, function(err, response, body) {
      userData.repos = JSON.parse(body);
      console.log(userData.repos[1]);
      res.render('index', { userData });
    });
  });
});

module.exports = router;
