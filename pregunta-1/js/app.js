// List es para la lista de imagenes
// Las variables path1 y path2 son para obtener las imagenes de lorem pixel
// La variable img es para almacenar las imagenes
// intentos es para el número de intentos
var list = new Array(25);
var path1, path2, img = '', intentos,aciertos,bands, num ;  
function iniciar(){
	intentos = 0;
	aciertos = 0;
	$("#intentos").html(intentos);
	bands = '';
	num = -1;
	path1 = 'http://lorempixel.com/output/food-q-c-240-240-';
	path2 = 'http://lorempixel.com/output/sports-q-c-240-240-';
	// Llenar imagenes
	for(var i=0; i < list.length/2; i++){
		if(i == 13){
			list[i + 1] = path1 + (i + 1) + '.jpg';
		}else{ 
			if(i < 10 ){
				list[i] = list[i + 12] = path1 + (i + 1) + '.jpg';			
			}else{
				list[i] = list[i + 12] = path2 + (i - 9 ) + '.jpg';			
			}
		} 
	}
	// Pintar imagenes
	for(var i=0; i < list.length; i++){
		img += `<div class="col-xs ">
		<div class="card" data-id="${list[i]}" data-num="${i}">
		<div class="face"><img src="${list[i]}"/></div>
		<div class="face back"></div>	
		</div>
		</div>` 
	}
	quitar();
}


$(document).ready(function(){
	iniciar();
	var grid = $("#grid");
	grid.html(img);
	$("#voltear").click(function(){
		grid.addClass("active")
	})
	$("#deshacer").click(function(){
		grid.removeClass("active")
		iniciar();
	})
	$(".card").click(function(){
		console.log(1,$(this).attr("data-id"))
		$(this).css({transform: "rotateY(0deg)"})
		if (bands == ''){
			bands = $(this).attr("data-id"); 
			num = $(this).attr("data-num"); 
		}else{
			console.log(2,$(this).attr("data-id"))
			if(bands != $(this).attr("data-id") || num  == $(this).attr("data-num")){
				intentos++;
				aciertos = 0;
				$("#intentos").html(intentos);
				quitar();
				if(intentos == 2){
					$(".modal-title").html("Perdiste :)")
					$("#myModal").modal('show');
					iniciar();
				}
			}
			else{
				aciertos++;
				if(aciertos == 2){
					setTimeout(function(){
						$(".modal-title").html("Winner")
						$("#myModal").modal('show');					
						iniciar();
					}, 1000);
				}
			}
			bands = ''
			num = 0
		} 	
	})
})


function quitar(){ 
	setTimeout(function(){
		$(".card").css({transform: ""});
	}, 1500); 
}