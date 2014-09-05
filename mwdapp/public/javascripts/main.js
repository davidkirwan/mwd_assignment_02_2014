/*
David Kirwan 00346128
MSc Communication Software 2014
Mobile Application Development
*/


function getUserName()
{
	var value = $('#user').val();
	$('#userlink').attr("href", '/user/' + value);
	$('#userlink').click();
}

function clearSearchBox()
{
	$('#user').val("");
}

function beginAuth()
{
	window.location.href='/auth/github';
}

function beginLogout()
{
	window.location.href='/auth/logout';
}

function followUser()
{
	var user = $('#userlogin').text();
	
	$.ajax({
	      url: "/user/following/" + user,
	      type: "PUT",
	      dataType: "json",
	      success: onDataReceived
	    });
}

function checkFollowing()
{
	var user = $('#userlogin').text();
	var authenticatedUser = $('#authuser').text();
	
	if(user == authenticatedUser)
	{
		$('#followbutton').hide(); 
	}
	else
	{
		$.ajax({
		      url: "/user/following/" + user,
		      type: "GET",
		      dataType: "json",
		      success: onDataReceived
		    });
	}
}

function onDataReceived(data) {        
    if(data.following == 0)
    {
    	$('#followbutton').show();
    }
    else
    {
    	$('#followbutton').hide();
    }
}


function starRepository(event)
{
	console.log("Star this repository");
	$( event.target ).prepend('<img class="starred" src="/images/yellow-star.svg" />');
	$( event.target ).parent().addClass("animated shake");
}

function dropPin()
{
	var img = $('#map');
    var latitude = 52.252269999999996;
    var longitude = -7.127205999999999;

    navigator.geolocation.getCurrentPosition( function(position){
      latitude = position.coords.latitude; 
      longitude = position.coords.longitude;
      console.log(latitude);
      console.log(longitude);
      var thesrc = "http://staticmap.openstreetmap.de/staticmap.php?center=42.120376479978,-0.78125000196516&zoom=1&size=500x350" +
      "&markers=" + latitude + "," + longitude + ",lightblue1";
	img.attr("src", thesrc);
    });
}
