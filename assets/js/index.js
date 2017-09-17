//PAGE LOADING: ADJUSTING WIDTH, FLOATABLE NAME, ADJUSTING HASH///////////////////////////
function calculate_widths(){
	var setwidth = $('.float-logo').width() + 
					$('.goto-contact').width() +
					$('.goto-work').width() +
					$('.goto-about').width();
	$('.floatable').css({"min-width": setwidth});
}
function reload_heights(){
	$('.intro-back').height($(window).height() - 30);
	$('.intro-class').height($(window).height());
	$('.pic-choice').height($(window).height() - 142);
	$('.about-page').css("min-height", $(window).height() - 71);
}
function scroll_hash(){
	if(window.location.hash === ""){
		window.location.hash = "#intro";
	}

	scroll_animation(800, window.location.hash);
}
function choose_picture(){
	var numberOfImages = 10;
	preLoadImages();
	function preLoadImages(){
		for(var i = 0; i < numberOfImages; ++i){
			var img = new Image();
			img.src = "./assets/OtherPhotos/Main" + i + ".jpg";
		}
	}
	var currImage = Math.round(Math.random()*(numberOfImages - 1));
	$('#home-rotation-image-1').fadeIn(2000, function(){
		if(currImage % 2 === 0){
			$('#home-rotation-image-1').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "0"});
			$('#home-rotation-image-2').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "-1"});
		}
		else{
			$('#home-rotation-image-1').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "-1"});
			$('#home-rotation-image-2').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "0"});
		}
	});
	
	$('#home-rotation-image-1').click(function(){
		currImage = (currImage + 1)%numberOfImages;
		//somehow setting a timeout prevents the photo from flickering when it changes to another photo
		if(currImage % 2 === 0){
			$('#home-rotation-image-1').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "0"});
			$('#home-rotation-image-2').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "-1"});
		}
		else{
			$('#home-rotation-image-1').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "-1"});
			$('#home-rotation-image-2').css({"background-image": "url(./assets/OtherPhotos/Main" + currImage + ".jpg)", "z-index": "0"});
		}
		
	}).children().click(function(e){
		return false;
	});
}
function load_everything_correctly(){
	choose_picture();
	reload_heights();
	define_opacities();//to reload opacity of navba
	calculate_widths();
	//Loading has finished so change back display
	$("#index-content").css("display", "block");
	$("#loading-screen").css("display", "none");
	//To close hamburger menu
	$('.body-class').click(function(e){
		if(!e.target.matches('.menu-collapsed-button') && !e.target.matches('.line')){
			$('.navbar-collapsed-menu-drop').css('display', 'none');
		}
	});
	scroll_hash();
}
//load heights on first load
window.onload = load_everything_correctly;
//detect window resize, adjust heights accordingly
$(window).resize(function(){
    reload_heights();
    calculate_widths();
});
//////////////////////////////////////////////////////////////////////////////////////////

//A HREF OFFSET CORRECTLY/////////////////////////////////////////////////////////////////
function scroll_animation(duration, hash){
	//specify in the html body to animate and scroll from top $(hash).offset().top amount
	//for duration milliseconds and also replace old hash with current hash for its location
		$('html, body').animate({scrollTop: $(hash).offset().top}, duration, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
  	});
}
$(document).ready(function(){
	$("a").on("click", function(event){
		if(this.hash !== ""){
			//prevent default action if hash isn't empty
			event.preventDefault();
			scroll_animation(800, this.hash);
		}
	});
});
//////////////////////////////////////////////////////////////////////////////////////////

//DYNAMIC SCROLL FEATURES/////////////////////////////////////////////////////////////////
function define_opacities(){
	var op = ($(window).height()-$(window).scrollTop())/$(window).height();
	$("#index_floatable").css('opacity', 1-2*op);
}
function move_name_scroll(){
	$("#intro-name").css('top', $(window).scrollTop());
}
//features on scroll
$(window).bind('scroll', function(){
	define_opacities();
	move_name_scroll();
});
//////////////////////////////////////////////////////////////////////////////////////////