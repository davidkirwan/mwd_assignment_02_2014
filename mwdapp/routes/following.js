/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

/* GET user following listing. */
var https = require('https');
var Cookies = require('cookies');

exports.list = function(req, res){
	
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var cookie_user = cookies.get('mwd2014-user');
	var final_data = {};
	var user = req.params.user;
	
	
	if(typeof cookie_github == 'undefined')
	{
		console.log('Github Cookie not found');
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
			path : '/users/' + user + '/following',
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
			callback(res, res.statusCode, json);
		});
		req.on('error', function(e) {
			console.log('problem with the request: ' + e.message);
		});
	});

	function callback(res, status, data){
		console.log('callback: status: '+ status);
		//console.log('data: ' + data);
		
		final_data.data = data;
		
		res.render('following', { data: final_data });
	}
	
	api_request.end();
};
