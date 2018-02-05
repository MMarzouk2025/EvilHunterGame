
/*
window.setTimeout(function(){goToByScroll("p1");}, 10000);
window.setTimeout(function(){goToByScroll("p2");}, 20000);
window.setTimeout(function(){goToByScroll("p3");}, 30000);
window.setTimeout(function(){goToByScroll("p4");}, 40000);
window.setTimeout(function(){goToByScroll("p5");}, 50000);
*/

function goToByScroll(id){			
	$('html,body').animate({
		scrollTop: $("."+id).offset().top +0
	},400);
}
