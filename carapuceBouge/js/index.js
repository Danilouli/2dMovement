$(document).ready(function() { 

	var keys = []; 	//Tableau objet contenant les différentes touches pressées selon leur keyCode,
	var lastKeyCodeDown; //contient le keyCode de la dernière touche appuyée
	var lastKeyCodeUp; //continent le keyCode de la dernière touche levée

	/************************NON TRAVERSAGE CLASSES .non-cross PAR DES CLASSES .non-crosser *************************/

	function lastArrowKeyCodeDown() { 
		if ((lastKeyCodeDown == 37) || (lastKeyCodeDown == 38) || (lastKeyCodeDown == 39) || (lastKeyCodeDown == 40)) { 
			return lastKeyCodeDown;
		}
		else {}
	}

	function lastArrowKeyCodeUp() { 
		if ((lastKeyCodeUp == 37) || (lastKeyCodeUp == 38) || (lastKeyCodeUp == 39) || (lastKeyCodeUp == 40)) { 
			return lastKeyCodeUp;
		}
		else {}
	}

	function areTouching(truc1,truc2) {
		var x1 = truc1.position().left,
			y1 = truc1.position().top,
			w1 = truc1.width(),
			h1 = truc1.height(),
			x2 = truc2.position().left,
			y2 = truc2.position().top,
			w2 = truc2.width(),
			h2 = truc2.height();

		if((x2 - w1 < x1) && (x1 < x2 + w2) && (y2 - h1 < y1) && (y1 < y2 + h2)) { 
			return true;
		}
		else {return false;}
	}

	function areTouchingBottomTop(truc1,truc2) { 
		var x1 = truc1.position().left,
			y1 = truc1.position().top,
			w1 = truc1.width(),
			h1 = truc1.height(),
			x2 = truc2.position().left,
			y2 = truc2.position().top,
			w2 = truc2.width(),
			h2 = truc2.height();

		if((x2 - w1 < x1) && (x1 < x2 + w2) && (y2 - h1 < y1) && (y1 < y2)) { 
			return true;
		}
		else {return false;}		
	}

	function areTouchingTopBottom(truc1,truc2) { 
		var x1 = truc1.position().left,
			y1 = truc1.position().top,
			w1 = truc1.width(),
			h1 = truc1.height(),
			x2 = truc2.position().left,
			y2 = truc2.position().top,
			w2 = truc2.width(),
			h2 = truc2.height();

		if((x2 - w1 < x1) && (x1 < x2 + w2) && (y2 < y1) && (y1 < y2 + h2 )) { 
			return true;
		}
		else {return false;}		
	}

	$(window).on('click', function() { 
		if(areTouching($('.non-crosser'),$('.non-cross'))) { 
			alert("Ca touche!");
		}
		else{alert("Ca touche pas!");}
	});

	/**********FIN NON TRAVERSAGE DES CLASSES .non-crosser et .non-cross***************/

	/***************MOUVEMENT DES CLASSES .character *********************************/

	//Definition des fonctions de mouvement...

	function goUp(truc) { 
		if((truc.position().top < 0) || areTouchingTopBottom(truc,$('.non-cross'))) {}
		else {truc.animate({top: "-=1%"},1).css("background-position","0% 100%");}
	} 

	function goDown(truc) {
		if((truc.position().top + truc.height() > $(window).height()) || areTouchingBottomTop(truc,$('.non-cross'))) {}
		else {truc.animate({top: "+=1%"},1).css("background-position","100% 0%");}
	} 

	function goLeft(truc) { 
		if((truc.position().left < 0)) {}
		else {truc.animate({left: "-=0.56%"},1).css("background-position","100% 100%");}
	}

	function goRight(truc) {
		if((truc.position().left + truc.width() > $(window).width())) {}
		else {truc.animate({left: "+=0.56%"},1).css("background-position","0% 0%");}
	}

	function goUpLeft(truc) { 
		if((truc.position().left < 0) || (truc.position().top < 0)) {}
		else {truc.animate({left: "-=0.56%", top: "-=1%"},1).css("background-position","0% 100%");}
	}

	function goUpRight(truc) { 
		if((truc.position().left + truc.width() > $(window).width()) || (truc.position().top < 0)) {}
		else {truc.animate({left: "+=0.56%", top: "-=1%"},1).css("background-position","0% 100%");}
	} 

	function goDownLeft(truc) { 
		if((truc.position().left < 0) || (truc.position().top + truc.height() > $(window).height())) {}
		else {truc.animate({left: "-=0.56%", top: "+=1%"},1).css("background-position","100% 0%");}
	}

	function goDownRight(truc) { 
		if((truc.position().left + truc.width() > $(window).width()) || (truc.position().top + truc.height() > $(window).height())) {}
		else {truc.animate({left: "+=0.56%", top: "+=1%"},1).css("background-position","100% 0%");}
	}  

	//Fonctions pour connaitre le contenu de key[]...

	function test_key(keyCode) { 
		if (keys[keyCode]) {return true;}
		else {return false;}  
	} //Fonction pour tester si une touche est pressée (test_key),

	function test_keys() { 
	    var i,
	        keylist = arguments,
	        status = true;

	    for(i = 0; i < keylist.length; i++){
	        status = status && test_key(keylist[i]);
	    }
	    return status; 
	}  //...et si plusieurs le sont (test_keys)


	//Fonctions de callback pour faire des trucs selon les touches appuyées...

	function addKey(key) {
		lastKeyCodeDown = key.which;
		keys[key.which] = true; 
	} //Fonction de callback qui rend true la case de key[] d'indice le keyCode valant la touche préssée

	function removeKey(key) {
		lastKeyCodeUp = key.which;
		delete keys[key.which];
	} //Fonction de callback qui supprime la case de key[] d'indice le keyCode valant la touche levée

	//Fonction qui fait bouger notre personnage de class CSS .character

	function moving(truc) {
		if(test_keys(37,38,39,40) || test_keys(37,38,39) || test_keys(37,39,40) || test_keys(37,38,40) || test_keys(38,39,40)) {}
		else if(test_keys(37,38)) { 
			goUpLeft(truc);
		}
		else if(test_keys(37,39)) { 
		}
		else if(test_keys(37,40)) { 
			goDownLeft(truc);
		}
		else if(test_keys(38,39)) { 
			goUpRight(truc);
		}
		else if(test_keys(38,40)) { 
		}
		else if(test_keys(39,40)) { 
			goDownRight(truc);
		}
		else if(test_keys(37)) { 
			goLeft(truc);
		}
		else if(test_keys(38)) { 
			goUp(truc);
		}
		else if(test_keys(39)) { 
			goRight(truc);
		}
		else if(test_keys(40)) { 
			goDown(truc);
		}
		else{}
	}

	//On place nos events listeners en jQuery

	$(window).on('keydown keypress', addKey);
	$(window).on('keyup', removeKey);

	//Et la fonction de mouvement moving sera appellée chaque 30ms pour vérifier si notre personnage bouge.
	setInterval(function() {moving($('.character'));},30);

	/************************FIN MOUVEMENT CLASSES .character *************************************/

});

