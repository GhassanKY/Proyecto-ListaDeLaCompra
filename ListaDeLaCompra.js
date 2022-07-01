/*************************** Esta Pagina es de la lista principal ****************************/
firstVisit();

supermercados = [];
storedSupermarket = localStorage.getItem("listaSupermercados");
supermercados = JSON.parse(storedSupermarket);
var almacenamientoOBJ = [];
getAlmacenamientoObjeto();
filtro();

//Agregar una nueva tarea       //Agregar una nueva tarea               
function addProduct(e) {
    event.preventDefault(e);
    var nombreProducto = document.getElementById("productText").value;
    if (!nombreProducto) return;
    crearDivProducto(nombreProducto);
    producto(nombreProducto);
    localStorage.setItem('listaCompraLocal', JSON.stringify(almacenamientoOBJ));
    resetInput();
}
//Agregar una nueva tarea       //Agregar una nueva tarea  



//Se crea el DIV en el que se almacena el (addProduct)
function crearDivProducto(Nombre) {
    const productContainer = document.getElementById('productsContainer');
    const product = document.createElement('div');
    product.id = Nombre + "-Container";
    product.classList.add('product', 'roundBorder');
    var text = document.createElement("p");
    text.innerText = Nombre;
    product.appendChild(text);
    productContainer.prepend(product);
    //Se crea el DIV en el que se almacena el (addProduct)



    //Boton de Cerrar     //Boton de Cerrar   
    let cerrar = document.createElement("span");
    cerrar.innerText = "x";
    cerrar.classList.add('close');
    cerrar.onclick = function borrar(ev) {
        let productName = ev.target.previousSibling.innerText.toLowerCase();
        if (window.confirm("¿Quieres eliminar este producto?")) {
            ev.target.parentNode.remove();
            for (let i = 0; i < almacenamientoOBJ.length; i++) {
                if (almacenamientoOBJ[i].Nombre == productName) {
                    almacenamientoOBJ.splice(i, 1);
                }
            }
            localStorage.setItem("listaCompraLocal", JSON.stringify(almacenamientoOBJ));
        }

    }
    //Boton de Cerrar     //Boton de Cerrar 


    product.appendChild(cerrar);
    form = crearMultiselector(Nombre);


    //Checkbox a un lado del texto (cambia de color)      
    let checkboxColor = document.createElement("input");
    checkboxColor.setAttribute("type", "checkbox");
    checkboxColor.classList.add("CheckboxTexto");//Checkbox que se encuentra a un lateral del parrafo (Con la funcion de cambiar de color al clickar sobre el atraves de un evento de escucha)
    checkboxColor.addEventListener('click', marcado);
    product.prepend(checkboxColor);
    //Checkbox a un lado del texto (cambia de color)


    product.appendChild(form);
}

function crearDivFavorito(Nombre) {
    const productContainer = document.getElementById('productsContainer');
    const product = document.createElement('div');
    product.id = Nombre + "-Container";
    product.classList.add('product2', 'roundBorder');//DIV que se utilizara para los elementos favoritos
    var text = document.createElement("p");
    text.innerText = Nombre;
    product.appendChild(text);
    productContainer.appendChild(product);

    let cerrar = document.createElement("span");
    cerrar.innerText = "x";
    cerrar.classList.add('close');
    cerrar.onclick = function borrar(ev) {
        let productName = ev.target.previousSibling.innerText.toLowerCase()
        if (window.confirm("Se va a eliminar")) {
            ev.target.parentNode.remove();
            for (let i = 0; i < almacenamientoOBJ.length; i++) {
                if (almacenamientoOBJ[i].Nombre == productName) {
                    almacenamientoOBJ.splice(i, 1);
                }
            }
            localStorage.setItem("listaCompraLocal", JSON.stringify(almacenamientoOBJ));
        }

    }
}

