function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

var butonlist = document.getElementById('list');

function lista(){
    alert('Presionaste el botón');
}

butonlist.addEventListener('click', lista)