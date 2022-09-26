
let carrito = [];

let btn_compra = document.querySelectorAll(".botonCompra"); //selecciono el botoncompra del html.
console.log( btn_compra); //verifico que la identificacion funcione.

for( let boton of btn_compra){ //por cada boton de la funcion boton compra..

    boton.addEventListener("click" , agregar_a_carrito); //.. se le da la accion "click" y la funcion "agregar_a_carrito"
}

//EVENTOS
function agregar_a_carrito(e){ //e = objeto evento

    console.log("EL EVENTO ESTA EN:" , e.target); // TARGET identifica donde se ejecuta el evento.


   let hijo = e.target; //identfico al "INICIO" de mi boton.
    let padre = hijo.parentNode; //parentNode = identifica a su rama superior.
    let abuelo = padre.parentNode;
    let bisabuelo = abuelo.parentNode;
    let tara = bisabuelo.parentNode;
    let tatara = tara.parentNode;

   /* console.log(padre);
    console.log(abuelo);
    console.log(bisabuelo);
    console.log(tara);
    console.log(tatara);
*/


    let nombre_producto = tara.querySelector("h2").textContent; //asigno la rama donde esta el nombre del comic.

    let precio = padre.querySelector(".text-2").textContent; //asigno la rama donde esta el precio.
    let img = tatara.querySelector(".img22 img").src; //asigno la rama donde esta la imagen.
    //console.log("NOMBRE" , nombre_producto);
    //console.log("PRECIO" , precio);
    //console.log("CARATULA" , img);

    let producto = { //utilizo cada asignacion para crear un array.
        nombre:nombre_producto,
        img:img,
        precio: precio,
        cantidad:1
    };


    carrito.push(producto); //se pushean todos los productos dentro del array carrito.
    

    let arreglo_JSON = JSON.stringify(carrito);
    localStorage.setItem("carrito" , arreglo_JSON);

    console.log( carrito);
  
    mostrar_carrito( producto ); //creamos una funcion...
}



function mostrar_carrito( producto){ //...le damos propiedades.

    let fila = document.createElement("tr"); //se crea un "tr" (tabla).

     fila.innerHTML = `<td><img class="miniatura" src="${producto.img}"></td> 
                       <td>${producto.nombre}</td>
                       <td>${producto.cantidad}</td>
                       <td>${producto.precio}</td>
                       <td><a class="borrar_elemento" href="#"><img class="img_borrar" src="https://cdn4.iconfinder.com/data/icons/multimedia-line-circle/614/496_-_Garbage-512.png"></img></a></td>`;

                       //td = TABLE DATA
// CON ${ se llama al id especifico.

    let tabla = document.getElementById("tbody");
    tabla.append(fila);


    let botones_borrar = document.querySelectorAll(".borrar_elemento"); //funcion del boton borrar

    for( let boton of botones_borrar){ //por cada vez que se teclee el boton borrar...

        boton.addEventListener("click" , borrar_producto); //... se genera este evento.
    }

    Toastify({

        text: producto.nombre + " ha sido agregado al carrito",       
        duration: 1500,
        gravity:"bottom",
        position:"right",
        style:{
            fontSize:"15px",
            color:"white",
            background: "#292929"
        }
        
    }).showToast();
    

}




function borrar_producto(e){ //la funcion de borrar

    let tatara = e.target.parentNode.parentNode.parentNode; //se borrara del nuevo contenido, todo aquello que tenga raiz.
    tatara.remove(); //remove = borrar

}


//funcion para mostrar / ocultar carrito

let btn_carrito = document.getElementById("mostrar_carrito");

btn_carrito.addEventListener("click" , function(){

    let carrito = document.getElementById("carrito");

    if(carrito.style.display != "none"){
        carrito.style.display = "none";
    }
    else{
        carrito.style.display = "flex";   
     }



})


//CLIMA - FETCH

let contenedor = document.getElementById("clima");
let ciudad = "Buenos Aires";


fetch("https://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "&units=metric&appid=45b995d91044859550f4a4f5692e3855")
    .then(response => response.json())
    .then(data => {
        contenedor.innerHTML = ` <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"><img>
    <span> Ciudad: ${data.name}</span>
                                 <span> Temperatura: ${data.main.temp}°C </span>  `
    });