function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}
 
var button = 0
var slideBoolean = false

function buttonSlide(){
    var buttonslide = document.getElementById('btnSlide');
    var slideJS = document.getElementById('slide');
    var sideJS = document.getElementById('side')

    if (slideBoolean == false){
        slideBoolean = true
        sideJS.classList.add('off')
        slideJS.classList.add('on')
    }
    else{
        slideBoolean = false
        sideJS.classList.remove('off')
        slideJS.classList.remove('on')
    }
}

function buttonLista(){
    if (button != 1){
        button = 1
        var butonlist = document.getElementById('list');
        butonlist.classList.add('cambiado')
        var butonrutinas = document.getElementById('rutinas');
        butonrutinas.classList.remove('cambiado')
    }
}

function buttonRutinas(){
    if (button != 2){
        button = 2
        var butonrutinas = document.getElementById('rutinas');
        butonrutinas.classList.add('cambiado')
        var butonlist = document.getElementById('list');
        butonlist.classList.remove('cambiado')
    }
}