//Abajo se encuentra la funcion del multi selector   
function crearMultiselector(Nombre) {
    var form = document.createElement("form");//Creacion del Form donde se Apendea el Multiselect
    form.classList.add("Form-Center");

    let multiselect = document.createElement("div");
    multiselect.classList.add("multiselect");

    let checkboxes = crearCheckboxes(supermercados, Nombre);//Se llama a la funcion que crea los checkboxes dentro de un DIV
    let selectbox = document.createElement("div");
    selectbox.classList.add("selectBox");
    selectbox.addEventListener("click", () => {
        if (!expanded) {
            checkboxes.style.display = "flex";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;

        }
    })


    var eligeOpcion = ["Elige una Tienda"];
    let select = document.createElement("select");//Se crea el select falso (El cual se le desactiva el desplegable con un disable)
    select.setAttribute("disabled", true);
    addSelectOptions(eligeOpcion, select);//Funcion que le da al select un Array en este caso (Elige una tienda)

    let sobreSeleccionado = document.createElement("div");
    sobreSeleccionado.classList.add("overselect");


    form.appendChild(multiselect);
    multiselect.appendChild(selectbox);
    multiselect.appendChild(sobreSeleccionado);
    multiselect.appendChild(checkboxes);
    selectbox.appendChild(select);
    return form
}//Fin del Multiselect
function addSelectOptions(supermercados, select) {
    for (var i = 0; i < supermercados.length; i++) {
        var option = document.createElement("option");
        option.value = supermercados[i];
        option.text = supermercados[i];
        select.add(option);
    }
}

//Checkboxes
function crearCheckboxes(Supermercados, Nombre) {//Funcion que crea los checkboxes 
    const checkboxes = document.createElement('div');
    checkboxes.id = "CheckboxCaja";
    checkboxes.classList.add("checkboxes");

    var cajaResultados = document.createElement('div');//Caja dentro de Checkboxes que contiene (Tanto los inputs como los labels con los valores de los Supermercados)
    cajaResultados.id = Nombre;
    cajaResultados.classList.add("Float");
    checkboxes.appendChild(cajaResultados);

    for (let i = 0; i < Supermercados.length; i++) {//Bucle que hace tantos checkboxes y labels como Supermercados existentes hayan dentro del LocalStorage
        var input = document.createElement("input");
        input.classList.add("Float");
        input.setAttribute("id", Supermercados[i]);
        input.setAttribute("type", "checkbox");
        input.value = Supermercados[i];
        var label = document.createElement("label");
        label.innerText = Supermercados[i];
        label.setAttribute("for", Supermercados[i]);
        label.appendChild(input);
        cajaResultados.appendChild(label);
    }
    cajaResultados.addEventListener('click', divTarget);//Funcion encargada que apartir de un evento de escucha identificar el ID del DIV y apartir de ahi ejecutar una funcion
    return checkboxes
};


var expanded = false;


//Dentro de este recuadro se encuentra Lista Ordenada/Cambio de color y Orden
function marcado(event) {
    event.target.parentNode.classList.toggle('done');
    event.target.parentNode.classList.remove("product2")
    const productContainer = document.getElementById('productsContainer');
    let marcadoDiv = event.target.nextSibling.innerText.toLowerCase();
    order(productContainer).forEach(el => productContainer.appendChild(el));

    for (let i = 0; i < almacenamientoOBJ.length; i++) {
        if (almacenamientoOBJ[i].Nombre == marcadoDiv && event.target.checked) {
            almacenamientoOBJ[i].Seleccionado = true;
        } else if (almacenamientoOBJ[i].Nombre == marcadoDiv && !event.target.checked) {
            almacenamientoOBJ[i].Seleccionado = false;
        }
        localStorage.setItem("listaCompraLocal", JSON.stringify(almacenamientoOBJ));
    }

    // const order = () => {
    //     const done = [];
    //     const toDo = [];
    //     productContainer.childNodes.forEach(el => {
    //         el.classList.contains('done') ? done.push(el) : toDo.push(el)
    //     })
    //     return [...toDo, ...done];
    // }
}

