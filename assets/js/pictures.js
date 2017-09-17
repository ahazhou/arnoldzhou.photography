//MISC FUNCTIONS//////////////////////////////////////////////////////////////////////////
function getcurrpage(){
	var pathname = window.location.pathname;
	var split_ = pathname.split("/");
	var currlocation = split_[split_.length - 1];
	currlocation = currlocation.replace(/_/g, ' ');
	return currlocation.split(".")[0];
}

function currpage(){
	var page_name = getcurrpage();
	if(page_name === ""){
		return "Photos";
	}
	var split_name = page_name.split(' ');
	result_name = '';
	for(var i = 0; i < split_name.length; ++i){
		if(split_name[i] != "and"){
			split_name[i] = split_name[i].charAt(0).toUpperCase() + split_name[i].slice(1);
		}
		if(i !== split_name.length - 1){
			result_name += (split_name[i] + ' ');
		}
		else{
			result_name += (split_name[i]);
		}
	}
	return result_name;
}
//////////////////////////////////////////////////////////////////////////////////////////

//ON PAGE LOAD////////////////////////////////////////////////////////////////////////////
function replace_names(){
	$('.page-name').html(currpage());
	document.title = "Arnold Zhou | " + currpage();
	$('.page-name').css('opacity', '1');
}
//LOADING IMAGES//////////////////////////////////////////////////////////////////////////
//Because we don't know how many items are in the folder, we use xmlhttp to call the php file
//which will then parse the folder itself and ideally return the number of images
//and/or??? the images themselves which I can then dynamically add to the html
//Essentially: xmlhttp => php => folder information => javascript => html
//////////////////////////////////////////////////////////////////////////////////////////
function load_images(preloadLarge){//create array of divs which it displays
	//Temp solution hard code image count
	temp_insert_image(preloadLarge);
	/*var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();//IE7+, Firefox, Chrome, Opera, Safari
	}
	else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");//IE6, IE5
	}
	xmlhttp.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200){
			//TODO WITH IMAGES
			console.log(this.response);
			insert_images(this.response);
		}
	}
	//Call the php file
	var url = "assets/php/retrievepictures.php";
	//php variable to get right folder
	var vari = "currPage=" + currpage().replace(/ /g, '');
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(vari);*/
}
//////////////////////////////////////////////////////////////////////////////////////////
//TEMP INSERT IMAGE SOLUTION//////////////////////////////////////////////////////////////
function temp_insert_image(preloadLarge){
	var numberOfImages = 15;
	var numberLoaded = 0;
	if(currpage() === "Events"){
		numberOfImages = 63;
	}
	else if (currpage() === "Portraits"){
		numberOfImages = 19;
	}
	else if (currpage() === "Proposal and Graduation"){
		numberOfImages = 36;
	}
	else if (currpage() === "Street"){
		numberOfImages = 31;
	}
	var adjustedPage = currpage().replace(/ /g, '');
	var currElement = document.getElementById(adjustedPage + "-container");
	changeImageEvents(adjustedPage, numberOfImages)
	//pause animation until all images loaded
	currElement.style.webkitAnimationPlayState = "paused";
	//add images to page
	for(var i = 0; i < numberOfImages; ++i){
		var img = document.createElement("IMG");
		img.src = adjustedPage + '/' + i + '.jpg';
		img.className += "photo";
		img.alt = i;
		img.oncontextmenu = function(){ return false; }
		//add click event to each individual image
		img.addEventListener('click', function(e){
			$('.single-photo-container').css("visibility", "visible");
			var imgLarge = document.createElement("IMG");
			//onload has to be before setting source
			imgLarge.onload = function(){
				$('.photoLarge').css("opacity", "1");
			}
			imgLarge.src = (adjustedPage + "Large") + '/' + e.target.alt + '.jpg';
			imgLarge.className += "photoLarge";
			imgLarge.alt = e.target.alt + "lg";
			var largeElement = document.getElementById(adjustedPage + "-container-large");
			largeElement.appendChild(imgLarge);
		})
		//post to page
		currElement.appendChild(img);
		img.onload = function(){
			numberLoaded += 1;
			if(numberLoaded === numberOfImages){
				currElement.style.webkitAnimationPlayState = "running";
				$('.loader-container').fadeOut(3000);
			}
		}
	}
	preLoadImages();
	function preLoadImages(){
		for(var i = 0; i < numberOfImages; ++i){
			var img = new Image();
			img.src = (adjustedPage + "Large") + '/' + i + '.jpg';
			preloadLarge.push(img);
		}
	}
}
//////////////////////////////////////////////////////////////////////////////////////////
//Replace photoLarge container with next image when clicked///////////////////////////////
function switch_next_img(increment, adjustedPage, numberOfImages, imgLarge){
	$('.photoLarge').css("opacity", "0");
	var img_integer = parseInt($('.photoLarge').attr('src').split('/')[1].split('.')[0]);
	if(increment === -1 && img_integer === 0){
		img_integer = numberOfImages;
	}
	var nextImg = (img_integer + increment) % numberOfImages;
	$('.photoLarge').attr('src', (adjustedPage + "Large") + '/' + nextImg + '.jpg');
	$('.photoLarge').on("load", function(){
		$('.photoLarge').css("opacity", "1");
	})
}
//////////////////////////////////////////////////////////////////////////////////////////
//Inserting images into the html file/////////////////////////////////////////////////////
function insert_images(imageCount){
	//var imgArr = [];
	for(var i = 0; i < imageCount; ++i){
		var adjustedPage = currpage().replace(/ /g, '');
		var img = document.createElement("IMG");
		img.src = adjustedPage + '/' + i + '.jpg';
		img.className += "photo";
		img.alt = adjustedPage + i;
		var currElement = adjustedPage + "-container";
		document.getElementById(currElement).appendChild(img);
	}

}
//////////////////////////////////////////////////////////////////////////////////////////
function load_everything_correctly(){
	var preloadLarge = [];
	replace_names();
	load_images(preloadLarge);
	$(document).ready(function(){
	    $(this).scrollTop(0);
	});
}
window.onload=load_everything_correctly;

