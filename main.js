function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    FirstTime();
});

var button = 0
var slideBoolean = false
var firsttime = true
var firsttime2 = true
var cantSemanas = 0
var cantSemanasText = 1
var cantEjercicio = 0

var EjercicioyDia = [
    [
        ["Lunes"],
        ["Martes"],
        ["Miercoles"],
        ["Jueves"],
        ["Viernes"]
    ]
]
var SeriesyDia = [
    [
        ["Lunes"],
        ["Martes"],
        ["Miercoles"],
        ["Jueves"],
        ["Viernes"]
    ]
]

var RepsyDia = [
    [ 
        ["Lunes"],
        ["Martes"],
        ["Miercoles"],
        ["Jueves"],
        ["Viernes"]
    ]
]

var CantEjerciciosDiaSemana = [
    [  /*Semana*/
    [0 /*Lunes*/],
    [0 /*Martes*/],
    [0 /*Miercoles*/],
    [0 /*Jueves*/],
    [0 /*Viernes*/]
    ]
]

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
    var ID = ButtonID.slice(6,8)

    if(ID == ""){
        ID = 0
    }

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
    cantSemanas = cantSemanas + 2
    var NuevaSeccionSemana = document.createElement('section')
    
    var BotonSemana = document.getElementById('semana')
    var PanelSemana = document.getElementById('pnlSemana')
    var NuevoBotonSemana = BotonSemana.cloneNode(true)
    var NuevoPanelSemana = PanelSemana.cloneNode(true)
    var InputEjercicio = NuevoPanelSemana.querySelector('#Ejercicio')
    var InputSeries = NuevoPanelSemana.querySelector('#Series')
    var InputReps = NuevoPanelSemana.querySelector('#Reps')

    NuevoBotonSemana.textContent = "Semana " + cantSemanas
    cantSemanas = cantSemanas - 1
    InputEjercicio.id = "Ejercicio" + cantSemanas
    InputSeries.id = "Series" + cantSemanas
    InputReps.id = "Reps" + cantSemanas
    NuevoBotonSemana.id = "semana" + cantSemanas
    NuevoPanelSemana.id = "pnlSemana" + cantSemanas
    NuevaSeccionSemana.id = "sectionSemana" + cantSemanas
    NuevoPanelSemana.classList.remove('cambiado')
    NuevaSeccionSemana.appendChild(NuevoBotonSemana)
    NuevaSeccionSemana.appendChild(NuevoPanelSemana)
    NuevaSeccionSemana.classList.add('SectionLabel')

    document.getElementById("DivSemanas").appendChild(NuevaSeccionSemana)
    localStorage.setItem("CantSemanas", cantSemanas)

    CantEjerciciosDiaSemana.push([[  /*Semana*/ [0 /*Lunes*/], [0 /*Martes*/], [0 /*Miercoles*/], [0 /*Jueves*/], [0 /*Viernes*/]]])
    EjercicioyDia.push([["Lunes"], ["Martes"], ["Miercoles"], ["Jueves"], ["Viernes"]])
    SeriesyDia.push([["Lunes"], ["Martes"], ["Miercoles"], ["Jueves"], ["Viernes"]])
    RepsyDia.push([["Lunes"], ["Martes"], ["Miercoles"], ["Jueves"], ["Viernes"]])
}

function deleteSemanas(){
    if (cantSemanas >= 1){
        var section = document.getElementById("sectionSemana" + cantSemanas)
        section.remove()
        cantSemanas = cantSemanas - 1
        EjercicioyDia.pop();
        SeriesyDia.pop();
        RepsyDia.pop();
        CantEjerciciosDiaSemana.pop();
        localStorage.setItem("CantSemanas", cantSemanas)
    }
}

function addEjercicio(AddButton){
    var section = AddButton.closest('.PanelLabel')
    var SectionID = section.id
    var IDSEMANA = SectionID.slice(9,11)
    if(IDSEMANA == ""){
        IDSEMANA = 0
    }

    //CantEjerciciosDiaSemana[IDSEMANA][Dia][0] = 1
    var cantEjercicios = parseInt(CantEjerciciosDiaSemana[IDSEMANA][Dia][0])
    cantEjercicios = cantEjercicios + 1
    //alert("Semana" + IDSEMANA + "Dia" + Dia + cantEjercicios)
    CantEjerciciosDiaSemana[IDSEMANA][Dia][0] = cantEjercicios 

    localStorage.setItem("Semana" + IDSEMANA + "Dia" + Dia, cantEjercicios)
    //alert(localStorage.getItem("Semana" + IDSEMANA + "Dia" + Dia))

    var tabla = section.querySelector('table')
    var tbody2 = tabla.querySelector('tbody')
    var tbody = document.getElementById('tbody')
    var tr = tbody2.getElementsByTagName('tr')[0]
    var NuevoDataInputs = tr.cloneNode(true)
    tbody2.appendChild(NuevoDataInputs)

}

