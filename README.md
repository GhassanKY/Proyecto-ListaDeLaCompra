# Lista de la compra

Colaboradores: AdrianMoratilla, FerNandaRM05, GhassanKY

Proyecto de 14 dias, en el cual se nos planteó el siguiente objetivo: 

DESCRIPCIÓN
Si eres una persona que se encarga de hacer la compra para tu hogar, es probable que en muchas ocasiones te hayas visto en la situación de tener que hacer la lista de la compra, pero sabiendo que ciertos productos solo están disponibles en algunos establecimientos, o están mejor de precio en unos que en otros.
Esto puede complicarnos la tarea ya que según a dónde vayamos a ir a comprar, tenemos que acordarnos de buscar unas cosas sí y otras no, o a la inversa: según lo que nos falte, tenemos que programar la visita a un establecimiento concreto.
La intención con esta aplicación es facilitarnos este proceso, permitiéndonos hacer una lista de la compra más organizada.

REQUISITOS
La aplicación se debe implementar usando HTML, CSS y JavaScript con almacenamiento local.

Debe constar de 3 pantallas, que permitan navegar entre sí, y debe diseñarse de forma responsive para que se vea adecuadamente en dispositivos móviles.

Por defecto, la pantalla que se abrirá al iniciar será la principal (lista de la compra).

Las pantallas que debe tener son:

- Configuración de supermercados: Consta de un menú que permite escribir el nombre de un supermercado o establecimiento, para añadirlo a una lista. Los supermercados añadidos se pueden borrar, sabiendo que si se hace esto y ya había datos asociados al supermercado borrado, la aplicación no debe romperse. No obstante, antes de borrar un supermercado debe solicitar una confirmación, para evitar borrados accidentales.

- Configuración de productos frecuentes: Aquí se podrá registrar una lista de productos que se compran habitualmente y de forma recurrente. Por cada producto añadido a la lista, se le deben anexar tantas columnas como supermercados registrados haya. En estas columnas se mostrará una casilla para vincular el producto al supermercado, y junto a éste, un input numérico para indicar el precio para dicho supermercado (lo ideal sería que este input solo se mostrase si marcas la casilla correspondiente). Estos registros también deben tener opción a ser eliminados, pidiendo confirmación. Pero aunque los borres, si en la lista de la compra estaba añadido el producto, no se eliminará de ella.

- Lista de la compra (pantalla principal): En esta vista, podemos añadir los productos que tenemos pendientes de comprar. Se puede hacer de dos formas:
1. Mediante un cuadro de texto, escribiendo el nombre, y que junto a éste aparezcan tantas casillas como supermercados registrados tengamos para que, opcionalmente, puedas marcar en cuál de ellos está disponible.
2. Mediante un selector de productos frecuentes, que obtiene los datos de los productos registrados en la pantalla anteriormente citada. Lo ideal (pero no obligatorio) sería que este selector mostrase sus datos ordenados de forma alfabética.

Lo ideal sería que estas opciones apareciesen solamente si se pulsa un botón de "Añadir nuevo", para no estar viendo siempre el formulario, aunque esto no es obligatorio.

En esta misma pantalla, aparecerá la lista de productos pendientes de comprar, y debe ir acompañada de un filtro que permita marcar a qué supermercado vas a ir, para mostrar únicamente los artículos que estén asociados a éste. También es posible que haya artículos que se registraron sin supermercado, por lo que no estaría de más permitir al usuario que marque y desmarque los supermercados en la lista de la compra, por si cambia de parecer, o para no perderlos al realizar el filtro.
Todos los artículos listados deben poder borrarse fácilmente, para ir quitándolos de la lista mientras estás haciendo la compra.



Otras consideraciones: Intenta que la aplicación sea lo más intuitiva para el usuario, mostrando la información de forma adecuada, y con los mensajes pertinentes. Por ejemplo, si es la primera vez que entra y no ha establecido supermercados, se le puede indicar que vaya en primer lugar a configurar esta información.



MÉTODO DE TRABAJO
El trabajo se realizará por equipos, por lo que es muy importante que haya buena comunicación en el grupo y las tareas se repartan de la forma apropiada.
Para este primer proyecto, podéis usar algún método de almacenamiento en la nube para compartir el trabajo, pero sabiendo que en adelante usaremos herramientas más apropiadas para ello.
Dado que esto es un trabajo, que podría ser un caso real, es necesario justificar las acciones realizadas llevando un seguimiento de tareas.
Para acostumbrarnos a ello, todos los días debéis hacer al menos una reunión breve en la que compartáis con los demás vuestro seguimiento respondiendo a las siguientes preguntas:
¿Qué he hecho desde la última reunión?
¿Qué voy a hacer a continuación?
¿Qué problemas tengo que me impidan completar mis tareas?

Y todo ello debe quedar anotado, para luego poder revisar vuestra implicación en el proyecto.
