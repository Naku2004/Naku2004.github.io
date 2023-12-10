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
    var ButtonID = button.id
    var ID = ButtonID.slice(6,7)

    var section = button.closest('section')
    var panel = section.querySelector('#pnlSemana' + ID)
    //alert(ID)
    
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
    NuevoBotonSemana.id = "semana" + cantSemanas
    NuevoPanelSemana.id = "pnlSemana" + cantSemanas
    NuevaSeccionSemana.id = "sectionSemana" + cantSemanas
    NuevoPanelSemana.classList.remove('cambiado')
    NuevaSeccionSemana.appendChild(NuevoBotonSemana)
    NuevaSeccionSemana.appendChild(NuevoPanelSemana)

    document.getElementById("listasrutinas").appendChild(NuevaSeccionSemana)
}

function deleteSemanas(){
    if (cantSemanas > 1){
        var section = document.getElementById("sectionSemana" + cantSemanas)
        section.remove()
        cantSemanas = cantSemanas - 1
    }
}

var Dia1 = false;
var Dia2 = false
var Dia3 = false
var Dia4 = false
var Dia5 = false;

function Lunes(Button){
    if(Dia1 == false){
        var div = Button.closest('div')
        var ButtonLunes = div.querySelector('#Dia1')
        var ButtonMartes = div.querySelector('#Dia2')
        var ButtonMiercoles = div.querySelector('#Dia3')
        var ButtonJueves = div.querySelector('#Dia4')
        var ButtonViernes = div.querySelector('#Dia5')
        
        ButtonLunes.classList.add('cambiado');
        ButtonMartes.classList.remove('cambiado');
        ButtonMiercoles.classList.remove('cambiado');
        ButtonJueves.classList.remove('cambiado');
        ButtonViernes.classList.remove('cambiado');

        Dia1 = true
        Dia2 = false
        Dia3 = false
        Dia4 = false
        Dia5 = false;
    }
}

function Martes(Button){
    if(Dia2 == false){
        var div = Button.closest('div')
        var ButtonLunes = div.querySelector('#Dia1')
        var ButtonMartes = div.querySelector('#Dia2')
        var ButtonMiercoles = div.querySelector('#Dia3')
        var ButtonJueves = div.querySelector('#Dia4')
        var ButtonViernes = div.querySelector('#Dia5')
        
        ButtonLunes.classList.remove('cambiado');
        ButtonMartes.classList.add('cambiado');
        ButtonMiercoles.classList.remove('cambiado');
        ButtonJueves.classList.remove('cambiado');
        ButtonViernes.classList.remove('cambiado');

        Dia1 = false
        Dia2 = true
        Dia3 = false
        Dia4 = false
        Dia5 = false;
    }
}

function Miercoles(Button){
    if(Dia3 == false){
        var div = Button.closest('div')
        var ButtonLunes = div.querySelector('#Dia1')
        var ButtonMartes = div.querySelector('#Dia2')
        var ButtonMiercoles = div.querySelector('#Dia3')
        var ButtonJueves = div.querySelector('#Dia4')
        var ButtonViernes = div.querySelector('#Dia5')
        
        ButtonLunes.classList.remove('cambiado');
        ButtonMartes.classList.remove('cambiado');
        ButtonMiercoles.classList.add('cambiado');
        ButtonJueves.classList.remove('cambiado');
        ButtonViernes.classList.remove('cambiado');

        Dia1 = false
        Dia2 = false
        Dia3 = true
        Dia4 = false
        Dia5 = false;
    }
}

function Jueves(Button){
    if(Dia4 == false){
        var div = Button.closest('div')
        var ButtonLunes = div.querySelector('#Dia1')
        var ButtonMartes = div.querySelector('#Dia2')
        var ButtonMiercoles = div.querySelector('#Dia3')
        var ButtonJueves = div.querySelector('#Dia4')
        var ButtonViernes = div.querySelector('#Dia5')
        
        ButtonLunes.classList.remove('cambiado');
        ButtonMartes.classList.remove('cambiado');
        ButtonMiercoles.classList.remove('cambiado');
        ButtonJueves.classList.add('cambiado');
        ButtonViernes.classList.remove('cambiado');

        Dia1 = false
        Dia2 = false
        Dia3 = false
        Dia4 = true
        Dia5 = false;
    }
}

function Viernes(Button){
    if(Dia5 == false){
        var div = Button.closest('div')
        var ButtonLunes = div.querySelector('#Dia1')
        var ButtonMartes = div.querySelector('#Dia2')
        var ButtonMiercoles = div.querySelector('#Dia3')
        var ButtonJueves = div.querySelector('#Dia4')
        var ButtonViernes = div.querySelector('#Dia5')
        
        ButtonLunes.classList.remove('cambiado');
        ButtonMartes.classList.remove('cambiado');
        ButtonMiercoles.classList.remove('cambiado');
        ButtonJueves.classList.remove('cambiado');
        ButtonViernes.classList.add('cambiado');

        Dia1 = false
        Dia2 = false
        Dia3 = false
        Dia4 = false
        Dia5 = true;
    }
}