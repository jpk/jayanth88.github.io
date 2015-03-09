$(document).ready(function()
{
	applyResize();
	setupColorDivision();

	shufflePeriodically();
	populateSkills();
	//
});

function shufflePeriodically(){
	var nameSpace = $("#shuffleMe");
	nameSpace.shuffleLetters();
	var tagLine=["I am a huge fan of Lord of the Rings!",
							"Color schemes & typography are topics of my interest!",
							"When not staring at a screen, I am usually at the gym.",
							"I prefer playing as a tank in LOL",
							"I enjoy designing & front-end development",
							"Coldplay,Mettalica,Linkin Park.. etc. are just a few of my favorite music bands"];
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

function populateSkills(){
	var leftSkillPane= $("#leftSkillPane");
	var rightSkillPane= $("#rightSkillPane");

	var leftSkills = [
								{value:"JAVA",rating:4.5},
								{value:"Python",rating:2},
								{value:"Javascript",rating:3},
								{value:"HTML",rating:3},
								{value:"CSS",rating:3},
								{value:"APEX",rating:3},
								{value:"PL/SQL",rating:3.5},
								]

	var rightSkills = [
								{value:"Postgres",rating:4.5},
								{value:"Salesforce.com",rating:4.5},
								{value:"MVC",rating:4.5},
								{value:"Data Structures",rating:2},
								{value:"Algorithms",rating:3},
								{value:"OOPS",rating:3},
								{value:"Machine Learning",rating:3},
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
		ratingDisplay=ratingDisplay+"<i class=\"fa fa-star-half\"></i>"
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
