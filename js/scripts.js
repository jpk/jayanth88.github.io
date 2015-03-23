$(document).ready(function()
{
	var divColors=[
									['#intro','#404C88'],
									['#aboutMe','#404C88'],
									['#experience','#E3817F'],
									['#projects','#307854'],
									['#skills','#665280'],
									['#contactUs','#CCBC62'],
								];

	applyResize();
	setupColorDivision(divColors);
	shufflePeriodically();
	populateSkills();
	activeNavBarOptions();
	loadGAnalytics();
});


function loadGAnalytics(){
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-61051244-1', 'auto');
	  ga('send', 'pageview');
}

function shufflePeriodically(){
	var nameSpace = $("#shuffleMe");
	nameSpace.shuffleLetters();
	var tagLine=["I am a huge fan of Lord of the Rings!",
							"Color schemes & typography are topics of my interest!",
							"When not staring at a screen, I am usually at the gym.",
							"I prefer playing as a tank in LOL",
							"I enjoy designing & front-end development",
							"Coldplay,Mettalica,Linkin Park.. etc. are just a few of my favorite music bands",
							"Software Developer."];
	var i=0;

	setInterval(function(){
										nameSpace.shuffleLetters( {"text": tagLine[ i % (tagLine.length) ] });
										i=i+1;
									}, 7000);
}

function applyResize()
{
	$(window).on('resize', function()
	{
		setupColorDivision();
	});
}

function setupColorDivision(divColors){
	if(divColors){
		for(var i=0;i<divColors.length;i++){
			changeBackgroundColor($(divColors[i][0]),divColors[i][1]);
		}
	}
}

function changeBackgroundColor(contentNav,color){
	var setPoint;
	if (contentNav.length) {
  	  	setPoint = contentNav.offset().top;
	}

	var scrolldiv = $('.change');
	var navBar		= $('.navbar');
	var nav				= $('nav');
	$(window).scroll(function() {
	    // if($(this).scrollTop() >= setPoint-100 ) {
			// 	scrolldiv.css("transition","background-color 0.3s ease");
			// 	scrolldiv.css("background-color", color);
			//
			// }
			if($(this).scrollTop() > setPoint -100 && $(this).scrollTop() < (contentNav.offset().top+contentNav.length) ) {
					scrolldiv.css("transition","background-color 0.3s ease");
					scrolldiv.css("background-color", color);

					nav.find("a").parent().removeClass('active');
					var loc="a[href='#"+contentNav.attr('id')+"']";
					nav.find(loc).parent().addClass('active');
			}
	});
}

function activeNavBarOptions(){
	$("a:contains('Home')").parent().addClass('active');
}

function populateSkills(){
	var leftSkillPane= $("#leftSkillPane");
	var rightSkillPane= $("#rightSkillPane");

	var leftSkills = [
								{value:"JAVA",rating:4.5},
								{value:"C++",rating:3.5},
								{value:"C",rating:3.5},
								{value:"Python",rating:3},
								{value:"PL/SQL",rating:3.5},
								{value:"Javascript",rating:3},
								{value:"jQuery",rating:3},
								{value:"HTML",rating:3},
								{value:"CSS",rating:3},
								{value:"APEX",rating:3},
								{value:"VisualForce",rating:3},
								{value:"Objective-C",rating:2.5},
								{value:"JSP",rating:3},
								]

	var rightSkills = [
								{value:"Postgres",rating:4.5},
								{value:"Adobe Photoshop",rating:4},
								{value:"Android",rating:3},
								{value:"MongoDB",rating:3},
								{value:"IOS",rating:3},
								{value:"Salesforce.com",rating:4.5},
								{value:"AWS",rating:3},
								{value:"Rational Function Tester",rating:3},
								{value:"MVC",rating:4.5},
								{value:"Data Structures",rating:2},
								{value:"Algorithms",rating:3},
								{value:"OOPS",rating:3},
								{value:"Machine Learning",rating:3}
								]

	for(i=0;i<leftSkills.length;i++){
		addSkill(leftSkillPane,leftSkills[i]);
	}

	for(i=0;i<rightSkills.length;i++){
		addSkill(rightSkillPane,rightSkills[i]);
	}
}

function addSkill(givenDiv,givenSkill){
	var ratingDisplay="";
	var i=0;
	for(;i<parseInt(givenSkill.rating,10);	i++) {
		ratingDisplay=ratingDisplay+"<i class=\"fa fa-star\"></i>";
	}
	if(givenSkill.rating > i){
		ratingDisplay=ratingDisplay+"<i class=\"fa fa-star-half-o\"></i>";
		i++;
	}

	for(;i<5;i++){
		ratingDisplay=ratingDisplay+"<i class=\"fa fa-star-o\"></i>";
	}

	givenDiv.append("<div class=\"row\"><div class=\"col-xs-6\"> "+givenSkill.value+"</div><div class=\"col-xs-6\">"+ratingDisplay+"</div>");
}


function randomCharGenerator(type){
	var stringPool="";

	if(type=="lowerCase"){
		stringPool = "abcdefghijklmnopqrstuvwxyz0123456789";
	}else if(type=="upperCase"){
		stringPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	}else if(type=="symbol"){
		stringPool = ",.?/\\(^)![]{}*&^%$#'\"";
	}

	var arr = stringPool.split('');
  return arr[Math.floor(Math.random()*arr.length)];
}


(function($){

    $.fn.shuffleLetters = function(prop){

        // Handling default arguments
        var options = $.extend({
						"step": 8,
						"fps"	: 25,
						"text": ""
        },prop)

        return this.each(function(){

						var page= $(this);
						    str="";

						if(options.text) {
								str=options.text.split('');
						}
						else{
								str=page.text().split('');
						}


						var types=[];
						var letters=[];

						for(var i=0;i<str.length;i++){
							var ch=str[i];

							if(ch==" "){
								types[i]="space";
								continue;
							}else if(/[a-z]/.test(ch)){
								types[i]="lowerCase";
							}else if(/[A-Z]/.test(ch)){
								types[i]="upperCase";
							}else{
								types[i]="symbol";
							}

							letters.push(i);
						}

						page.html("");

						(function shuffle(start){

							var i,len=letters.length,strCopy=str.slice(0);

							if(start>len){
								return;
							}

							for(i=Math.max(start,0);i<=len;i++){

									if(i < start+options.step){
										strCopy[letters[i]]=randomCharGenerator(types[letters[i]]);
									}else{
										strCopy[letters[i]]="";
									}

									page.text(strCopy.join(""));
							}

						setTimeout(function(){
              shuffle(start+1);
            },1000/options.fps);

						})(-options.step);

        });
    };


})(jQuery);
