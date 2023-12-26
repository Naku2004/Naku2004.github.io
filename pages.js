
var listarutinas = true
var cuaderno = false

function buttonCuaderno(){
    listarutinas = false
    cuaderno = true
    let PageRutinas = document.querySelector('#pagerutinas') 
    PageRutinas.classList.add('off')
 }
 
 function buttonListaRutinas(){
    if(listarutinas == true){
        location.href="#"
    }
    listarutinas = true
    cuaderno = false
    let PageRutinas = document.querySelector('#pagerutinas') 
    PageRutinas.classList.remove('off')
 }