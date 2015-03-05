$(document).ready(function()
{
	// applyHeader();
	applyResize();
	setupColorDivision();
	// scrollManager();
});


function scrollManager(){
	var last_scroll_position=0;
	scroll=false;
	nameContainer=1;
	size =6;
	scrollTop=$(this).scrollTop();

	$(window).scroll(function(event){
	    var st = $(this).scrollTop();
	   	console.log(last_scroll_position+" "+st+" "+scroll+" "+nameContainer+" "+scrollTop);


			if (st > last_scroll_position){
				if (scroll) return;
				nameContainer = (nameContainer+1 > size) ? nameContainer : (nameContainer +1);
				last_scroll_position = scrollTop;
				scrollTop=$("#pointer"+nameContainer).offset().top;
				$('html, body').animate({
						scrollTop: scrollTop
					        }, 1000);
				scroll = true;
			}else if(st < last_scroll_position){
				if (scroll) return;
				nameContainer = (nameContainer-1 < 0) ? 0 : (nameContainer -1);
				last_scroll_position = scrollTop;
				scrollTop=$("#pointer"+nameContainer).offset().top;
				$('html, body').animate({
						scrollTop: scrollTop
									}, 1000);
				scroll = true;
			}else if(st == scrollTop){
				scroll = false;
			}
			last_scroll_position = scrollTop;

	});
}

function applyHeader()
{
	$('.mag').css({ height: ($(window).height()) +'px' });

}


function applyResize()
{
	$(window).on('resize', function()
	{
		setupColorDivision();
	});
}

function setupColorDivision(){
	changeBackgroundColor($('#aboutMe'),'#404C88');
	changeBackgroundColor($('#experience'),'#b1a8c0');
	changeBackgroundColor($('#projects'),'#57B586');
	changeBackgroundColor($('#skills'),'#C2CB86');
	changeBackgroundColor($('#contactUs'),'#BD9866');
}

function changeBackgroundColor(contentNav,color){
	var setPoint;
	if (contentNav.length) {
  	  	setPoint = contentNav.offset().top;
	}

	var scrolldiv = $('.change');
	var navBar		= $('.navbar');
	$(window).scroll(function() {
	    if($(this).scrollTop() >= setPoint-100 ) {
				scrolldiv.css("transition","background-color 0.3s ease");
				scrolldiv.css("background-color", color);
				navBar.css("transition","background-color 0.3s ease");
				navBar.css("background-color", color);
			}
	})
}
