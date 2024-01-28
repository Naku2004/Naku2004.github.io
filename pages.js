
var listarutinas = true
var cuaderno = false

function buttonCuaderno(){
    listarutinas = false
    cuaderno = true
    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    PageBook.classList.add('on')
    PageRutinas.classList.add('off')
    document.querySelectorAll('#navli')[0].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[0].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('a').classList.add('on')
    document.querySelectorAll('#navli')[1].querySelector('span').classList.add('on')
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
    document.querySelectorAll('#navli')[1].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[0].querySelector('a').classList.add('on')
    document.querySelectorAll('#navli')[0].querySelector('span').classList.add('on')
 }