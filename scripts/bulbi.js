window.addEventListener("load", function() {
	console.log("js charge");
	var bb = document.querySelector("bulbi");
	window.addEventListener("keydown", function(evt) {
		console.log("dq");
		if(evt.keyCode == 37) {
		var rp = parseFloat(bb.style["right"]);
		console.log("rp:",rp);	
		bb.style["right"] =  (rp + 0.5) + "vw";
		console.log("petit saut");
		// var rp = parseFloat(bb.style["transform"]);
		// console.log("rp:",rp);	
		// bb.style["transform"] =  "translateX(-5vw)";		
		}
	},false);
},false);