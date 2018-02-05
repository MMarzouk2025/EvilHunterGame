
var points = parseInt(localStorage.getItem("points"));
var hearts = parseInt(localStorage.getItem("hearts"));
var time=parseInt(localStorage.getItem("time"));
var timeTxt="0:00";
var lvlTime=1;
var level= 1;
var gameState = "playing"; // can be one of two values --> {playing | paused}

if(hearts==2){
		document.getElementsByName("hearts")[hearts].hidden = true;
    }
else if(hearts==1){
    		document.getElementsByName("hearts")[2].hidden = true;
            document.getElementsByName("hearts")[hearts].hidden = true;
}
document.getElementById("score").innerHTML=points;

var evils = [];
var angels = [];
var gameInterval;

var clouds = [];
for (var i = 0; i < 12; i++) {
	var cloudImgNo;
	switch (i+1) {
		case 1:
			cloudImgNo = 1;
			break;
		case 2:
			cloudImgNo = 2;
			break;
		case 3:
			cloudImgNo = 3;
			break;
		case 4:
			cloudImgNo = 4;
			break;
		case 5:
			cloudImgNo = 5;
			break;
		case 6:
			cloudImgNo = 6;
			break;
		case 7:
			cloudImgNo = 7;
			break;
		case 8:
			cloudImgNo = 8;
			break;
		case 9:
			cloudImgNo = 9;
			break;
		case 10:
			cloudImgNo = 10;
			break;
		case 11:
			cloudImgNo = 11;
			break;
		case 12:
			cloudImgNo = 12;
			break;
	}
	clouds[i] = new Cloud(i+1, false, cloudImgNo);
}

document.getElementById("pauseWord").style.display = "none";
document.getElementById("gameSound").play();
startGame();

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
	        //console.log(seconds);
	        var counter = document.getElementById("timer");
	        var current_minutes = mins-1;
	        //console.log(current_minutes);
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
		document.getElementById("wrapper").style.webkitFilter="blur(5px)";
		document.getElementById("dashboard").style.webkitFilter="blur(5px)";
		document.getElementById("switchAvatar").src="../res/hero.png";
		document.getElementById("switchWord").src="../res/next.png";
		document.getElementById("switchScore").innerHTML=points;
    	
        if(hearts>0){
            level++;
            //alert(this.level);
            var link=document.getElementById("levelStyle");
            if(level==2){
            	time+=lvlTime;
				document.getElementById("switchTime").innerHTML=time.toString()+":00";
                
				$("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 4000);
                $("#switchView").css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 4000);
                
				setTimeout(function(){
					link.href="res/Morning.css";
					lvlTime=1;
                    
                    setTimeout(function(){
					document.getElementById("switchView").style.visibility="hidden";
                        startGame();
                        countdown(lvlTime);
                    },3000);
                    
					wrapper.style.webkitFilter="blur(0px)";
					dashboard.style.webkitFilter="blur(0px)";
                   
                }, 4000);
            }
        	else {
                
                clearInterval(gameInterval);
                document.getElementById("gameSound").pause();
            //timerFlag=false;
            document.getElementById("switchAvatar").src="../res/hero.png";
            document.getElementById("switchWord").src="../res/win.png";
            document.getElementById("switchScore").innerHTML=points;
            time+=lvlTime;
				document.getElementById("switchTime").innerHTML=time.toString()+":00";
                
            $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 4000);
            $("#switchView").css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 4000);

            setTimeout(function(){
      					
                setTimeout(function(){
                    //html
                    document.getElementById("switchView").style.visibility="hidden";
                },4000);
                setTimeout(function(){
                    //html
                    location.href="../index.html";
                },2700);
                }, 4000);
            }
            }
            //add the other levels
         else {
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
		shotSound.currentTime = 250;
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
	evilItem.src = "res/img/shooted_evil"+evil.type+".png";
	
	//showSmoke(evil.id);
	//$("#smoke_canvas"+evil.id).fadeIn();
	for (var i = 1; i<=3; i++) {
		$("#evil_div"+evil.id).stop();
	}
	window.setTimeout(function(){
		//$("#smoke_canvas"+evil.id).fadeOut();
		$("#evil_img"+evil.id).fadeOut();
		if (evils.indexOf(evil) >= 0) {
			evils.splice(evils.indexOf(evil), 1);
		}
	}, 1250);
    
    points+=10;
	document.getElementById("score").innerHTML=points;
}

