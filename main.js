function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

var cantSemanas = 1
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

var desplegado = false;

function buttonSemana(button){
    var section = button.closest('section')
    alert(section)
    var panel = section.querySelector('#PnlSemana')
    
    if (desplegado == false){
        desplegado = true
        panel.classList.add('cambiado')
    }
    else{
        desplegado = false;
        panel.classList.remove('cambiado')
    }
}

function addSemanas(){
    cantSemanas = cantSemanas + 1
    var NuevaSeccionSemana = document.createElement('section')
    
    var BotonSemana = document.getElementById('semana')
    var PanelSemana = document.getElementById('pnlSemana')
    var NuevoBotonSemana = BotonSemana.cloneNode(true)
    var NuevoPanelSemana = PanelSemana.cloneNode(true)

    NuevoBotonSemana.textContent = "Semana " + cantSemanas
    NuevaSeccionSemana.appendChild(NuevoBotonSemana)
    NuevaSeccionSemana.appendChild(NuevoPanelSemana)

    document.getElementById("listasrutinas").appendChild(NuevaSeccionSemana)

    // var SeccionSemana = document.getElementById('sectionSemana')
    // var nuevaSeccionSemana = SeccionSemana.cloneNode(true)
    // nuevaSeccionSemana
    // document.getElementById("listasrutinas").appendChild(nuevaSeccionSemana)

    // var nuevoBotonLabel = document.createElement('button')
    // cantSemanas = cantSemanas + 1 
    // nuevoBotonLabel.textContent = "Semana " + cantSemanas
    // nuevoBotonLabel.classList.add('ButtonLabel')
    // nuevoBotonLabel.setAttribute("contenteditable", "true")
    // document.getElementById("listasrutinas").appendChild(nuevoBotonLabel)
}