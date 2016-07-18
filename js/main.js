$(function() {
	var flag = false;
	var timer = performance.now();
	$("#toolbar").hide();
	jogo();

	$(".celulas").on("click" , function() {
		if (!flag) {
			var pos = $(this).offset();
			$("#toolbar").css({
				left: 5 + pos.left + "px",
				top: 5 + pos.top + "px"
			});
			$("#toolbar").show();
			flag = true;
			this.classList.toggle("Selected");

		}
		else {
			$("#toolbar").hide();			
			flag = false;
		}
	});

	$(".celulas").on("mouseenter", function() {
		var x = document.getElementsByClassName("Selected")[0];
		if(!!x) x.classList.remove("Selected");
		$("#toolbar").hide();			
			flag = false;
	});

	$(".picker").on("click" , function() {
		$("#toolbar").hide();			
		flag = false;
		var x = document.getElementsByClassName("Selected")[0];
		x.value = this.innerHTML;
		busca(x);
		lookfor();
		endgame();
	});
	
	function busca(sel) {
		sel.classList.remove("btn-danger");
		val = sel.value;
		if (val != "") {
			var lin = sel.classList[1];
			var col = sel.classList[2];
			var block = sel.parentElement.classList[1];
			ele(lin,  sel, val);
			ele(col, sel, val);
			elechil(block, sel, val);
		}
	}

	function ele(index, sel, val) {
		e = document.getElementsByClassName(index);
		for (var i = 0; i < e.length; i+=1) {
			if (e[i] != sel && e[i].value == val) {
				sel.classList.add("btn-danger");
				e[i].classList.add("btn-danger");
			}

		}			
	}

	function elechil(index, sel, val) {
		e = document.getElementsByClassName(index);
		e = e[0].children;
		for (var i = 0; i < e.length; i+=1) {
			if (e[i] != sel && e[i].value == val){
				sel.classList.add("btn-danger");
				e[i].classList.add("btn-danger");
			}
		}
	}

	function lookfor(){
		var x = document.getElementsByClassName("btn-danger");
		
		for (var i = x.length-1; i >= 0; i-=1) {
			busca(x[i]);
		}
	};

	$("#limpar").on("click" , function() {
		var buttons = document.getElementsByClassName("celulas");
        for(var i = 0; i<buttons.length; i+=1) {
			buttons[i].classList.remove("btn-danger");
            buttons[i].value = "";
        }
        timer = performance.now();

        buttons = document.getElementsByClassName("btn-warning");

        for(var i = 0; i<buttons.length; i+=1) {
			buttons[i].classList.remove("btn-warning");
			console.log(buttons[i]);
        }
        jogo();
        var intervalID = window.setInterval(myCallback, 497);		
	});

	function jogo () {
		var celula = new Array("L1 C2","L3 C2","L1 C4","L1 C6","L2 C5","L3 C4","L3 C6","L2 C7","L2 C9","L4 C1","L4 C3","L5 C2","L6 C1","L6 C3","L5 C4","L5 C6","L6 C5","L4 C9","L5 C8","L6 C7","L6 C9","L7 C2","L8 C1","L8 C3","L9 C2","L7 C4","L7 C6","L8 C5","L9 C4","L9 C6","L7 C8","L8 C7","L8 C9","L9 C8","L9 C9");
		var valor = new Array(9,3,6,1,3,2,8,9,1,7,9,4,8,3,3,7,1,4,9,5,7,5,9,4,1,7,2,5,9,6,1,7,6,5,8);

		for(var i = 0; i<celula.length; i+=1) {
			var aux = document.getElementsByClassName(celula[i]);
			aux[0].value = valor[i];
			aux[0].disabled = "true";
		}
	}

	function endgame () {
	  var celula = document.getElementsByClassName("celulas");
	  for(var i = 0; i<celula.length; i+=1)
	  	if (celula[i].value == "")
	  		break;
	  
	  if (i == celula.length)
	  	clearInterval(intervalID);
	  	
	}

	var intervalID = window.setInterval(myCallback, 497);
	function myCallback() {
		var aux = new Date(performance.now() - timer);
		if (aux > 180000)
			$('.time')[0].classList.add('btn-warning');
	  $(".time")[0].innerHTML = aux.getMinutes() + ":" + aux.getSeconds();

	}


});
/*
getMinutes() - Returns the minute (0-59).
getSeconds() - Returns the second (0-59).

getMilliseconds() - Returns the milliseconds (0-999).
*/