function shootAngel(angel){
	var angelItem = document.getElementById("angel_img"+angel.id);
    angelItem.onclick = false;
	angelItem.src = "res/img/shooted_angel"+angel.type+".png";
	
	for (var i = 1; i<=3; i++) {
		$("#angel_div"+angel.id).stop();
	}
	window.setTimeout(function(){
		$("#angel_img"+angel.id).fadeOut();
	}, 1250);

	hearts--;
    if(hearts > 0){
		document.getElementsByName("hearts")[hearts].hidden = true;
        // console.log(hearts);
    }
    else{
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
        $("#switchView").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 4000);
        $("#switchView").css({opacity: 1, visibility: "visible"}).animate({opacity: 0}, 4000);

        setTimeout(function(){
      					
            setTimeout(function(){
                //html
                document.getElementById("switchView").style.visibility="hidden";
                },4000);
            setTimeout(function(){
                //html
                location.href="../index.html";
                },2700);
                }, 4000);
    }
    
}

function Cloud(cloudId, isBusy, imgNo){
	this.cloudId = cloudId; // Only 3 clouds 1, 2 and 3 & the rest Rocks
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
	var parentElement2 = document.getElementById("rock");
	var parentElement3 = document.getElementById("sky");
	var parentElement4 = document.getElementById("img8");
	var evilCloud = document.getElementById("img"+evil.cloudNo);
	var evilDiv = document.createElement("DIV");
	evilDiv.id = "evil_div"+evil.id;
	evilDiv.setAttribute("class", "evil_avatar");
	/*
	var smokeCanvas = document.createElement("CANVAS");
	smokeCanvas.id = "smoke_canvas"+evil.id;
	smokeCanvas.setAttribute("class", "smoke");
	*/
	var evilImg = document.createElement("IMG");
	evilImg.src = "res/img/evil" + evil.type + ".png";
	evilImg.id = "evil_img" + evil.id;
	evilImg.onclick = function(){ shootEvil(evil); };
	evilImg.ontouchstart = function(){ shootEvil(evil); };
	//evilDiv.appendChild(smokeCanvas);
	evilDiv.appendChild(evilImg);

	if(evil.cloudNo>=1 && evil.cloudNo<=3){
		parentElement.insertBefore(evilDiv, evilCloud);
		var evilCloudImgNo = clouds[evil.cloudNo-1].imgNo;
		var evilPosition = $("#img"+evilCloudImgNo).offset();
		var evilY = evilPosition.top + ($("#img"+evilCloudImgNo).height()/2.5);
		var evilX = evilPosition.left + ($("#img"+evilCloudImgNo).width()/2.4);
		$("#"+evilDiv.id).css({"top": evilY+"px", "left": evilX+"px"});

		setEvilAvatarAnimationRule(evil.id);

		evils.push(evil);
		clouds[evil.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeEvil(evil, evilDiv);}, 3500);
	}
	else if(evil.cloudNo>=4 && evil.cloudNo<=7){
		parentElement2.insertBefore(evilDiv, evilCloud);
		
		var evilCloudImgNo = clouds[evil.cloudNo-1].imgNo;
		var evilPosition = $("#img"+evilCloudImgNo).offset();
		var evilY = evilPosition.top + ($("#img"+evilCloudImgNo).height()/3.75);
		var evilX = evilPosition.left + ($("#img"+evilCloudImgNo).width()/2.75);
		$("#"+evilDiv.id).css({"top": evilY+"px", "left": evilX+"px"});

		setEvilAvatarAnimationRule(evil.id);

		evils.push(evil);
		clouds[evil.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeEvil(evil, evilDiv);}, 3500);
	}
	else if(evil.cloudNo == 8){
		parentElement3.insertBefore(evilDiv, evilCloud);
		
		var evilCloudImgNo = clouds[evil.cloudNo-1].imgNo;
		var evilPosition = $("#img"+evilCloudImgNo).offset();
		var countpercentage1 = 26;
		if(countpercentage1>28 && countpercentage1<50){
			countpercentage1=50;
		}
		else if(countpercentage1>55){
			countpercentage1=26;
		}
		countpercentage1=countpercentage1+2;
		$("#"+evilDiv.id).css({"bottom": "5%", "left": +countpercentage1+"%"});

		setEvilAvatarAnimationRule(evil.id);

		evils.push(evil);
		clouds[evil.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeEvil(evil, evilDiv);}, 3500);
	}
	else{
		parentElement4.insertBefore(evilDiv, evilCloud);
		var evilCloudImgNo = clouds[evil.cloudNo-1].imgNo;
		var evilPosition = $("#img"+evilCloudImgNo).offset();
		evilImg.style="width:30%;height:90%;";


		if(evil.cloudNo == 9){
			var countpercentage2 = 37;
			if(countpercentage2<46){
				countpercentage2=36;
			}
			countpercentage2=countpercentage2+2;
			$("#"+evilDiv.id).css({"bottom": "38%", "left": +countpercentage2+"%"});
		}
		if(evil.cloudNo == 10){
			$("#"+evilDiv.id).css({"bottom": "-2.5%", "left": "25.5%"});
		}
		else{
			var countpercentage3 = 28;
			$("#"+evilDiv.id).css({"bottom": "-2.5%", "left": "65%"});
		}
		setEvilAvatarAnimationRule(evil.id);

		evils.push(evil);
		clouds[evil.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeEvil(evil, evilDiv);}, 3500);
	}

}
function removeEvil(evil, child){
	if (evils.indexOf(evil) >= 0) {
		evils.splice(evils.indexOf(evil), 1);
	}
	clouds[evil.cloudNo-1].isBusy = false;
	child.parentNode.removeChild(child);
}

