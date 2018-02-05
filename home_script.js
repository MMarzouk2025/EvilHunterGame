/* ------------------------------ hover in images ----------------------------- */
function die(image){
	
	if(image.id == "devilGirl"){
		image.src = "home_res/devilGirlAfter.png";
		image.className = "";
		image.style.cursor = "crosshair";	
	}
	
	else if (image.id == "devilMan"){
		image.src = "home_res/devilManAfter.png";
		image.className = "";
		image.style.cursor = "crosshair";
	}
	
	else if (image.id == "angelGirl"){
		image.src = "home_res/angelGirlAfter.png";
		image.style.opacity = 0.8;
		image.className = "";
		image.style.cursor = "no-drop";
	}
	
	else if (image.id == "angelMan"){
		image.src = "home_res/angelManAfter.png";
		image.style.opacity = 0.8;
		image.className = "";
		image.style.cursor = "no-drop";
	}
}
 /* ------------------------------ hover out images ----------------------------- */
function live(image){
	if(image.id == "devilGirl"){
		image.src = "home_res/devilGirl.png";
		image.className = "animi";
		image.style.cursor = "auto";
	}
	
	else if (image.id == "devilMan"){
		image.src = "home_res/devilMan.png";
		image.className = "animi";
		image.style.cursor = "auto";
	}

	else if (image.id == "angelGirl"){
		image.src = "home_res/angelGirl.png";
		image.style.opacity = 1;
		image.className = "animi";
		image.style.cursor = "auto";
	}
	
	else if (image.id == "angelMan"){
		image.src = "home_res/angelMan.png";
		image.style.opacity = 1;
		image.className = "animi";
		image.style.cursor = "auto";
	}
}
/* --------------------------------- sound ----------------------------------*/
function switchSound(image){
	var soundBg = document.getElementById("gameSound");
	
	if (image.id == "play"){
			soundBg.pause();
			image.src = "home_res/mute1.png";
			image.id = "pause";
			soundOpen = false;
	}
	else {
			soundBg.play();
			image.src = "home_res/play1.png";
			image.id = "play";
	}
}
/* --------------------------------- story img ----------------------------------*/
window.onload = function(){
	soundImg = document.getElementById("play");
	var changeFlag = true;
	setInterval( function() { 
		document.getElementById("storyImg").src = getImage(changeFlag);
		changeFlag = !changeFlag;
	}, 200);
}

function getImage(switchImg){
	if(switchImg)
		return "home_res/before.png";
	else
		return "home_res/after.png";
}
/* --------------------------------- story dialog ----------------------------------*/
function showStory(){
	if(soundImg.id == "play"){
		switchSound(soundImg);
		soundOpen = true;
	}
	document.getElementById('disDialog').style.display = "block";
	document.getElementById("storySound").play();
}

window.onclick = function(event) {
    if (event.target == disDialog) {
        document.getElementById('disDialog').style.display = "none";
		document.getElementById("storySound").pause();
		if(soundOpen)
			switchSound(soundImg);
    }
}