/*************************** Esta Pagina es de la lista de productos frecuentes ****************************/

  // Array para almacenar los productos frecuentes 
    var productList = [];

    //Función que llena el array anterior con productos de localStorage si los hubiera
    getProductList();
    drawTable(productList);
    //

    // Recupero los datos del localStorage
    function getProductList() {
        storedList = localStorage.getItem('localProductList')
        if (storedList == null) {
            productList = [];
        } else {
            productList = JSON.parse(storedList);
        }
        return productList
    }


    var supermercados = [];
    storedSupermarket = localStorage.getItem("listaSupermercados");
    supermercados = JSON.parse(storedSupermarket);
    // Función para pintar tantos checkbox como supermercados haya 
    addCheckbox(supermercados);

    // Crear opciones para añadir los detalles del producto (supermercado y precio)
    // como parámetro utiliza un array (lista de supermercados)
    function addCheckbox(supermercados) {
        //Cotenedor para guardar el conjunto de opciones
        var checkboxContainer = document.createElement("div");
        checkboxContainer.id = "checkboxContainer";
        var container = document.getElementById("inputProducts");

        // coloca el contenedor debajo del input y encima del botón de añadir
        container.insertBefore(checkboxContainer, container.children[3]);

        for (var i = 0; i < supermercados.length; i++) {
            // Contenedor para guardar cada checkbox, nombre de supermercado e input numérico
            var productDiv = document.createElement("div");
            productDiv.classList = "productDetails";

            // Crear tantos checkbox como supermercados hay en la lista
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "checkbox" + i;
            checkbox.value = supermercados[i];
            var label = document.createElement("label");
            label.htmlFor = "checkbox" + i;
            label.innerText = supermercados[i];

            // Crear input de precio asociado a cada supermercado
            var price = document.createElement("input");
            price.id = "price" + i;
            price.type = "number";
            price.placeholder = "Precio €";
            price.min = 0;
            price.step = ".01";
            price.style.display = "none";

            //Evento para mostrar el input numérico de precio
            checkbox.addEventListener("change", (ev) => {
                if (ev.currentTarget.checked) {
                    ev.currentTarget.nextSibling.nextSibling.style.display = "block";
                } else {
                    ev.currentTarget.nextSibling.nextSibling.style.display = "none";
                }
            })
            productDiv.appendChild(checkbox);
            productDiv.appendChild(label);
            productDiv.appendChild(price);
            checkboxContainer.appendChild(productDiv)
        }
    }


    // Función para obtener el valor de los inputs, almacenarlos en localstorage y añadirlos a la tabla 
    function saveProduct(e) {
        // Evita que actúe como formulario recargándose la página sin guardar
        event.preventDefault(e);

        // Obtengo el nombre del producto
        var product = document.getElementById("addProduct").value;

        // Selecciono todos los checkbox marcados y precios asociados almacenándolos en un array
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let supermarketPrice = [];
        for (let i = 0; i < checkboxes.length; i++) {
            let marketPriceValues = {};
            marketPriceValues["supermarket"] = checkboxes[i].value;

            // El precio será el input cercano al precio, si está vacío no guarda nada
            let priceInput = checkboxes[i].nextSibling.nextSibling.value;
            if (!priceInput || priceInput < 0) {
                priceInput == "";
            }
            marketPriceValues["price"] = priceInput;
            supermarketPrice.push(marketPriceValues);
        }

        // Asocio cada producto con un id único
        var id = Date.now();

        // Utilizo una función para almacenar todos estos valores en forma de objeto
        if (!product) {
            alert("Introduce un producto");
            return
        } else {
            storeProduct(product, supermarketPrice, id);
        }


        addRow(table, productList[(productList.length - 1)]) // Dibujo una nueva fila en la tabla utilizando únicamente la última entrada de mi lista de productos

        resetInput()
    }

    // Reseteo todos los valores de input de mi formulario
    function resetInput() {
        document.getElementById("modalInput").style.display = "none";
        document.getElementById("addProduct").value = "";
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (let check of checkboxes) {
            check.checked = false;
        }
        let inputs = document.querySelectorAll('input[type="number"]');
        for (let input of inputs) {
            input.value = "";
            input.style.display = "none";
        }
    }

    // Crea un objeto con tres keys, id, nombre de producto y detalles.  
    function storeProduct(product, supermarketprice, id) {
        var newProduct = {
            'id': id,
            'product': product,
            'details': supermarketprice //El key detalles es un array con dos valores, supermecado y precio
        }
        productList.push(newProduct); // Almaceno este objeto en mi lista de productos
        localStorage.setItem('localProductList', JSON.stringify(productList)); // Guardo la lista en el localStorage
    }

    // Función para pintar una tabla completa, se ejecuta al principio del script para pintar los valores del localStorage
    function drawTable(list) {
        // Creo una tabla y la coloco al principio de mi contenedor que sirve de lista 
        var table = document.createElement("table");
        table.id = "table";
        var tableContainer = document.getElementById("listaProductos");
        tableContainer.prepend(table);

        // Creo la cabecera oculta para que no se muestre desde el principio 
        var headers = ["Producto", "Supermercado", "Precio", "", ""];
        var headerRow = table.insertRow(-1);
        headerRow.id = "headerRow";
        headerRow.hidden = true;
        for (var i = 0; i < headers.length; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = headers[i];
            headerRow.appendChild(headerCell);
        }
        table.appendChild(headerRow);

        // Añado tantas filas como productos haya en la lista 
        for (let i = 0; i < list.length; i++) {
            addRow(table, list[i]);
        }

    }

    // Función para añadir una única fila a una tabla desde un array de productos
    function addRow(table, list) {
        var row = table.insertRow();
        row.id = list.id; // Coloco un id para poder localizar después la fila 
        var product = row.insertCell(0);
        product.innerHTML = list.product;
        var supermarket = row.insertCell(1);

        // añado los supermercados en distuntas líneas 
        for (let j = 0; j < list.details.length; j++) {
            var superText = document.createElement("p");
            superText.innerText = list.details[j].supermarket;
            supermarket.appendChild(superText);
        }

        // repito lo anterior para los precios, teniendo en cuenta que si está vacío o es negativo no lo pinto
        var priceRow = row.insertCell(2);
        for (let j = 0; j < list.details.length; j++) {
            priceText = document.createElement("p");
            if (!list.details[j].price || list.details[j].price < 0) {
                priceText.innerText = "";
                priceRow.appendChild(priceText);
            } else {
                priceText.innerText += list.details[j].price + " €";
                priceRow.appendChild(priceText);
            }
        }
        var sendIconRow = row.insertCell(3);
        sendIconRow.classList.add("icons");
        sendIconRow.innerHTML = '<svg class="svg-icon" id="sendIcon" viewBox="0 0 18 18" onclick="send(this)"><path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path></svg>' //HTML con svg que contiene clase para los iconos e id único
        // Creo un texto que sirva de explicación cuando hover sobre el icono
        sendText = document.createElement("p");
        sendText.innerHTML = "Mandar a la lista de la compra";
        sendText.id = "sendIconText";
        sendIconRow.appendChild(sendText);
        var deleteRow = row.insertCell(4);
        deleteRow.classList.add("icons");
        deleteRow.innerHTML = '<svg class="svg-icon" id="deleteIcon" onclick="borrar(this)" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path></svg>' // HTML con svg, clase e id además de función para borrar toda la fila tanto de la tabla como del localstorage
        deleteText = document.createElement("p");
        deleteText.innerHTML = "Eliminar producto";
        deleteText.id = "deleteIconText";
        deleteRow.appendChild(deleteText);
        document.getElementById("headerRow").hidden = false; // Quito el atributo escondido a la fila de headers para que aparezcan cuando haya filas
        document.getElementById("listaProductos").className = "llena";
        table.appendChild(row);
    }


    function abrirModal() {
        document.getElementById("modalInput").style.display = "block";
    }

    function cerrarModal() {
        document.getElementById("modalInput").style.display = "none";
    }

    function prueba() {
        document.getElementById("modal1").style.display = "block";
    }

    function cerrarPrueba() {
        document.getElementById("modal1").style.display = "none";
    }
    //Para cerrar el modal pulsando la tecla escape
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            document.getElementById("modalInput").style.display = "none";
        }
    });

    // localStorage.setItem("listaCompraLocal", JSON.stringify(listaCompra))
    function send(e) {
    if (window.confirm("¿Enviar a la lista de la compra?")) {
        let productid = e.parentElement.parentElement.id;

        var listaDecodificada = JSON.parse(localStorage.getItem("listaCompraLocal")) || []

        var nuevoProducto = {
            "Nombre" : "",
            "Mercado" : [],
            "Favorito" : true
        }

        for (let i = 0; i < productList.length; i++) {
            if (productList[i].id == productid) {
                nuevoProducto.Nombre = productList[i].product;
                for (let j = 0; j < productList[i].details.length; j++) {
                    nuevoProducto.Mercado.push(productList[i].details[j].supermarket);
                }
            }
        }
        listaDecodificada.push(nuevoProducto);
        localStorage.setItem('listaCompraLocal', JSON.stringify(listaDecodificada));
    }
}

    // Función asociada al icono de papelera de cada fila, contiene evento que borra de la gráfica el "tr" asociado, recoge su id, lo compara con la lista de productos, lo elimina y guarda de nuevo en el localStorage esa lista 
    function borrar(e) {
        if (window.confirm("¿Quieres eliminar este producto?")) {
            e.parentNode.parentNode.remove();
            deletedId = e.parentElement.parentElement.id;
            for (let i = 0; i < productList.length; i++) {
                if (productList[i].id == deletedId) {
                    productList.splice(i, 1);
                }
            }
            deletedId = "";
            localStorage.setItem('localProductList', JSON.stringify(productList));
        }
        if (productList.length == 0){
            document.getElementById("headerRow").hidden = true;
            document.getElementById("listaProductos").className = "vacia";
        }
    }
