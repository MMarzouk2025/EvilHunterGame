
var points = 0;
var hearts = 3;
var time=0;
var timeTxt="0:00";
var lvlTime=1;
var level= 1;
var gameState = "playing"; // can be one of two values --> {playing | paused}

var evils = [];
var angels = [];
var gameInterval;

var clouds = [];
for (var i = 0; i < 10; i++) {
	var cloudImgNo;
	switch (i+1) {
		case 1:
			cloudImgNo = 2;
			break;
		case 2:
			cloudImgNo = 11;
			break;
		case 3:
			cloudImgNo = 23;
			break;
		case 4:
			cloudImgNo = 8;
			break;
		case 5:
			cloudImgNo = 14;
			break;
		case 6:
			cloudImgNo = 5;
			break;
		case 7:
			cloudImgNo = 17;
			break;
		case 8:
			cloudImgNo = 26;
			break;
		case 9:
			cloudImgNo = 29;
			break;
		case 10:
			cloudImgNo = 20;
			break;
	}
	clouds[i] = new Cloud(i+1, false, cloudImgNo);
}

document.getElementById("pauseWord").style.display = "none";
document.getElementById("gameSound").play();
startGame();

window.addEventListener("resize", adjustGamePlayResizing);
function adjustGamePlayResizing(){
	for (var i=0; i<evils.length; i++){
		removeEvil(evils[i], document.getElementById("clouds"), document.getElementById("evil_div"+evils[i].id));
	}
	for (var i=0; i<angels.length; i++){
		removeAngel(angels[i], document.getElementById("clouds"), document.getElementById("angel_div"+angels[i].id));
	}
}

/** ------------------------------- TIMER ------------------------------- **/
/***************************************************************************/
var timerFlag=true;
var lvlSec;
var lvlMin;

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;

    function tick() {
        if (gameState == "playing") {
        	var counter = document.getElementById("timer");
        	var current_minutes = mins-1;
        
        	seconds--;
    	
			lvlSec=seconds;
			lvlMin=current_minutes;
    
        	counter.innerHTML=current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + seconds.toString();
        }
        if( seconds > 0 && timerFlag==true) {
            setTimeout(tick, 1000);
        } 
        else {
            if(mins > 1 && timerFlag==true){
            	setTimeout(function () { countdown(mins - 1); }, 1000);
            }
            else{
                // hna nn2el ben el levels 
                clearInterval(gameInterval);
            
				// setTimeout(switchLevel, 4000);
				switchLevel();
            }
        }
    }
    tick();
}
countdown(lvlTime);
/** --------------------------- END OF TIMER ----------------------------- **/
/****************************************************************************/