window.onbeforeunload = function(e){
	preloadLarge = [];
}
//////////////////////////////////////////////////////////////////////////////////////////
//Clicking events/////////////////////////////////////////////////////////////////////////
function changeImageEvents(adjustedPage, numberOfImages){
	$('.close-button').click(function(e){
		$('.single-photo-container').css("visibility", "hidden");
		var pageId = '#' + adjustedPage + "-container-large";
		$(pageId).empty();
	});
	$('.single-photo-container').click(function(e){
		$('.close-button').trigger("click");
	}).children().click(function(e){
		return false;
	});
	$('.left-button').click(function(e){
		switch_next_img(-1, adjustedPage, numberOfImages);
	});
	$('.right-button').click(function(e){
		switch_next_img(1, adjustedPage, numberOfImages);
	});
	$(document).keydown(function(e){
		switch(e.which){
			case 37://left
				$('.left-button').trigger("click");
			break;
			case 39://right
				$('.right-button').trigger("click");
			break;
			case 27://escape
				$('.close-button').trigger("click");
			break;
		}
	});
}
//////////////////////////////////////////////////////////////////////////////////////////


//GOAL:///////////////////////////////////////////////////////////////////////////////////
//have set of objects (pictures) checks to make sure that each picture is less than 6012x1920 or some size
//then if width is larger, it takes up (longer_width)%(set_width_size_of_1_image) number of picture slots 
//(no max) and if can't add more to current row, moves picture down a row and replace empty slots with next 
//few pics (if any)
//if (longer_width)%(set_width_size) > current max width, downsize to max width
//if length is larger, it takes up (longer_length)%(set_length_size_of_1_image) number of picture slots 
//(no maximum)
//20% margin on either side of image
//////////////////////////////////////////////////////////////////////////////////////////
//CURRENT FUNCTION: add 4 pictures per row

//TODO:///////////////////////////////////////////////////////////////////////////////////
//1. iterate through pics folder
//2. for each element in the pics folder, create a new div element with same margins with a max of 4 per row
//////////////////////////////////////////////////////////////////////////////////////////