function deleteEjercicio(AddButton){
    var section = AddButton.closest('.PanelLabel')
    var SectionID = section.id
    var IDSEMANA = SectionID.slice(9,11)
    if(IDSEMANA == ""){
        IDSEMANA = 0
    }

    var cantEjercicios = parseInt(CantEjerciciosDiaSemana[IDSEMANA][Dia][0])

    if(cantEjercicios > 0){
        var section = AddButton.closest('.PanelLabel')
        var tabla = section.querySelector('table')
        var tbody2 = tabla.querySelector('tbody')
        var tr = tbody2.getElementsByTagName('tr')[cantEjercicios]
        tr.remove()
        cantEjercicios = cantEjercicios - 1
        CantEjerciciosDiaSemana[IDSEMANA][Dia][0] = cantEjercicios 
        localStorage.setItem("Semana" + IDSEMANA + "Dia" + Dia, cantEjercicios)
    }
}

var Dia1 = false;
var Dia2 = false
var Dia3 = false
var Dia4 = false
var Dia5 = false;
var Dia = 0;

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
        Dia5 = false
        Dia = 0

        var Section = Button.closest('.PanelLabel')
        var SectionID = Section.id
        var ID = SectionID.slice(9,11)
        if(ID == ""){
            ID = 0
        }

        InputEjercicio = document.querySelector('#Ejercicio' + ID)
        InputSeries = document.querySelector('#Series' + ID)
        InputReps = document.querySelector('#Reps' + ID)

        if(EjercicioyDia[ID][Dia][1] == undefined){
            EjercicioyDia[ID][Dia][1] = ""
        } 

        if(SeriesyDia[ID][Dia][1] == undefined){
            SeriesyDia[ID][Dia][1] = ""
        }

        if(RepsyDia[ID][Dia][1] == undefined){
            RepsyDia[ID][Dia][1] = ""
        }

        InputEjercicio.value = EjercicioyDia[ID][Dia][1]
        InputSeries.value = SeriesyDia[ID][Dia][1]
        InputReps.value = RepsyDia[ID][Dia][1]
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
        Dia = 1

        var Section = Button.closest('.PanelLabel')
        var SectionID = Section.id
        var ID = SectionID.slice(9,11)
        if(ID == ""){
            ID = 0
        }

        InputEjercicio = document.querySelector('#Ejercicio' + ID)
        InputSeries = document.querySelector('#Series' + ID)
        InputReps = document.querySelector('#Reps' + ID)

        if(EjercicioyDia[ID][Dia][1] == undefined){
            EjercicioyDia[ID][Dia][1] = ""
        } 

        if(SeriesyDia[ID][Dia][1] == undefined){
            SeriesyDia[ID][Dia][1] = ""
        }

        if(RepsyDia[ID][Dia][1] == undefined){
            RepsyDia[ID][Dia][1] = ""
        }

        InputEjercicio.value = EjercicioyDia[ID][Dia][1]
        InputSeries.value = SeriesyDia[ID][Dia][1]
        InputReps.value = RepsyDia[ID][Dia][1]
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
        Dia = 2

        var Section = Button.closest('.PanelLabel')
        var SectionID = Section.id
        var ID = SectionID.slice(9,11)
        if(ID == ""){
            ID = 0
        }


        InputEjercicio = document.querySelector('#Ejercicio' + ID)
        InputSeries = document.querySelector('#Series' + ID)
        InputReps = document.querySelector('#Reps' + ID)

        if(EjercicioyDia[ID][Dia][1] == undefined){
            EjercicioyDia[ID][Dia][1] = ""
        } 

        if(SeriesyDia[ID][Dia][1] == undefined){
            SeriesyDia[ID][Dia][1] = ""
        }

        if(RepsyDia[ID][Dia][1] == undefined){
            RepsyDia[ID][Dia][1] = ""
        }

        InputEjercicio.value = EjercicioyDia[ID][Dia][1]
        InputSeries.value = SeriesyDia[ID][Dia][1]
        InputReps.value = RepsyDia[ID][Dia][1]
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
        Dia = 3

        var Section = Button.closest('.PanelLabel')
        var SectionID = Section.id
        var ID = SectionID.slice(9,11)
        if(ID == ""){
            ID = 0
        }

        InputEjercicio = document.querySelector('#Ejercicio' + ID)
        InputSeries = document.querySelector('#Series' + ID)
        InputReps = document.querySelector('#Reps' + ID)

        if(EjercicioyDia[ID][Dia][1] == undefined){
            EjercicioyDia[ID][Dia][1] = ""
        } 

        if(SeriesyDia[ID][Dia][1] == undefined){
            SeriesyDia[ID][Dia][1] = ""
        }

        if(RepsyDia[ID][Dia][1] == undefined){
            RepsyDia[ID][Dia][1] = ""
        }

        InputEjercicio.value = EjercicioyDia[ID][Dia][1]
        InputSeries.value = SeriesyDia[ID][Dia][1]
        InputReps.value = RepsyDia[ID][Dia][1]
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
        Dia = 4

        var Section = Button.closest('.PanelLabel')
        var SectionID = Section.id
        var ID = SectionID.slice(9,11)
        if(ID == ""){
            ID = 0
        }

        InputEjercicio = document.querySelector('#Ejercicio' + ID)
        InputSeries = document.querySelector('#Series' + ID)
        InputReps = document.querySelector('#Reps' + ID)

        if(EjercicioyDia[ID][Dia][1] == undefined){
            EjercicioyDia[ID][Dia][1] = ""
        } 

        if(SeriesyDia[ID][Dia][1] == undefined){
            SeriesyDia[ID][Dia][1] = ""
        }

        if(RepsyDia[ID][Dia][1] == undefined){
            RepsyDia[ID][Dia][1] = ""
        }

        InputEjercicio.value = EjercicioyDia[ID][Dia][1]
        InputSeries.value = SeriesyDia[ID][Dia][1]
        InputReps.value = RepsyDia[ID][Dia][1]
    }
}

