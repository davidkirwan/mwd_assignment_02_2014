/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

var https = require('https');
var Cookies = require('cookies');

var config = require('konphyg')(__dirname + '/../conf');
var github = config('github');

/* GET /auth/github */
exports.redirect = function(req, res){
	var state = (new Date).getTime();
	var url = 'https://github.com/login/oauth/authorize?client_id=' + github.client_id +'&scope=user:follow&state=' + state;
	res.redirect(url);
};

/* GET /auth/github/status */
exports.status = function(req, res){
	var data = req.params;
	
	res.render('auth', { data: data });
};

/* GET /auth/logout */
exports.logout = function(req, res){
	res.clearCookie('mwd2014-github', { path: '/' });
	res.clearCookie('mwd2014-user', { path: '/' });
	res.redirect('/');
};

/* POST /auth/github/callback */
exports.callback = function(req, res){
	
	var cookies = new Cookies(req, res);
	
	var code = req.query.code;
	
	console.log(github.client_id);
	console.log(github.client_secret);
	console.log(github.redirect_uri);
	
	var req_body = {
		client_id: github.client_id,
		client_secret: github.client_secret,
		code: code,
		redirect_uri: github.redirect_uri
	};
	
	var bodyString = JSON.stringify(req_body);
	
	console.log(bodyString);
	
	var options = {
		hostname : 'github.com',
		port : 443,
		path : '/login/oauth/access_token',
		method : 'POST',
		rejectUnauthorized : false,
		requestCert : true,
		agent : false,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Content-Length': bodyString.length
		}
	};

	var oauth_request = https.request(options, function(response) {
      
		response.setEncoding('utf-8');
		var responseString = '';

		response.on('data', function(data) {
            responseString += data;
            //console.log("data log: " + data);
		});

        response.on('end', function() {
        	//console.log(responseString);
			//json = JSON.parse(responseString);
			callback(res, res.statusCode, responseString);
		});
		req.on('error', function(e) {
			console.log('problem with the request: ' + e.message);
		});
	});

	function callback(res, status, data){
		console.log('callback: status: '+ status);
		//console.log('data: ' + data);
		
		cookies.set('mwd2014-github', data);
		res.redirect('/');
	}
	
	oauth_request.write(bodyString);
	oauth_request.end();
};
