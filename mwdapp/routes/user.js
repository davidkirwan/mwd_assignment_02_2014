/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

var https = require('https');
var Cookies = require('cookies');

/* GET /user/:user */
exports.status = function(req, res){
	
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var cookie_user = cookies.get('mwd2014-user');
	var final_data = {};
	var user = req.params.user;
	var restOfUri;
	
	
	if(typeof cookie_github == 'undefined')
	{
		restOfUri = '';
		console.log('Github Cookie not found');
	}
	else
	{
		final_data.cookie = JSON.parse(cookie_github);
		restOfUri = '?access_token=' + final_data.cookie.access_token;
		console.log("Access token: " + final_data.cookie.access_token);
	}
	
	if(typeof cookie_user == 'undefined')
	{
		console.log('User Cookie not found');
	}
	else
	{
		final_data.user = JSON.parse(cookie_user);
		console.log("Authenticated user: " + final_data.user.login);
	}

	var options = {
			hostname : 'api.github.com',
			port : 443,
			path : '/users/' + user + restOfUri,
			method : 'GET',
			rejectUnauthorized : false,
			requestCert : true,
			agent : false,
			headers: {'user-agent': 'node.js'}
		};
		
	
	var api_request = https.request(options, function(response) {
      
		response.setEncoding('utf-8');
		var responseString = '';

		response.on('data', function(data) {
            responseString += data;
            //console.log("data log: " + data);
		});

        response.on('end', function() {
        	json = JSON.parse(responseString);
        	json.headers = response.headers;
			callback(res, res.statusCode, json);
			
		});
		req.on('error', function(e) {
			console.log('problem with the request: ' + e.message);
		});
	});

	function callback(res, status, data){
		console.log('callback: status: '+ status);
		//console.log('data: ' + data);
		console.log('Limit: ' + data.headers['x-ratelimit-limit'] + ' Remaining: ' + data.headers['x-ratelimit-limit']);

		final_data.data = data;
		
		res.render('user', { data: final_data });
	}
	
	api_request.end();
};


/* GET /user/following/:user */
exports.following = function(req, res){
	
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var cookie_user = cookies.get('mwd2014-user');
	var final_data = {};
	var user = req.params.user;
	
	
	if(typeof cookie_github == 'undefined')
	{
		console.log('Github Cookie not found');
		var following = 1;
		res.send(JSON.stringify({following: following}));
	}
	else
	{
		final_data.cookie = JSON.parse(cookie_github);
		console.log("Access token: " + final_data.cookie.access_token);
	}
	
	if(typeof cookie_user == 'undefined')
	{
		console.log('User Cookie not found');
	}
	else
	{
		final_data.user = JSON.parse(cookie_user);
		console.log("Authenticated user: " + final_data.user.login);
	}

	var options = {
			hostname : 'api.github.com',
			port : 443,
			path : '/users/' + final_data.user.login + '/following/' + user,
			method : 'GET',
			rejectUnauthorized : false,
			requestCert : true,
			agent : false,
			headers: {'user-agent': 'node.js'}
		};
		
	
	var api_request = https.request(options, function(response) {
      
		response.setEncoding('utf-8');
		var responseString = '';

		response.on('data', function(data) {
            responseString += data;
            //console.log("data log: " + data);
		});

        response.on('end', function() {
        	//json = JSON.parse(responseString);
        	//json.headers = response.headers;
			callback(res, res.statusCode, responseString);
			
		});
		req.on('error', function(e) {
			console.log('problem with the request: ' + e.message);
		});
	});

	function callback(res, status, data){
		console.log('callback: status: '+ status);
		//console.log('data: ' + data);
		//console.log('Limit: ' + data.headers['x-ratelimit-limit'] + ' Remaining: ' + data.headers['x-ratelimit-limit']);

		final_data.data = data;
		
		if(data == "")
		{
			var following = 1;
			res.send(JSON.stringify({following: following}));
		}
		else
		{
			var following = 0;
			res.send(JSON.stringify({following: following}));
		}
	}
	
	api_request.end();
};


/* PUT /user/following/:user */
exports.follow = function(req, res){
	
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var cookie_user = cookies.get('mwd2014-user');
	var final_data = {};
	var user = req.params.user;
	
	
	if(typeof cookie_github == 'undefined')
	{
		console.log('Github Cookie not found');
		var following = 1;
		res.send(JSON.stringify({following: following}));
	}
	else
	{
		final_data.cookie = JSON.parse(cookie_github);
		console.log("Access token: " + final_data.cookie.access_token);
	}
	
	if(typeof cookie_user == 'undefined')
	{
		console.log('User Cookie not found');
	}
	else
	{
		final_data.user = JSON.parse(cookie_user);
		console.log("Authenticated user: " + final_data.user.login);
	}

	var options = {
			hostname : 'api.github.com',
			port : 443,
			path : '/user/following/' + user + '?access_token=' + final_data.cookie.access_token,
			method : 'PUT',
			rejectUnauthorized : false,
			requestCert : true,
			agent : false,
			headers: {'user-agent': 'node.js'}
		};
		
	
	var api_request = https.request(options, function(response) {
      
		response.setEncoding('utf-8');
		var responseString = '';

		response.on('data', function(data) {
            responseString += data;
            //console.log("data log: " + data);
		});

        response.on('end', function() {
        	//json = JSON.parse(responseString);
        	//json.headers = response.headers;
			callback(res, res.statusCode, responseString);
			
		});
		req.on('error', function(e) {
			console.log('problem with the request: ' + e.message);
		});
	});

	function callback(res, status, data){
		console.log('callback: status: '+ status);
		//console.log('data: ' + data);
		//console.log('Limit: ' + data.headers['x-ratelimit-limit'] + ' Remaining: ' + data.headers['x-ratelimit-limit']);

		final_data.data = data;
		
		if(data == "")
		{
			var following = 1;
			res.send(JSON.stringify({following: following}));
		}
		else
		{
			var following = 0;
			res.send(JSON.stringify({following: following}));
		}
	}
	
	api_request.end();
};