function Angel(id, type, cloudNo){
	this.id = id;
	this.type = type; // can come as 1 or 2 or 3 to define the shape of the angel
	this.cloudNo = cloudNo;
}
function addAngel(angel){
	var parentElement = document.getElementById("clouds");
	var parentElement2 = document.getElementById("rock");
	var parentElement3 = document.getElementById("sky");
	var parentElement4 = document.getElementById("img8");
	var angelCloud = document.getElementById("img"+angel.cloudNo);
	var angelDiv = document.createElement("DIV");
	angelDiv.id = "angel_div"+angel.id;
	angelDiv.setAttribute("class", "angel_avatar");

	var angelImg = document.createElement("IMG");
	angelImg.src = "res/img/angel" + angel.type + ".png";
	angelImg.id = "angel_img" + angel.id;
	angelImg.onclick = function(){ shootAngel(angel); };
	angelImg.ontouchstart = function(){ shootAngel(angel); };
	angelDiv.appendChild(angelImg);

	if(angel.cloudNo>=1 && angel.cloudNo<=3){
		parentElement.insertBefore(angelDiv, angelCloud);
		var angelCloudImgNo = clouds[angel.cloudNo-1].imgNo;
		var angelPosition = $("#img"+angelCloudImgNo).offset();
		var angelY = angelPosition.top + ($("#img"+angelCloudImgNo).height()/2.5);
		var angelX = angelPosition.left + ($("#img"+angelCloudImgNo).width()/2.4);
		$("#"+angelDiv.id).css({"top": angelY+"px", "left": angelX+"px"});

		setAngelAvatarAnimationRule(angel.id);	

		angels.push(angel);
		clouds[angel.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeAngel(angel, angelDiv);}, 3500);
	}
	else if(angel.cloudNo>=4 && angel.cloudNo<=7){
		parentElement2.insertBefore(angelDiv, angelCloud);
		
		var angelCloudImgNo = clouds[angel.cloudNo-1].imgNo;
		var angelPosition = $("#img"+angelCloudImgNo).offset();
		var angelY = angelPosition.top + ($("#img"+angelCloudImgNo).height()/3.75);
		var angelX = angelPosition.left + ($("#img"+angelCloudImgNo).width()/2.75);
		$("#"+angelDiv.id).css({"top": angelY+"px", "left": angelX+"px"});

		setAngelAvatarAnimationRule(angel.id);	

		angels.push(angel);
		clouds[angel.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeAngel(angel, angelDiv);}, 3500);
	}
	else if(angel.cloudNo == 8){
		parentElement3.insertBefore(angelDiv, angelCloud);
		
		var angelCloudImgNo = clouds[angel.cloudNo-1].imgNo;
		var angelPosition = $("#img"+angelCloudImgNo).offset();
		var countpercentage1 = 26;
		if(countpercentage1>28 && countpercentage1<50){
			countpercentage1=50;
		}
		else if(countpercentage1>55){
			countpercentage1=26;
		}
		countpercentage1=countpercentage1+2;
		$("#"+angelDiv.id).css({"bottom": "5%", "left": +countpercentage1+"%"});

		setAngelAvatarAnimationRule(angel.id);	

		angels.push(angel);
		clouds[angel.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeAngel(angel, angelDiv);}, 3500);
	}
	else{
		parentElement4.insertBefore(angelDiv, angelCloud);
		var angelCloudImgNo = clouds[angel.cloudNo-1].imgNo;
		var angelPosition = $("#img"+angelCloudImgNo).offset();
		angelImg.style="width:35%;height:90%;";
		if(angel.cloudNo == 9){
			var countpercentage2 = 37;
			if(countpercentage2<46){
				countpercentage2=36;
			}
			countpercentage2=countpercentage2+2;
			$("#"+angelDiv.id).css({"bottom": "38%", "left": +countpercentage2+"%"});
		}
		if(angel.cloudNo == 10){
			$("#"+angelDiv.id).css({"bottom": "-2.5%", "left": "25.5%"});
		}
		else{
			var countpercentage3 = 28;
			$("#"+angelDiv.id).css({"bottom": "-2.5%", "left":"65%"});
		}
		setAngelAvatarAnimationRule(angel.id);	

		angels.push(angel);
		clouds[angel.cloudNo-1].isBusy = true;
		window.setTimeout(function(){removeAngel(angel, angelDiv);}, 3500);
	}
}
function removeAngel(angel, child){
	if (angels.indexOf(angel) >= 0) {
		angels.splice(angels.indexOf(angel), 1);
	}
	clouds[angel.cloudNo-1].isBusy = false;
	child.parentNode.removeChild(child);
}