/***************************************** SWITCH LEVEL FUNCTION *****************************************/
/*-------------------------------------------------------------------------------------------------------*/
function switchLevel(){
		var setBgBlur = function(){
			document.getElementById("wrapper").style.webkitFilter="blur(5px)";
			document.getElementById("dashboard").style.webkitFilter="blur(5px)";
			document.getElementById("switchAvatar").src="../res/hero.png";
			document.getElementById("switchWord").src="../res/next.png";
			document.getElementById("switchScore").innerHTML=points;
		}

		var oldLvlEndSpace, newLvlStartSpace = 2250;
		switch (level) {
			case 1:
				oldLvlEndSpace = 3000;
				break;
			case 2:
				oldLvlEndSpace = 2500;
				break;
			case 3:
				oldLvlEndSpace = 2500;
				break;
			case 4:
				oldLvlEndSpace = 2500;
				break;
		}
    	
        if(hearts>0){
            level++;
            //alert(this.level);
            var link=document.getElementById("levelStyle");
            if(level==2){
            	//alert("Level3");
            	setTimeout(function(){
            		setBgBlur();
					time=lvlTime;
					document.getElementById("switchTime").innerHTML=time.toString()+":00";
					$("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2500);
					setTimeout(function(){
						link.href="night.css";
						setTimeout(function(){
							startGame();
						}, newLvlStartSpace);
						lvlTime=1;
						countdown(lvlTime);
						/*
						document.getElementById("switchView").style.visibility="hidden";
						*/
						$("#switchView").css({opacity: 1}).animate({opacity: 0}, 1500);
						setTimeout(function(){
							document.getElementById("wrapper").style.webkitFilter="blur(0px)";
							document.getElementById("dashboard").style.webkitFilter="blur(0px)";
						}, 1450)
						setTimeout(function(){
							$("#switchView").css({visibility: "hidden"});
						}, 1501);
						document.getElementById("background_container").style
	            			="cursor:url('../res/crosshair_cur3.png') 23 18, auto;"
	                }, 6500);
	            }, oldLvlEndSpace);
            }
        	else if(level==3){  
				//alert("Level3");
				time+=lvlTime;
                
                localStorage.setItem("points",points);
                localStorage.setItem("hearts",hearts);
                localStorage.setItem("time",time);
                
                setTimeout(function(){
	                document.getElementById("switchTime").innerHTML=time.toString()+":00";
	                $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2500);
	                setTimeout(function(){
	                	setBgBlur();
						$("#switchView").css({opacity: 1}).animate({opacity: 0}, 1500);
						setTimeout(function(){
							document.getElementById("wrapper").style.webkitFilter="blur(0px)";
							document.getElementById("dashboard").style.webkitFilter="blur(0px)";
						}, 1450)
						setTimeout(function(){
							$("#switchView").css({visibility: "hidden"});
							setTimeout(function(){location.href="../game/level3-4.html";}, 500);
						}, 1501);
						document.getElementById("background_container").style
	            			="cursor:url('../res/crosshair_cur3.png') 23 18, auto;"
	                }, 6500);
	            }, oldLvlEndSpace);
            }
            /*
            else if(level==4){  
				//alert("Level4");
				setTimeout(function(){
					setBgBlur();
					time+=lvlTime;
					lvlTime=1;
					document.getElementById("switchTime").innerHTML=time.toString()+":00";;
					$("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2500);
					setTimeout(function(){
						ink.href="night.css";
						setTimeout(function(){
							startGame();
						}, newLvlStartSpace);
						//countdown(2);
						$("#switchView").css({opacity: 1}).animate({opacity: 0}, 1500);
						setTimeout(function(){
							document.getElementById("wrapper").style.webkitFilter="blur(0px)";
							document.getElementById("dashboard").style.webkitFilter="blur(0px)";
						}, 1450)
						setTimeout(function(){
							$("#switchView").css({visibility: "hidden"});
						}, 1501);
						
	                }, 6500);
                }, oldLvlEndSpace);
            } 
            */ else {
            	document.getElementById("gameSound").pause();
            }
            //add the other levels
        } else {
        	/*
            clearInterval(gameInterval);
            document.getElementById("gameSound").pause();
            //timerFlag=false;
            document.getElementById("switchAvatar").src="../res/cryAngel.png";
            document.getElementById("switchWord").src="../res/over1.png";
            document.getElementById("switchScore").innerHTML=points;
            document.getElementById("switchTime").innerHTML=timeTxt;
            $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2500);
            */
            clearInterval(gameInterval);
            document.getElementById("gameSound").pause();
            //timerFlag=false;
            document.getElementById("switchAvatar").src="../res/cryAngel.png";
            document.getElementById("switchWord").src="../res/over1.png";
            document.getElementById("switchScore").innerHTML=points;
            document.getElementById("switchTime").innerHTML=timeTxt;
            $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 2500);
            $("#switchView").css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 2500);

            setTimeout(function(){
                setTimeout(function(){
                    //html
                    location.href="../index.html";
                    document.getElementById("switchView").style.visibility="hidden";
                },3500);
                /*
                setTimeout(function(){
                    //html
                    location.href="../index.html";
                },3500);
                */
            }, 6500);
        }
}
/************************************** END OF SWITCH LEVEL FUNCTION **************************************/
/*--------------------------------------------------------------------------------------------------------*/

function shoot(){
	if (gameState == "playing") {
		
		var shotSound = document.getElementById("audioShoot");
		shotSound.pause();
		shotSound.currentTime = 0;
		shotSound.play();
		
		var playArea = document.getElementById("background_container");
		var boomEffect = document.createElement("img");
		boomEffect.src = "../res/shot.png";
		var x = event.clientX;
	    var y = event.clientY;
	    //alert((100*x/window.innerWidth)+", "+(100*y/window.innerHeight));
		boomEffect.style = "position: absolute; left: "+((100*x/window.innerWidth)-3.6)
			+"vw; top: "+((100*y/window.innerHeight)-7)+"vh;"
			+"width: 7vw; height 7vh; z-index: 5;";
		playArea.appendChild(boomEffect);
		window.setTimeout(function(){playArea.removeChild(boomEffect);}, 200);
	}
}

