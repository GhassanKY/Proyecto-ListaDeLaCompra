/*************************** Esta Pagina es de la lista de supermercados ****************************/


/*Que cuando se escribe el supermercado se de un autocompletar, que también tome en cuenta las mayúsculas
Que se evite que esté vacío y que no hayan números el campo de input y cuidado con las tildes cuando se de agregar.
Que se asocie esta palabra con una imagen del logo en total van a ser 6 imágenes (Mercadona, Lidl, Carrefour, Ahorramas, Dia y Otros y lo imprima en la tabla.
Que se vayan agregando hacia abajo los supermercados 
Finalmente que la tabla se limite a 3 columnas.*/

//declarar variables
var lidl = "";
var mercadona = "";
var ahorramas = "";
var dia = "";
var carrefour = "";
var otro = "";
var supermercado = document.getElementById('supermercado').value.toLowerCase();//toma el valor del input y lo convierte en minusculas
var listaSupermercados = [];//array vacío para utilizarlo con el local storage
getSupermercadoList()

//pintar la tabla utilizando lo del local storage
for (let i = 0; i < listaSupermercados.length; i++) {
	dibujarTabla(listaSupermercados[i])
}

//validacion de lo que venga del input
function supermercados(e) {
	event.preventDefault(e);//prevenir que el formulario se refresque

	//validar y cambiar acentos y mayusc
	var supermercado = document.getElementById('supermercado').value.toLowerCase();
	supermercado = removeAccents(supermercado);

	//validar que no esté vacío el campo
	if (supermercado == "") {
		return alert('Por favor rellene el campo para continuar');
	} else if (listaSupermercados.includes(supermercado) == true) {//para que los supermercados no se repitan
		limpiar();
		return alert('Ya se ha incluido en la lista este supermercado');
	}

	//Local storage
	listaSupermercados.push(supermercado)
	localStorage.setItem('listaSupermercados', JSON.stringify(listaSupermercados))
	dibujarTabla(supermercado)
}


function dibujarTabla(supermercado) {


	const determinados = ["lidl", "mercadona", "ahorramas", "dia", "carrefour"];


	//crear filas
	let caja = document.createElement("div");
	caja.classList.add('caja');

	//crear celdas
	for (var j = 0; j < 1; j++) {
		let cuadro = document.createElement("div");
		cuadro.classList.add('otro');

		//si el supermercado es otro entonces agregar el nombre abajo de la imagen si no no hacer nada
		var texto = document.createElement("p");
		if (determinados.includes(supermercado) !== true) {
			texto.innerText = supermercado
		} else {
			texto.innerText = supermercado
			texto.style.display = "none"
		}
		cuadro.appendChild(texto);

		//crear diferentes tags y agregar estilos dentro de la celda 
		let logo = document.createElement('img');
		logo.classList.add('logosupermercados');
		cuadro.id = giveId(supermercado)

		let cerrar = document.createElement("span");
		cerrar.classList.add('close');
		cerrar.innerText = "x";
		cerrar.onclick = function borrar(ev) {
			var index = ev.currentTarget.parentNode.id

			if (window.confirm("¿Quieres eliminar este supermercado?")) {
				ev.target.parentNode.parentNode.remove();

				//traer el texto que estoy eliminando
				var eliminado = listaSupermercados.indexOf(texto.innerText)

				//con index of utilizarlo para el splice
				listaSupermercados.splice(eliminado, 1);
				localStorage.setItem('listaSupermercados', JSON.stringify(listaSupermercados))

				// Para pegar en la función de borrar en página de supermercados
				let productListLocal = localStorage.getItem("localProductList")
				let productList = JSON.parse(productListLocal)
				for (let i = 0; i < productList.length; i++) {
					var index = productList[i].details.findIndex(obj => obj.supermarket == texto.innerText)
					if (index !== -1) {
						productList[i].details[index].supermarket = ""
						productList[i].details[index].price = ""
					}
					localStorage.setItem("localProductList", JSON.stringify(productList))
				}
			}
		}

		//meter todo en la celda
		cuadro.appendChild(logo);
		cuadro.appendChild(cerrar);
		caja.appendChild(cuadro);

		//meter la celda en la fila	
		contenedor.appendChild(caja);

		limpiar();
	}
}
//para darle un id al valor que entre por input
function giveId(supermercado1) {

	//asignarle un id a cada parametro
	switch (supermercado1) {
		case (supermercado1 = "lidl"):
			return "lidl";

		case (supermercado1 = "mercadona"):
			return "mercadona";

		case (supermercado1 = "ahorramas"):
			return "ahorramas";

		case (supermercado1 = "dia"):
			return "dia";

		case (supermercado1 = "carrefour"):
			return "carrefour";

		default:
			return "";
	}

}

//para el modal
function prueba() {
	document.getElementById("modal1").style.display = "block";// para mostrarlo
}

modal = document.getElementById('modal1')
modal.onclick = function () {
	modal.style.display = "none";//para que esté escondido
}

//resetear input
function limpiar() {
	document.getElementById("supermercado").value = "";
}

//remover acentos
/*Aquí ocurren dos cosas
	
normalizar()a la forma normal NFD Unicode descompone los grafemas combinados en la combinación de los simples. El è de Crème acaba expresado como e + ̀.
Utilizando una clase de caracteres regex para que coincida con el rango U+0300 → U+036F, ahora es trivial deshacerse globalmente de los diacríticos, 
que el estándar Unicode agrupa convenientemente como el bloque Unicode Combining Diacritical Marks.*/

const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getSupermercadoList() {
	listaguardada = localStorage.getItem('listaSupermercados');
	if (listaguardada == null) {
		listaSupermercados = [];// si está vacía no "pinta" nada
	} else {
		listaSupermercados = JSON.parse(listaguardada);//si tiene datos me los traiga y los "pinte"
	}
	return listaSupermercados
}
