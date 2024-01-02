
var listarutinas = true
var cuaderno = false

function buttonCuaderno(){
    listarutinas = false
    cuaderno = true
    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    PageBook.classList.add('on')
    PageRutinas.classList.add('off')
 }
 
 function buttonListaRutinas(){
    if(listarutinas == true){
        location.href="#"
    }
    listarutinas = true
    cuaderno = false
    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    PageRutinas.classList.remove('off')
    PageBook.classList.remove('on')
 }