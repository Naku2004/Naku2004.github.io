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
        [""],
        [""],
        [""],
        [""],
        [""]
    ]
]
var SeriesyDia = [
    [
        [""],
        [""],
        [""],
        [""],
        [""]
    ]
]

var RepsyDia = [
    [ 
        [""],
        [""],
        [""],
        [""],
        [""]
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
        Lunes()
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
    EjercicioyDia.push([[""], [""], [""], [""], [""]])
    SeriesyDia.push([[""], [""], [""], [""], [""]])
    RepsyDia.push([[""], [""], [""], [""], [""]])
}

function deleteSemanas(){
    if (cantSemanas >= 1){
        var section = document.getElementById("sectionSemana" + cantSemanas)
        section.remove()
        cantSemanas = cantSemanas - 1
        EjercicioyDia.pop();
        SeriesyDia.pop();
        RepsyDia.pop();
        
        for(let i = 0; i <= 4; i++){  
            let cantEjer = CantEjerciciosDiaSemana[(cantSemanas + 1)][i]
            for(let j = 0; j <= cantEjer; j++){
                localStorage.setItem("Ejercicio" + (cantSemanas + 1) + i + j, "")
                localStorage.setItem("Series" + (cantSemanas + 1) + i + j, "")
                localStorage.setItem("Reps" + (cantSemanas + 1) + i + j, "")
                localStorage.setItem("Semana" + (cantSemanas + 1) + "Dia" + i, "0")
            }
        }

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

    var cantEjercicios = parseInt(CantEjerciciosDiaSemana[IDSEMANA][Dia])
    cantEjercicios = cantEjercicios + 1

    CantEjerciciosDiaSemana[IDSEMANA][Dia] = cantEjercicios 

    localStorage.setItem("Semana" + IDSEMANA + "Dia" + Dia, cantEjercicios)
    //alert("Semana" + IDSEMANA + "Dia" + Dia + " " + cantEjercicios)
    var tabla = section.querySelector('table')
    var tbody2 = tabla.querySelector('tbody')
    var tbody = document.getElementById('tbody')
    var tr = tbody2.getElementsByTagName('tr')[0]
    var NuevoTr = tr.cloneNode(true)
    var inputEjercicio = NuevoTr.querySelector('#Ejercicio' + IDSEMANA)
    var inputSeries = NuevoTr.querySelector('#Series' + IDSEMANA)
    var inputReps = NuevoTr.querySelector('#Reps' + IDSEMANA)

    inputEjercicio.value = ""
    inputEjercicio.name = cantEjercicios
    inputSeries.value = ""
    inputSeries.name = cantEjercicios
    inputReps.value = ""
    inputReps.name = cantEjercicios

    tbody2.appendChild(NuevoTr)

}

function deleteEjercicio(AddButton){
    var section = AddButton.closest('.PanelLabel')
    var SectionID = section.id
    var IDSEMANA = SectionID.slice(9,11)
    if(IDSEMANA == ""){
        IDSEMANA = 0
    }

    var cantEjercicios = parseInt(CantEjerciciosDiaSemana[IDSEMANA][Dia])

    if(cantEjercicios > 0){
        var section = AddButton.closest('.PanelLabel')
        var tabla = section.querySelector('table')
        var tbody2 = tabla.querySelector('tbody')
        var tr = tbody2.getElementsByTagName('tr')[cantEjercicios]
        tr.remove()
        cantEjercicios = cantEjercicios - 1
        CantEjerciciosDiaSemana[IDSEMANA][Dia] = cantEjercicios 
        EjercicioyDia[IDSEMANA][Dia].pop()
        SeriesyDia[IDSEMANA][Dia].pop()
        RepsyDia[IDSEMANA][Dia].pop()
        localStorage.setItem("Ejercicio" + IDSEMANA + Dia + (cantEjercicios + 1), "")
        localStorage.setItem("Series" + IDSEMANA + Dia + (cantEjercicios + 1), "")
        localStorage.setItem("Reps" + IDSEMANA + Dia + (cantEjercicios + 1), "")
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

        let CantEjercicioDia = (parseInt(CantEjerciciosDiaSemana[ID][Dia]))
        //alert(ID + Dia)
        //alert(CantEjercicioDia)

        let tablaM = Section.querySelector('table')
        let tablaLength = (tablaM.rows.length - 2)
        //alert(CantEjerciciosDiaSemana[ID][0] + " " + tablaM.rows.length)

        if(CantEjercicioDia < tablaLength){
            for(let i = tablaLength; i > CantEjercicioDia; i--){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[(i)]
                trM.remove()
            }
        }
        else if(CantEjercicioDia > tablaLength){
            for(let i = tablaLength; i < CantEjercicioDia; i++){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[0]
                let NuevoTrM = trM.cloneNode(true)
                let inputEjercicio = NuevoTrM.querySelector('#Ejercicio' + ID)
                let inputSeries = NuevoTrM.querySelector('#Series' + ID)
                let inputReps = NuevoTrM.querySelector('#Reps' + ID)

                inputEjercicio.value = ""
                inputEjercicio.name = (i + 1)
                inputSeries.value = ""
                inputSeries.name = (i + 1)
                inputReps.value = ""
                inputReps.name = (i + 1)

                tbody2M.appendChild(NuevoTrM)
            }
        }

        for(let i = 0; i <= CantEjercicioDia; i++){
            //alert(`ID: ${ID} Dia: ${Dia} i: ${i}`)
            let Inputs = Section.querySelectorAll(`[name="${i}"]`)
            let InputEjercicio = Inputs[0]
            let InputSeries = Inputs[1]
            let InputReps = Inputs[2]

            if(EjercicioyDia[ID][Dia][i] == undefined){
                EjercicioyDia[ID][Dia][i] = ""
            } 

            if(SeriesyDia[ID][Dia][i] == undefined){
                SeriesyDia[ID][Dia][i] = ""
            }

            if(RepsyDia[ID][Dia][i] == undefined){
                RepsyDia[ID][Dia][i] = ""
            }

            InputEjercicio.value = EjercicioyDia[ID][Dia][i]
            InputSeries.value = SeriesyDia[ID][Dia][i]
            InputReps.value = RepsyDia[ID][Dia][i]
        }
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

        let CantEjercicioDia = (parseInt(CantEjerciciosDiaSemana[ID][Dia]))
        //alert(ID + Dia)
        //alert(CantEjercicioDia)

        let tablaM = Section.querySelector('table')
        let tablaLength = (tablaM.rows.length - 2)
        //alert(CantEjerciciosDiaSemana[ID][0] + " " + tablaM.rows.length)

        if(CantEjercicioDia < tablaLength){
            for(let i = tablaLength; i > CantEjercicioDia; i--){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[(i)]
                trM.remove()
            }
        }
        else if(CantEjercicioDia > tablaLength){
            for(let i = tablaLength; i < CantEjercicioDia; i++){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[0]
                let NuevoTrM = trM.cloneNode(true)
                let inputEjercicio = NuevoTrM.querySelector('#Ejercicio' + ID)
                let inputSeries = NuevoTrM.querySelector('#Series' + ID)
                let inputReps = NuevoTrM.querySelector('#Reps' + ID)

                inputEjercicio.value = ""
                inputEjercicio.name = (i + 1)
                inputSeries.value = ""
                inputSeries.name = (i + 1)
                inputReps.value = ""
                inputReps.name = (i + 1)

                tbody2M.appendChild(NuevoTrM)
            }
        }
        
        for(let i = 0; i <= CantEjercicioDia; i++){
            //alert(`ID: ${ID} Dia: ${Dia} i: ${i}`)
            let Inputs = Section.querySelectorAll(`[name="${i}"]`)
            let InputEjercicio = Inputs[0]
            let InputSeries = Inputs[1]
            let InputReps = Inputs[2]

            if(EjercicioyDia[ID][Dia][i] == undefined){
                EjercicioyDia[ID][Dia][i] = ""
            } 

            if(SeriesyDia[ID][Dia][i] == undefined){
                SeriesyDia[ID][Dia][i] = ""
            }

            if(RepsyDia[ID][Dia][i] == undefined){
                RepsyDia[ID][Dia][i] = ""
            }

            InputEjercicio.value = EjercicioyDia[ID][Dia][i]
            InputSeries.value = SeriesyDia[ID][Dia][i]
            InputReps.value = RepsyDia[ID][Dia][i]
        }
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

        let CantEjercicioDia = (parseInt(CantEjerciciosDiaSemana[ID][Dia]))
        //alert(ID + Dia)
        //alert(CantEjercicioDia)

        let tablaM = Section.querySelector('table')
        let tablaLength = (tablaM.rows.length - 2)
        //alert(CantEjerciciosDiaSemana[ID][0] + " " + tablaM.rows.length)

        if(CantEjercicioDia < tablaLength){
            for(let i = tablaLength; i > CantEjercicioDia; i--){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[(i)]
                trM.remove()
            }
        }
        else if(CantEjercicioDia > tablaLength){
            for(let i = tablaLength; i < CantEjercicioDia; i++){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[0]
                let NuevoTrM = trM.cloneNode(true)
                let inputEjercicio = NuevoTrM.querySelector('#Ejercicio' + ID)
                let inputSeries = NuevoTrM.querySelector('#Series' + ID)
                let inputReps = NuevoTrM.querySelector('#Reps' + ID)

                inputEjercicio.value = ""
                inputEjercicio.name = (i + 1)
                inputSeries.value = ""
                inputSeries.name = (i + 1)
                inputReps.value = ""
                inputReps.name = (i + 1)

                tbody2M.appendChild(NuevoTrM)
            }
        }
        
        for(let i = 0; i <= CantEjercicioDia; i++){
            //alert(`ID: ${ID} Dia: ${Dia} i: ${i}`)
            let Inputs = Section.querySelectorAll(`[name="${i}"]`)
            let InputEjercicio = Inputs[0]
            let InputSeries = Inputs[1]
            let InputReps = Inputs[2]

            if(EjercicioyDia[ID][Dia][i] == undefined){
                EjercicioyDia[ID][Dia][i] = ""
            } 

            if(SeriesyDia[ID][Dia][i] == undefined){
                SeriesyDia[ID][Dia][i] = ""
            }

            if(RepsyDia[ID][Dia][i] == undefined){
                RepsyDia[ID][Dia][i] = ""
            }

            InputEjercicio.value = EjercicioyDia[ID][Dia][i]
            InputSeries.value = SeriesyDia[ID][Dia][i]
            InputReps.value = RepsyDia[ID][Dia][i]
        }
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

        let CantEjercicioDia = (parseInt(CantEjerciciosDiaSemana[ID][Dia]))
        //alert(ID + Dia)
        //alert(CantEjercicioDia)

        let tablaM = Section.querySelector('table')
        let tablaLength = (tablaM.rows.length - 2)
        //alert(CantEjerciciosDiaSemana[ID][0] + " " + tablaM.rows.length)

        if(CantEjercicioDia < tablaLength){
            for(let i = tablaLength; i > CantEjercicioDia; i--){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[(i)]
                trM.remove()
            }
        }
        else if(CantEjercicioDia > tablaLength){
            for(let i = tablaLength; i < CantEjercicioDia; i++){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[0]
                let NuevoTrM = trM.cloneNode(true)
                let inputEjercicio = NuevoTrM.querySelector('#Ejercicio' + ID)
                let inputSeries = NuevoTrM.querySelector('#Series' + ID)
                let inputReps = NuevoTrM.querySelector('#Reps' + ID)

                inputEjercicio.value = ""
                inputEjercicio.name = (i + 1)
                inputSeries.value = ""
                inputSeries.name = (i + 1)
                inputReps.value = ""
                inputReps.name = (i + 1)

                tbody2M.appendChild(NuevoTrM)
            }
        }
        
        for(let i = 0; i <= CantEjercicioDia; i++){
            //alert(`ID: ${ID} Dia: ${Dia} i: ${i}`)
            let Inputs = Section.querySelectorAll(`[name="${i}"]`)
            let InputEjercicio = Inputs[0]
            let InputSeries = Inputs[1]
            let InputReps = Inputs[2]

            if(EjercicioyDia[ID][Dia][i] == undefined){
                EjercicioyDia[ID][Dia][i] = ""
            } 

            if(SeriesyDia[ID][Dia][i] == undefined){
                SeriesyDia[ID][Dia][i] = ""
            }

            if(RepsyDia[ID][Dia][i] == undefined){
                RepsyDia[ID][Dia][i] = ""
            }

            InputEjercicio.value = EjercicioyDia[ID][Dia][i]
            InputSeries.value = SeriesyDia[ID][Dia][i]
            InputReps.value = RepsyDia[ID][Dia][i]
        }
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

        let CantEjercicioDia = (parseInt(CantEjerciciosDiaSemana[ID][Dia]))
        //alert(ID + Dia)
        //alert(CantEjercicioDia)

        let tablaM = Section.querySelector('table')
        let tablaLength = (tablaM.rows.length - 2)
        //alert(CantEjerciciosDiaSemana[ID][0] + " " + tablaM.rows.length)

        if(CantEjercicioDia < tablaLength){
            for(let i = tablaLength; i > CantEjercicioDia; i--){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[(i)]
                trM.remove()
            }
        }
        else if(CantEjercicioDia > tablaLength){
            for(let i = tablaLength; i < CantEjercicioDia; i++){
                let tbody2M = tablaM.querySelector('tbody')
                let trM = tbody2M.getElementsByTagName('tr')[0]
                let NuevoTrM = trM.cloneNode(true)
                let inputEjercicio = NuevoTrM.querySelector('#Ejercicio' + ID)
                let inputSeries = NuevoTrM.querySelector('#Series' + ID)
                let inputReps = NuevoTrM.querySelector('#Reps' + ID)

                inputEjercicio.value = ""
                inputEjercicio.name = (i + 1)
                inputSeries.value = ""
                inputSeries.name = (i + 1)
                inputReps.value = ""
                inputReps.name = (i + 1)

                tbody2M.appendChild(NuevoTrM)
            }
        }

        for(let i = 0; i <= CantEjercicioDia; i++){
            //alert(`ID: ${ID} Dia: ${Dia} i: ${i}`)
            let Inputs = Section.querySelectorAll(`[name="${i}"]`)
            let InputEjercicio = Inputs[0]
            let InputSeries = Inputs[1]
            let InputReps = Inputs[2]

            if(EjercicioyDia[ID][Dia][i] == undefined){
                EjercicioyDia[ID][Dia][i] = ""
            } 

            if(SeriesyDia[ID][Dia][i] == undefined){
                SeriesyDia[ID][Dia][i] = ""
            }

            if(RepsyDia[ID][Dia][i] == undefined){
                RepsyDia[ID][Dia][i] = ""
            }

            InputEjercicio.value = EjercicioyDia[ID][Dia][i]
            InputSeries.value = SeriesyDia[ID][Dia][i]
            InputReps.value = RepsyDia[ID][Dia][i]
        }
    }
}

function TextChanged(TextInput, event){
    //var Section = TextInput.closest('.PanelLabel')
    //var SectionID = Section.id
    //var ID = SectionID.slice(9,11)
    //(ID == ""){
    //    ID = 0
    //InputID = Ejercicio0 - Dia = 1 - EjercicioID = 1

    var InputID = TextInput.id
    var EjercicioID = TextInput.name
    localStorage.setItem(InputID + Dia + EjercicioID, event.target.value)

    for(let i = 0; i <= cantSemanas; i++){
        for(let j = 0; j <= 4; j++){
            //alert("i = " + i + " j = " + j
            
            if(CantEjerciciosDiaSemana[i][j] == undefined){
                CantEjerciciosDiaSemana[i][j] = "0"
            }

            var cantEjercicioPerDay = parseInt(CantEjerciciosDiaSemana[i][j])
            //alert("i = " + i + " j = " + j + " cant ejercicio = " + cantEjercicioPerDay)

            for(let k = 0; k <= cantEjercicioPerDay; k++){

                if(localStorage.getItem("Ejercicio" + i + j + k) == undefined){
                    localStorage.setItem("Ejercicio" + i + j + k, "")
                }
    
                if(localStorage.getItem("Series" + i + j + k) == undefined){
                    localStorage.setItem("Series" + i + j + k, "")
                }
    
                if(localStorage.getItem("Reps" + i + j + k) == undefined){
                    localStorage.setItem("Reps" + i + j + k, "")
                }
                //alert(k)
                EjercicioyDia[i][j][k] = localStorage.getItem("Ejercicio" + i + j + k)
                SeriesyDia[i][j][k] = localStorage.getItem("Series" + i + j + k)
                RepsyDia[i][j][k] = localStorage.getItem("Reps" + i + j + k)
            }
        }
    }
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

        for(let i = 0; i <= cantSemana; i++){
            for(let j = 0; j <= 4; j++){
                //alert(i + " " + j + " " + localStorage.getItem("Semana" + i + "Dia" + j))
                if(localStorage.getItem("Semana" + i + "Dia" + j) == undefined){
                    localStorage.setItem("Semana" + i + "Dia" + j, 0)
                }
        
                CantEjerciciosDiaSemana[i][j] = (localStorage.getItem("Semana" + i + "Dia" + j))
            }
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
                    var NuevoTr = tr.cloneNode(true)
                    var inputEjercicio = NuevoTr.querySelector('#Ejercicio' + is)
                    var inputSeries = NuevoTr.querySelector('#Series' + is)
                    var inputReps = NuevoTr.querySelector('#Reps' + is)
                
                    inputEjercicio.value = ""
                    inputEjercicio.name = e
                    inputSeries.value = ""
                    inputSeries.name = e
                    inputReps.value = ""
                    inputReps.name = e
                    tbody2.appendChild(NuevoTr)
                }
            }
            firsttime2 = false
        }

        for(let j = 0; j <= 4; j++){
            //alert("i = " + i + " j = " + j
            
            if(CantEjerciciosDiaSemana[i][j] == undefined){
                CantEjerciciosDiaSemana[i][j] = "0"
            }

            var cantEjercicioPerDay = parseInt(CantEjerciciosDiaSemana[i/*Semana*/][j/*Dia*/])
            //alert("i = " + i + " j = " + j + " cant ejercicio = " + cantEjercicioPerDay)

            for(let k = 0; k <= cantEjercicioPerDay; k++){

                if(localStorage.getItem("Ejercicio" + i + j + k) == undefined){
                    localStorage.setItem("Ejercicio" + i + j + k, "")
                }
    
                if(localStorage.getItem("Series" + i + j + k) == undefined){
                    localStorage.setItem("Series" + i + j + k, "")
                }
    
                if(localStorage.getItem("Reps" + i + j + k) == undefined){
                    localStorage.setItem("Reps" + i + j + k, "")
                }
                //alert(k)
                EjercicioyDia[i][j][k] = localStorage.getItem("Ejercicio" + i + j + k)
                SeriesyDia[i][j][k] = localStorage.getItem("Series" + i + j + k)
                RepsyDia[i][j][k] = localStorage.getItem("Reps" + i + j + k)

                let pnl = document.querySelector('#pnlSemana' + i)
                let Inputs = pnl.querySelectorAll(`[name="${k}"]`)
                let InputEjercicio = Inputs[0]
                let InputSeries = Inputs[1]
                let InputReps = Inputs[2]

                if(InputEjercicio != undefined){
                    InputEjercicio.value = EjercicioyDia[i][0][k]
                }

                if(InputSeries != undefined){
                    InputSeries.value = SeriesyDia[i][0][k]
                }

                if(InputReps != undefined){
                    InputReps.value = RepsyDia[i][0][k]
                }
            }
        }
    }
}