var request = require('request');
const rootURL = 'https://api.github.com/';

module.exports = {
    userDetails,
    search
};

function search(req, res) {
    var options = {
        url: `${rootURL}search/users/?q=${req.body.search} in:fullname`,
        headers: {
            'User-Agent': 'linc31',
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
    };
    request(options, function(err, response, body) {
        var userData = JSON.parse(body);
        res.render('search-results', { userData });
    });
};

function userDetails(req, res) {
    var username = req.body.username || req.query.username;
    if (!username) res.render('index', {userData: null});
    var options = {
        url: `${rootURL}users/${req.body.username}`,
        headers: {
          'User-Agent': 'linc31',
          'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
      };
    };
    
