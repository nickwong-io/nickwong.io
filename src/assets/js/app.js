$(document).foundation();

var d = new Date();
var n = d.getDay();

if (n === 5) {
	console.log('Aloha Friday!');

	//image styles
	$('.hero_image').css("background-image", "url(\"assets/images/nicksGrad_compressed.jpg\")");
	$('.hero_image').css("background-position", "50% 35%");
	$('#small-hero-image').attr("src", "assets/images/nicksGrad_compressed.jpg");

	// header styles
	$('#alohaFriday').css("display", "unset")
	$('#reg').css("display", "none")
}