function shootEvil(evil){
	var evilItem = document.getElementById("evil_img"+evil.id);
    evilItem.onclick = false;
	evilItem.src = "../res/shooted_evil"+evil.type+".png";
	
	var smokeImg = document.createElement("IMG");
	smokeImg.id = "smoke_img"+evil.cloudNo;
	smokeImg.src = "../res/smoke.gif";
	smokeImg.style = "position: absolute; width: 10vw; height: 15vh; left: " + 
		($("#evil_img"+evil.id).offset().left - ($("#evil_img"+evil.id).width()/1.25)) + "px; " + 
		"top: " + ($("#evil_img"+evil.id).offset().top - ($("#evil_img"+evil.id).height()/1.5)) + "px; " + 
		"display: none; pointer-events: none;";
	document.getElementById("cloud10").insertBefore(smokeImg, document.getElementById("img21"));
	$("#smoke_img"+evil.cloudNo).fadeIn();
	for (var i = 1; i<=3; i++) {
		$("#evil_div"+evil.id).stop();
	}

	var evilFadeDuration;
	switch (level) {
		case 1:
			evilFadeDuration = 900;
			break;
		case 2:
			evilFadeDuration = 700;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	window.setTimeout(function(){
		$("#smoke_img"+evil.cloudNo).fadeOut();
	}, evilFadeDuration);
	window.setTimeout(function(){
		$("#evil_img"+evil.id).fadeOut();
		if (evils.indexOf(evil) >= 0) {
			evils.splice(evils.indexOf(evil), 1);
		}
		document.getElementById("cloud10").removeChild(smokeImg);
	}, evilFadeDuration+150);
    
    points+=10;
	document.getElementById("score").innerHTML=points;
}

function shootAngel(angel){
	var angelItem = document.getElementById("angel_img"+angel.id);
    angelItem.onclick = false;
	angelItem.src = "../res/shooted_angel"+angel.type+".png";
	
	for (var i = 1; i<=3; i++) {
		$("#angel_div"+angel.id).stop();
	}
	var angelFadeDuration;
	switch (level) {
		case 1:
			angelFadeDuration = 900;
			break;
		case 2:
			angelFadeDuration = 700;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	window.setTimeout(function(){
		$("#angel_img"+angel.id).fadeOut();
	}, angelFadeDuration+150);

	hearts--;
    if(hearts > 0){
		document.getElementsByName("hearts")[hearts].hidden = true;
        // console.log(hearts);
    }
    else{
    	$("#lastHeart").css('opacity', '0');
        clearInterval(gameInterval);
        timerFlag=false;
        
        var m=lvlTime-1;
        var s=60;
        m=m-lvlMin;
        s=s-lvlSec;
        time=time+m;
        
        timeTxt =time.toString() + ":" + (s < 10 ? "0" : "") + s.toString();

        document.getElementById("wrapper").style.webkitFilter="blur(5px)";
        document.getElementById("dashboard").style.webkitFilter="blur(5px)";
        document.getElementById("switchAvatar").src="../res/cryAngel.png";
        document.getElementById("switchWord").src="../res/over1.png";
        document.getElementById("switchScore").innerHTML=points;
        document.getElementById("switchTime").innerHTML=timeTxt;
        $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 3000);  
    }
}

function Cloud(cloudId, isBusy, imgNo){
	this.cloudId = cloudId; // it can be from 1 to 10
	this.isBusy = isBusy;
	this.imgNo = imgNo;
}

function Evil(id, type, cloudNo){
	this.id = id;
	this.type = type; // can come as 1 or 2 or 3 to define the shape of the evil
	this.cloudNo = cloudNo;
}
function addEvil(evil){
	var parentElement = document.getElementById("clouds");
	var evilCloud = document.getElementById("cloud"+evil.cloudNo);
	var evilDiv = document.createElement("DIV");
	evilDiv.id = "evil_div"+evil.id;
	evilDiv.setAttribute("class", "evil_avatar");

	var evilImg = document.createElement("IMG");
	evilImg.src = "../res/evil" + evil.type + ".png";
	evilImg.id = "evil_img" + evil.id;
	evilImg.onclick = function(){ shootEvil(evil); };
	evilImg.ontouchstart = function(){ shootEvil(evil); };
	evilDiv.appendChild(evilImg);

	parentElement.insertBefore(evilDiv, evilCloud);

	var evilCloudImgNo = clouds[evil.cloudNo-1].imgNo;
	var evilPosition = $("#img"+evilCloudImgNo).offset();
	var evilY = evilPosition.top + ($("#img"+evilCloudImgNo).height()/3.75);
	var evilX = evilPosition.left + ($("#img"+evilCloudImgNo).width()/2.75);
	$("#"+evilDiv.id).css({"top": evilY+"px", "left": evilX+"px"});

	setEvilAvatarAnimationRule(evil.id);

	evils.push(evil);
	clouds[evil.cloudNo-1].isBusy = true;
	var removeEvilDuration;
	switch (level) {
		case 1:
			removeEvilDuration = 3400; // after its animation by 600
			break;
		case 2:
			removeEvilDuration = 2500; // after its animation by 300
			break;
		case 3:
			break;
		case 4:
			break;
	}
	window.setTimeout(function(){removeEvil(evil, parentElement, evilDiv);}, removeEvilDuration);
}
function removeEvil(evil, parent, child){
	if (evils.indexOf(evil) >= 0) {
		evils.splice(evils.indexOf(evil), 1);
	}
	clouds[evil.cloudNo-1].isBusy = false;
	try {
		parent.removeChild(child);
	} catch(err) {
		// fast resizing cause some non-critical errors
	}
}

function Angel(id, type, cloudNo){
	this.id = id;
	this.type = type; // can come as 1 or 2 or 3 to define the shape of the angel
	this.cloudNo = cloudNo;
}
function addAngel(angel){
	var parentElement = document.getElementById("clouds");
	var angelCloud = document.getElementById("cloud"+angel.cloudNo);
	var angelDiv = document.createElement("DIV");
	angelDiv.id = "angel_div"+angel.id;
	angelDiv.setAttribute("class", "angel_avatar");

	var angelImg = document.createElement("IMG");
	angelImg.src = "../res/angel" + angel.type + ".png";
	angelImg.id = "angel_img" + angel.id;
	angelImg.onclick = function(){ shootAngel(angel); };
	angelImg.ontouchstart = function(){ shootAngel(angel); };
	angelDiv.appendChild(angelImg);

	parentElement.insertBefore(angelDiv, angelCloud);

	var angelCloudImgNo = clouds[angel.cloudNo-1].imgNo;
	var angelPosition = $("#img"+angelCloudImgNo).offset();
	var angelY = angelPosition.top + ($("#img"+angelCloudImgNo).height()/3.75);
	var angelX = angelPosition.left + ($("#img"+angelCloudImgNo).width()/2.75);
	$("#"+angelDiv.id).css({"top": angelY+"px", "left": angelX+"px"});

	setAngelAvatarAnimationRule(angel.id);

	angels.push(angel);
	clouds[angel.cloudNo-1].isBusy = true;
	var removeAngelDuration;
	switch (level) {
		case 1:
			removeAngelDuration = 2799;
			break;
		case 2:
			removeAngelDuration = 2199;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	window.setTimeout(function(){removeAngel(angel, parentElement, angelDiv);}, removeAngelDuration);
}
function removeAngel(angel, parent, child){
	if (angels.indexOf(angel) >= 0) {
		angels.splice(angels.indexOf(angel), 1);
	}
	clouds[angel.cloudNo-1].isBusy = false;
	try {
		parent.removeChild(child);
	} catch(err) {
		// fast resizing cause some non-critical errors
	}
}

function startGame() {
	var evilId, evilCloud, evilType, angelId, angelCloud, angelType, evilOrAngel;
	var appearancDuration;
	switch (level) {
		case 1:
			appearancDuration = 1000;
			break;
		case 2:
			appearancDuration = 850;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	gameInterval = setInterval(function(){
	//	for (var x=1; x<=2; x++) {
			evilOrAngel = Number(Math.ceil(Math.random()*7));
			if ((evilOrAngel%2)==1) {
				evilType = Math.ceil(Math.random()*3);
				do {
					evilCloud = clouds[Math.ceil(Math.random()*10)-1];
				} while (evilCloud.isBusy);
				if (evils.length == 0) {
					evilId = 1;
				} else {
					evilId = evils[evils.length-1].id+1;
				}
				if (evilCloud.cloudId>=1 && evilCloud.cloudId<=10)
					addEvil(new Evil(evilId, evilType, evilCloud.cloudId));
			} else {
				angelType = Math.ceil(Math.random()*3);
				do {
					angelCloud = clouds[Math.ceil(Math.random()*10)-1];
				} while (angelCloud.isBusy);
				if (angels.length == 0) {
					angelId = 1;
				} else {
					angelId = angels[angels.length-1].id+1;
				}
				if (angelCloud.cloudId>=1 && angelCloud.cloudId<=10)
					addAngel(new Angel(angelId, angelType, angelCloud.cloudId));
			}
	//	}
	}, appearancDuration);
}

function setEvilAvatarAnimationRule(evilId) {
	var h = $("#evil_div"+evilId).css('top').substring(0, 3);
	var yMove = window.innerHeight*14.5/100;
	var duration1, duration2;
	switch (level) {
		case 1:
			duration1 = 1275;
			duration2 = 250;
			break;
		case 2:
			duration1 = 1000;
			duration2 = 200;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	$("#evil_div"+evilId).animate({top: '-='+yMove+'px'}, {
		duration: duration1,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
	$("#evil_div"+evilId).animate({top: '='+yMove+'px'}, {
		duration: duration2,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+Number(now)+'px, 0px)')
		}
	});
	$("#evil_div"+evilId).animate({top: '+='+yMove+'px'}, {
		duration: duration1,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
}
function setAngelAvatarAnimationRule(angelId) {
	var h = $("#angel_div"+angelId).css('top').substring(0, 3);
	var yMove = window.innerHeight*14.5/100;
	var duration1, duration2;
	switch (level) {
		case 1:
			duration1 = 1275;
			duration2 = 250;
			break;
		case 2:
			duration1 = 1000;
			duration2 = 200;
			break;
		case 3:
			break;
		case 4:
			break;
	}
	$("#angel_div"+angelId).animate({top: '-='+yMove+'px'}, {
		duration: duration1,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
	$("#angel_div"+angelId).animate({top: '='+yMove+'px'}, {
		duration: duration2,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+Number(now)+'px, 0px)')
		}
	});
	$("#angel_div"+angelId).animate({top: '+='+yMove+'px'}, {
		duration: duration1,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
}

/********************************* SOUND CONTROL *********************************/
//-------------------------------------------------------------------------------//
function switchSound(image){
	var sound = document.getElementById("gameSound");
	
	if (image.id == "playSound"){
			sound.pause();
			image.src = "../res/mute.png";
			image.id = "pauseSound";
	}
	else {
			sound.play();
			image.src = "../res/play.png";
			image.id = "playSound";
	}
}
//-------------------------------------------------------------------------------//

/******************************* GAME PLAY CONTROL *******************************/
//-------------------------------------------------------------------------------//
function pausePlaySwitch(){
	if (gameState === "playing") {
		gameState = "paused";
		document.getElementById("pauseGame").src = "../res/play_game.png";
		clearInterval(gameInterval);
		for (var i=0; i<evils.length; i++) {
			$("#evil_div"+evils[i].id).dequeue();
			$("#evil_div"+evils[i].id).dequeue();
		}
		for (var i=0; i<angels.length; i++) {
			$("#angel_div"+angels[i].id).dequeue();
			$("#angel_div"+angels[i].id).dequeue();
		}
		$("#pauseWord").fadeIn(500);
	} else {
		gameState = "playing";
		document.getElementById("pauseGame").src = "../res/pause_game.png";
		startGame();
		$("#pauseWord").fadeOut(500);
	}
}
//-------------------------------------------------------------------------------//

//******************************************************************************************************************//
//******************************************************************************************************************//

