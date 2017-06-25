// "baraja" 	=> Variable de tipo array que contendra las 52 cartas del poker
// "type_card" 	=> Variable de tipo array que contiene a los 4 valores de una carta 
// "num_random" => Variable para almacenar un número random entre el 0 y el tamaño de la baraja
// "sum_player" => Variable para almacenar la suma de las cartas que van saliendo al momento de jugar
// La meta del juego es que la variable sum_player sea 21, si dicha variable supera el 21 el jugador habra perdido
var baraja = [];
var type_card = [ 
{"name": "dia", "figure": "♦"},
{"name": "cn", "figure": "♠"},
{"name": "cr", "figure": "♥"},
{"name": "tre", "figure": "♣"},
]; 
var num_random = 0, sum_player = 0; 

$(document).ready(function(){
	init();
	// Cuando el usuario le da click a la carta el juego comienza
	$("#init-game").click(function(){
		if (sum_player < 21){
			// Sacamos un número aleatorio
			num = Math.floor(Math.random() * baraja.length);
			// Sumamos el número obtenido de la carta elegida por el número random
			sum_player += baraja[num].value;
			$("#sum_player").html(sum_player);
			// Llamamos a la función draw
			draw_card(baraja[num].value, baraja[num].type.figure, baraja[num].type.name);
			// Eliminamos el número de la baraja a través del metodo splice
			baraja.splice(num, 1); 
			if(sum_player == 21){
				winner();
			}
			if(sum_player > 21){
				game_over();
			} 
		}
	});
	// Cuando el usuario presiona el boton reiniciar se vuelve a cargar el juego
	$("#reboot").click(function(){ 
		init();
	});
	// Cuando el usuario presiona el boton de reiniciar en el modal
	$("#modal-reboot").click(function(){ 
		init();
	}); 
})

// Función para pintar la carta obtenida al azar en el html
function draw_card(num,figure,name){
	// Declaramos una variable de tipo let y hacemos uso de templates en javascript
	let card = `<div class="card card-select ${name} ">
					<div class="text-left">
						<span>${num}</span>
						<span>${figure}</span>
					</div>
					<div class="text-right">
						<span>${num}</span>
						<span>${figure}</span> 
					</div>
				</div>`;
	$("#lists-cards").append(card);		 

}
// Función ganador
function winner(){
	setTimeout(function(){
		$(".modal-title").html("Winner :)")
		$("#myModal").modal('show');
	},800);
}
// Funcion perdedor
function game_over(){
	setTimeout(function(){
		$(".modal-title").html("Game over :(")
		$("#myModal").modal('show');
	},800);
}


// Función para volver a iniciar el juego
function init(){
	baraja = [];
	// Bucle for para llenar las 52 cartas en la variable "baraja"
	for(var i = 0; i <= 12 ; i++){
		baraja[i*4] 	= { "value": i + 1, "type": type_card[0]}; 
		baraja[i*4 + 1] = { "value": i + 1, "type": type_card[1]}; 
		baraja[i*4 + 2] = { "value": i + 1, "type": type_card[2]}; 
		baraja[i*4 + 3] = { "value": i + 1, "type": type_card[3]}; 
	} 
	// reiniciamos la suma del jugador en cero
	sum_player = 0;
	// reiniciamos el contenido de las cartas a vacio
	$("#lists-cards").html('');
	// reiniciamos el puntaje en cero
	$("#sum_player").html(sum_player);
}