function order(div) {
    var done = [];
    var toDo = [];
    div.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

//Dentro de este recuadro se encuentra Lista Ordenada/Cambio de color y Orden




//Se agrega al selector informacion
function filtro() {

    var SelectFiltro = document.getElementById('NombreSelect');

    for (let i = 0; i < supermercados.length; i++) {
        var opciones = document.createElement("option");//Selector del Filtro que se encuentra en la esquina superior derecha con la funcion de filtrar la lista con las opciones obtenidas
        opciones.innerText = supermercados[i];
        SelectFiltro.appendChild(opciones);
        SelectFiltro.onchange = function () {
            var ValorSelect = SelectFiltro.value;
            document.getElementById("productsContainer").innerHTML = "";
            var productos = almacenamientoOBJ.filter(item => item.Mercado.includes(ValorSelect));
            pintarAlmacenados(productos)
            if (ValorSelect == "todos") {
                pintarAlmacenados(almacenamientoOBJ);
            }
        }
    }
}



function producto(Nombre) {//Creador de Objetos y Array para la lista de prodyctos
    var NuevoObjeto = {
        'Nombre': Nombre,
        'Mercado': [],
        'Seleccionado': null
    }
    almacenamientoOBJ.push(NuevoObjeto);
}


function divTarget(event) {
    var Evento = event.target;
    var producto = event.target.parentNode.parentNode.id;
    var SupermercadosTarget = Evento.id;
    if (Evento.checked) {
        for (let i = 0; i < almacenamientoOBJ.length; i++) {
            if (almacenamientoOBJ[i].Nombre == producto) {
                almacenamientoOBJ[i].Mercado.push(SupermercadosTarget);
            }
        }
    } else {
        for (let i = 0; i < almacenamientoOBJ.length; i++) {
            if (almacenamientoOBJ[i].Nombre == producto) {
                almacenamientoOBJ[i].Mercado.splice(almacenamientoOBJ[i].Mercado.indexOf(SupermercadosTarget));
            }
        }
    }

    localStorage.setItem('listaCompraLocal', JSON.stringify(almacenamientoOBJ));

}
function getAlmacenamientoObjeto() {
    var listaCompraAlmacenada = localStorage.getItem("listaCompraLocal");
    if (listaCompraAlmacenada == null) {
        almacenamientoOBJ = [];
    } else {
        almacenamientoOBJ = JSON.parse(listaCompraAlmacenada);
    }
    return almacenamientoOBJ
}

function resetInput() {
    document.getElementById("productText").value = "";
}

pintarAlmacenados(almacenamientoOBJ)
var divContainer = document.getElementById('productsContainer')
order(divContainer).forEach(el => divContainer.appendChild(el))

function pintarAlmacenados(ArrayObjetos) {
    for (let i = 0; i < ArrayObjetos.length; i++) {
        //El checkboxcontainer tiene el id del producto
        //Cojo ese div
        crearDivProducto(ArrayObjetos[i].Nombre);
        // Selecciono los checkbox con un queryselector
        let checkbox = document.getElementById(ArrayObjetos[i].Nombre);
        // Quiero que me marque checked si el supermercado está en la lista
        let checkboxes = checkbox.querySelectorAll("input[type ='checkbox']");
        for (let j = 0; j < checkboxes.length; j++) {
            if (ArrayObjetos[i].Mercado.includes(checkboxes[j].value)) {
                checkboxes[j].checked = true;
            }
        }
        //Añado la clase done si el producto se ha comprado
        if (ArrayObjetos[i].Seleccionado) {
            let div = document.getElementById(ArrayObjetos[i].Nombre + "-Container");
            div.firstChild.checked = true
            div.classList.add("done");
        }
        if (ArrayObjetos[i].Favorito) {
            let div = document.getElementById(ArrayObjetos[i].Nombre + "-Container");
            var corazon = document.createElement("p")
            corazon.innerText = "❤"
            corazon.className = "favoriteIcon"
            div.appendChild(corazon)
        }
    }
}

// Para mostar un mensaje la primera vez que se visita la página 
function firstVisit() {
    if (!localStorage.getItem("visited")) {
        document.getElementById("firstVisit").style.display = "block";
        localStorage.setItem("visited", "1");
    }
}

//Para el modal
function prueba() {
    document.getElementById("modal1").style.display = "block";// para mostrarlo
}

modal = document.getElementById('modal1')
modal.onclick = function () {
    modal.style.display = "none";//para que esté escondido
}