function startGame() {
	var evilId, evilCloud, evilType, angelId, angelCloud, angelType, evilOrAngel;
	gameInterval = setInterval(function(){
		evilOrAngel = Number(Math.ceil(Math.random()*7));
		if ((evilOrAngel>=1 && evilOrAngel<=4) || evilOrAngel==6) {
			evilType = Math.ceil(Math.random()*3);
			do {
				evilCloud = clouds[Math.ceil(Math.random()*10)-1];
			} while (evilCloud.isBusy);
			if (evils.length == 0) {
				evilId = 1;
			} else {
				evilId = evils[evils.length-1].id+1;
			}
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
			addAngel(new Angel(angelId, angelType, angelCloud.cloudId));
		}	
	}, 1250);
}

function setEvilAvatarAnimationRule(evilId) {
	var h = $("#evil_div"+evilId).css('top').substring(0, 3);
	var yMove = window.innerHeight*14.5/100;
	$("#evil_div"+evilId).animate({top: '-='+yMove+'px'}, {
		duration: 1600,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
	$("#evil_div"+evilId).animate({top: '='+yMove+'px'}, {
		duration: 300,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+Number(now)+'px, 0px)')
		}
	});
	$("#evil_div"+evilId).animate({top: '+='+yMove+'px'}, {
		duration: 1600,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 100px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
}
function setAngelAvatarAnimationRule(angelId) {
	var h = $("#angel_div"+angelId).css('top').substring(0, 3);
	var yMove = window.innerHeight*14.5/100;
	$("#angel_div"+angelId).animate({top: '-='+yMove+'px'}, {
		duration: 1600,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
	$("#angel_div"+angelId).animate({top: '='+yMove+'px'}, {
		duration: 300,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+Number(now)+'px, 0px)')
		}
	});
	$("#angel_div"+angelId).animate({top: '+='+yMove+'px'}, {
		duration: 1600,
		step: function(now, fx){
			$(this).css('clip', 'rect(0px, 120px, '+(Number(h)+10-Number(now))+'px, 0px)')
		}
	});
}

//******************************************************************************************************************//
//******************************************************************************************************************//

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