function TextChanged(TextInput, event){
    //var Section = TextInput.closest('.PanelLabel')
    //var SectionID = Section.id
    //var ID = SectionID.slice(9,11)
    //(ID == ""){
    //    ID = 0
    //}
    var InputID = TextInput.id
    localStorage.setItem(InputID + Dia, event.target.value)
    //alert(InputID + Dia + " " + localStorage.getItem(InputID + Dia))
}

function FirstTime(){
    cantSemana = localStorage.getItem("CantSemanas")
    LoadData();
    
}

function LoadData(){
    for (let i = 0; i <= cantSemana; i++){
        if(firsttime == true && i == 0){
            for (let s = 1; s <= cantSemana; s++){
                addSemanas()   
            }

            firsttime = false
        }

        if(firsttime2 == true){
            for(let s = 0; s <= cantSemana; s++){

                if(localStorage.getItem("Semana" + s + "Dia0") == undefined){
                    localStorage.setItem("Semana" + s + "Dia0", "0")
                }
    
                CantEjerciciosDiaSemana[s][0][0] = localStorage.getItem("Semana" + s + "Dia0")

                if(CantEjerciciosDiaSemana[s][0][0] == undefined){
                    CantEjerciciosDiaSemana[s][0][0] = 0
                }
                
                //alert("s: " + s + " " + "cant e: " + CantEjerciciosDiaSemana[s][0][0])
                var cantE = parseInt(CantEjerciciosDiaSemana[s][0][0])

                for(let e = 1; e <= cantE; e++){
                    let is = s
                    var section = document.querySelector('#pnlSemana' + is)
                    var tabla = section.querySelector('table')
                    var tbody2 = tabla.querySelector('tbody')
                    var tbody = document.getElementById('tbody')
                    var tr = tbody2.getElementsByTagName('tr')[0]
                    var NuevoDataInputs = tr.cloneNode(true)
                    tbody2.appendChild(NuevoDataInputs)
                }
            }
            firsttime2 = false
        }

        for(let j = 0; j < 4; j++){
            if(localStorage.getItem("Ejercicio" + i + j) == undefined){
                localStorage.setItem("Ejercicio" + i + j, "")
            }

            if(localStorage.getItem("Series" + i + j) == undefined){
                localStorage.setItem("Series" + i + j, "")
            }

            if(localStorage.getItem("Reps" + i + j) == undefined){
                localStorage.setItem("Reps" + i + j, "")
            }

            EjercicioyDia[i][j][1] = localStorage.getItem("Ejercicio" + i + j)
            SeriesyDia[i][j][1] = localStorage.getItem("Series" + i + j)
            RepsyDia[i][j][1] = localStorage.getItem("Reps" + i + j)
        }

        InputEjercicio = document.querySelector('#Ejercicio' + i)
        InputSeries = document.querySelector('#Series' + i)
        InputReps = document.querySelector('#Reps' + i)
        InputEjercicio.value = EjercicioyDia[i][0][1]
        InputSeries.value = SeriesyDia[i][0][1]
        InputReps.value = RepsyDia[i][0][1]
    }
}