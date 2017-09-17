//Making navbar collapsed menu appear/////////////////////////////////////////////////////
function open_navbar_collapsed(){
	if($('.navbar-collapsed-menu-drop').css('display') === 'block'){
		$('.navbar-collapsed-menu-drop').css('display', 'none');
	}
	else{
		$('.navbar-collapsed-menu-drop').css('display', 'block');
	}
	$('.navbar-collapsed-menu-drop').focusout(function(){
		$('.navbar-collapsed-menu-drop').css('display', 'none');
	});
	//Onload also has a function to close the menu when it loses focus
}
//////////////////////////////////////////////////////////////////////////////////////////