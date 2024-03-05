var listarutinas = true
var cuaderno = false
var calendario = false

function buttonListaRutinas(){
    if(listarutinas == true){
        location.href="#"
    }

    listarutinas = true
    calendario = false
    cuaderno = false

    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    let PageCalendar = document.querySelector('#pagecalendar')

    PageRutinas.classList.remove('off')
    PageBook.classList.add('off')
    PageCalendar.classList.remove('on')

    document.querySelectorAll('#navli')[1].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[2].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[2].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[0].querySelector('a').classList.add('on')
    document.querySelectorAll('#navli')[0].querySelector('span').classList.add('on')
 }

function buttonCuaderno(){
    if(cuaderno == true){
        location.href="#"
    }

    listarutinas = false
    calendario = false
    cuaderno = true

    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    let PageCalendar = document.querySelector('#pagecalendar')

    PageBook.classList.add('on')
    PageBook.classList.remove('off')
    PageRutinas.classList.add('off')
    PageCalendar.classList.remove('on')

    document.querySelectorAll('#navli')[0].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[0].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[2].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[2].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('a').classList.add('on')
    document.querySelectorAll('#navli')[1].querySelector('span').classList.add('on')
 }
 

 function buttonCalendar(){
    if(calendar == true){
        location.href="#"
    }
    listarutinas = false
    cuaderno = false
    calendario = true

    let PageRutinas = document.querySelector('#pagerutinas') 
    let PageBook = document.querySelector('#pagebook') 
    let PageCalendar = document.querySelector('#pagecalendar')

    PageBook.classList.add('off')
    PageRutinas.classList.add('off')
    PageCalendar.classList.add('on')

    document.querySelectorAll('#navli')[0].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[0].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('a').classList.remove('on')
    document.querySelectorAll('#navli')[1].querySelector('span').classList.remove('on')
    document.querySelectorAll('#navli')[2].querySelector('a').classList.add('on')
    document.querySelectorAll('#navli')[2].querySelector('span').classList.add('on')
 }