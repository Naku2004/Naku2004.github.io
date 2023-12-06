function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

var button = 0
var butonlist = document.getElementById('list');
var butonrutinas = document.getElementById('rutinas');

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

butonlist.addEventListener('click', lista)
butonrutinas.addEventListener('click', buttonRutinas)

