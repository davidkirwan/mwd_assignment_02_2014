/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/

/* GET /map page. */
var https = require('https');
var Cookies = require('cookies');

exports.user = function(req, res){
	var cookies = new Cookies( req, res );
	var cookie_github = cookies.get('mwd2014-github');
	var cookie_user = cookies.get('mwd2014-user');
	var final_data = {};
	
	if(typeof cookie_github == 'undefined')
	{
		console.log('Cookie not found');
		res.render('index', { data: final_data });
	}
	else
	{
		final_data.cookie = JSON.parse(cookie_github);
		console.log("Access token: " + final_data.cookie.access_token);
		
		final_data.user = JSON.parse(cookie_user);
		
		final_data.ip = req.headers['x-forwarded-for'] || 
	                    req.connection.remoteAddress || 
	                    req.socket.remoteAddress ||
	                    req.connection.socket.remoteAddress;

		res.render('map', { data: final_data });
		res.end();
	}
};
