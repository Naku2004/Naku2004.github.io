
function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

var amountWeeksLista = 1
var edit = false
var pnlSlide = false

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    LoadData(true, false);
    SlideDivButtons()
});

var slide = true

function buttonSlide(){
    if(slide){
        slide = false
        sideLabels = document.querySelectorAll('.sideLabel')
        document.querySelector('#side').classList.add('off')
        document.querySelector('#slidesection').classList.add('sideoff')
    
        for(i = 0; i < sideLabels.length; i++){
            let buttonlistaIcon = sideLabels[i].closest('button')
            let sideIcon = buttonlistaIcon.querySelector('.sideIcon')
    
            if(sideIcon == null){
                sideIcon = buttonlistaIcon.querySelector('.googleSideIcon')
            }
            
            sideIcon.classList.add('off')
            sideLabels[i].classList.add('off')
        }
    }
    else{
        slide = true
        sideLabels = document.querySelectorAll('.sideLabel')
        document.querySelector('#side').classList.remove('off')
        document.querySelector('#pagerutinas').classList.remove('sideoff')
        document.querySelector('#slidesection').classList.remove('sideoff')
    
        for(i = 0; i < sideLabels.length; i++){
            let buttonlistaIcon = sideLabels[i].closest('button')
            let sideIcon = buttonlistaIcon.querySelector('.sideIcon')
    
            if(sideIcon == null){
                sideIcon = buttonlistaIcon.querySelector('.googleSideIcon')
            }
            
            sideIcon.classList.remove('off')
            sideLabels[i].classList.remove('off')
        }
    }
}

function SlideDivButtons(){
    let isDown = false;
    let startX;
    let scrollLeft;

    const container = document.querySelectorAll('#divDivButtons');

    for(let i = 0; i < container.length; i++){
        container[i].addEventListener('mousedown', function(e) {
            isDown = true;
            startX = e.pageX - container[i].offsetLeft;
            scrollLeft = container[i].scrollLeft;
        });
    
        container[i].addEventListener('mouseleave', function() {
            isDown = false;
        });
    
        container[i].addEventListener('mouseup', function() {
            isDown = false;
        });
    
        container[i].addEventListener('mousemove', function(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container[i].offsetLeft;
            const walk = (x - startX) * 1; // Ajusta la velocidad del desplazamiento según sea necesario
            container[i].scrollLeft = scrollLeft - walk;
        });

        container[i].addEventListener('touchstart', function (e) {
            isTouching = true;
            startX = e.touches[0].pageX - container[i].offsetLeft;
            scrollLeft = container[i].scrollLeft;
        });

        container[i].addEventListener('touchmove', function (e) {
            if (!isTouching) return;
            e.preventDefault();
            const x = e.touches[0].pageX - container[i].offsetLeft;
            const walk = (x - startX) * 1; // Ajusta la velocidad del desplazamiento según sea necesario
            container[i].scrollLeft = scrollLeft - walk;
        });

        container[i].addEventListener('touchend', function () {
            isTouching = false;
        });

        container[i].addEventListener('scroll', function() {
            if (container[i].scrollLeft === (container[i].scrollWidth - container[i].clientWidth)) {
                container[i].classList.add('rebote');
                setTimeout(() => {
                    container[i].classList.remove('rebote');
                }, 500); // La duración del rebote, debe coincidir con la duración de la animación en CSS
              }
        });
    }
}

function ButtonSemanaSlideLista(Button){
    let divSemana = Button.closest('div')
    let pnlSemana = divSemana.querySelector('.SectionTable')

    if(pnlSemana.classList.contains('on')){
        pnlSemana.classList.remove('on')
    }
    else{
        pnlSemana.classList.add('on')
    }

    ButtonClickLista(pnlSemana.querySelector('#divButtons').querySelector('button'))
}

function ButtonClickLista(Button){
    let divDivButton = Button.closest('#divDivButtons')
    let NowOn = divDivButton.querySelector('.on')

    NowOn.classList.remove('on')
    Button.classList.add('on')

    let divButtons = Button.closest('div')
    let tbody = Button.closest('.PnlSemana').querySelector('.tbodyBook')
    let ButtonAdd = Button.closest('.PnlSemana').querySelector('.btnAdd')
    let ButtonDelete = Button.closest('.PnlSemana').querySelector('.btnDelete')

    let Week = Button.closest('.PnlSemana').getAttribute('name')
    let Day = divButtons.getAttribute('name')

    let NumberExcercisesActual = tbody.children.length - 1
    let NumberExcercisesAfter =  amountEjerciciosDayLista[Week][Day]

    let AllBtnRetractSeries = Button.closest('.PnlSemana').querySelectorAll('#BtnRetractSeries')
    
    for(let i = 0; i < AllBtnRetractSeries.length; i++){
        let trBook = AllBtnRetractSeries[i].closest('tr')
        trBook.querySelector('#BtnExpandSeries').classList.remove('off')
        trBook.querySelector('#BtnRetractSeries').classList.add('off')

        let tdMoreSeries = trBook.querySelector('#MoreSeries')

        while(tdMoreSeries.firstChild){
            tdMoreSeries.removeChild(tdMoreSeries.firstChild)
        }
    }

    if(NumberExcercisesActual < NumberExcercisesAfter){
        let Diferencia = NumberExcercisesAfter - NumberExcercisesActual
        for(let i = 0; i < Diferencia; i++){
            AddEjercicio(ButtonAdd, true)
        }
    }
    else if(NumberExcercisesActual > NumberExcercisesAfter){
        let Diferencia = NumberExcercisesActual - NumberExcercisesAfter

        for(let i = 0; i < Diferencia; i++){
            DeleteEjercicio(ButtonDelete, true)
        }
    }

    let AllTextInputExcercise = tbody.querySelectorAll('#InputExcercise')
    let AllTextInputSeries = tbody.querySelectorAll('#InputSeries')
    let AllTextInputReps = tbody.querySelectorAll('#InputReps')
    let AllTextInputPeso = tbody.querySelectorAll('#InputPeso')
    let AllTextInputRIR = tbody.querySelectorAll('#InputRIR')

    for(let i = 0; i < NumberExcercisesAfter; i++){

        if(textEjerciciosLista[Week][Day][i] == "null"){
            textEjerciciosLista[Week][Day][i] = ""
        }
        if(textSeriesLista[Week][Day][i] == "null"){
            textSeriesLista[Week][Day][i] = ""
        }
        if(textRepsLista[Week][Day][i] == "null"){
            textRepsLista[Week][Day][i] = ""
        }
        if(textPesoLista[Week][Day][i] == "null"){
            textPesoLista[Week][Day][i] = ""
        }
        if(textRIRLista[Week][Day][i] == "null"){
            textRIRLista[Week][Day][i] = ""
        }

        AllTextInputExcercise[i].value = textEjerciciosLista[Week][Day][i]
        AllTextInputSeries[i].value = textSeriesLista[Week][Day][i]
        AllTextInputReps[i].value = textRepsLista[Week][Day][i]
        AllTextInputPeso[i].value = textPesoLista[Week][Day][i]
        AllTextInputRIR[i].value = textRIRLista[Week][Day][i]
    }
    
    ShowBtnSeries()
    //SaveData()
}

var amountEjerciciosDayLista = [/*Semana 1*/ [1 /*Dia1*/]]

function AddWeekLista(Button, Load, i){
    if(Load == false){
        amountWeeksLista++
    }
    
    let divpagerutinas = Button.closest('#pagerutinas')
    let divPage = divpagerutinas.querySelector('#DivSemanasLista')
    let divSemana = divPage.querySelectorAll('#semana')
    let NewDivSemana = divSemana[divSemana.length - 1].cloneNode(true)
    let BtnSlide = NewDivSemana.querySelector('#BtnSemanaSlide')
    let SpanSlide = NewDivSemana.querySelector('#LabelSemana')
    let AmountDays = NewDivSemana.querySelector('#divDivButtons').children.length - 1
    let DivShowSeries = NewDivSemana.querySelector('#DivShowSeries')
    DivShowSeries.classList.remove('on')

    if(Load == true){
        if(SemanaTextLista[i - 1] != "" || SemanaTextLista[i - 1] != undefined || SemanaTextLista[i - 1] != null){    
            BtnSlide.innerText = SemanaTextLista[i - 1]
            SpanSlide.value = SemanaTextLista[i - 1]
        }
        NewDivSemana.setAttribute('name', (i - 1))
        divPage.insertBefore(NewDivSemana, divPage.childNodes[(i + 2)])
    }
    else{
        BtnSlide.innerText = "Semana " + amountWeeksLista
        SpanSlide.textContent = "Semana " + amountWeeksLista
        NewDivSemana.setAttribute('name', (amountWeeksLista - 1))
        

        amountDaysLista[amountWeeksLista - 1] = AmountDays + 1
        amountEjerciciosDayLista[amountWeeksLista - 1] = []
        textEjerciciosLista[amountWeeksLista - 1] = []
        textSeriesLista[amountWeeksLista - 1] = []
        textRepsLista[amountWeeksLista - 1] = []
        textPesoLista[amountWeeksLista - 1] = []
        textRIRLista[amountWeeksLista - 1] = []
        DiaTextLista[amountWeeksLista - 1] = [[]]
        SemanaTextLista[amountWeeksLista - 1] = "Semana " + amountWeeksLista
    
        for(let i = 0; i <= AmountDays; i++){
            amountEjerciciosDayLista[amountWeeksLista - 1][i] = "1"
            textEjerciciosLista[amountWeeksLista - 1][i] = [""]
            textSeriesLista[amountWeeksLista - 1][i] = [""]
            textRepsLista[amountWeeksLista - 1][i] = [""]
            textPesoLista[amountWeeksLista - 1][i] = [""]
            textRIRLista[amountWeeksLista - 1][i] = [""]
            DiaTextLista[amountWeeksLista - 1][i] = NewDivSemana.querySelectorAll('#divButtons')[i].querySelector('input').value
        }

        divPage.insertBefore(NewDivSemana, divPage.childNodes[(amountWeeksLista + 2)])
        
        ButtonClickLista(NewDivSemana.querySelector('#divDivButtons').querySelector('.on'))
        SaveData()
    }
    SlideDivButtons()
}

var pase

function DeleteWeekLista(Button){
    if(amountWeeksLista > 1){
        amountWeeksLista--
        localStorage.removeItem("amountDaysLista" + amountWeeksLista)

        for(let i = 0; i < amountDaysLista[amountWeeksLista]; i++){
            localStorage.removeItem(`amountEjerciciosDayLista${amountWeeksLista}${i}`)
            for(let j = 0; j < amountEjerciciosDayLista[amountWeeksLista][i]; j++){
                localStorage.removeItem(`textEjerciciosLista${amountWeeksLista}${i}${j}`)
                localStorage.removeItem(`textSeriesLista${amountWeeksLista}${i}${j}`)
                localStorage.removeItem(`textRepsLista${amountWeeksLista}${i}${j}`)
                localStorage.removeItem(`textRIRLista${amountWeeksLista}${i}${j}`)
            }
        }
    
        amountDaysLista[amountWeeksLista] = "1"
        amountEjerciciosDayLista.splice(amountWeeksLista, 1)
        textEjerciciosLista.splice(amountWeeksLista, 1)
        textSeriesLista.splice(amountWeeksLista, 1)
        textRepsLista.splice(amountWeeksLista, 1)
        textPesoLista.splice(amountWeeksLista, 1)
        textRIRLista.splice(amountWeeksLista, 1)
        DiaTextLista.splice(amountWeeksLista, 1)
        dataBase.ListaRutinas.splice(amountWeeksLista, 1)
        pase = Math.random()

        SaveData()

        let divpagerutinas = Button.closest('#pagerutinas')
        let divPage = divpagerutinas.querySelector('#DivSemanasLista')

        divPage.removeChild(divPage.children[(amountWeeksLista)])
    }
}

var amountDaysLista = [1/*Semana1*/]

function AddDaysLista(Button, Load, j){
    let tr = Button.closest('tr')
    let th = tr.querySelector('th')
    let semana = Button.closest('#semana')
    let Week = semana.getAttribute('name')
    let addButton = Button.closest('#divAdd')

    if(amountDaysLista[Week] < 7 || Load == true){
        if(Load == false){
            amountDaysLista[Week]++
            DiaTextLista[Week][amountDaysLista[Week] - 1] = `Dia ${amountDaysLista[Week]}`
            amountEjerciciosDayLista[Week][amountDaysLista[Week] - 1] = 1
            textEjerciciosLista[Week][amountDaysLista[Week] - 1] = [""]
            textSeriesLista[Week][amountDaysLista[Week] - 1] = [""]
            textRepsLista[Week][amountDaysLista[Week] - 1] = [""]
            textPesoLista[Week][amountDaysLista[Week] - 1] = [""]
            textRIRLista[Week][amountDaysLista[Week] - 1] = [""]
            SaveData()
        }

        if(amountDaysLista[Week] == 2 && Load == false){
            th.querySelector('.buttonLabelDay').classList.remove('deleteOff')
            th.querySelector('#BtnDeleteButtons').classList.remove('off')
        }

        let divsBtn = tr.querySelectorAll('#divButtons')
        let divBtn = divsBtn[divsBtn.length - 1]
        let NewDivBtn = divBtn.cloneNode(true)
        let Btn = NewDivBtn.querySelector('button')
        let SpanBtn = NewDivBtn.querySelector('input')
        Btn.classList.remove('on')
        addButton.classList.add('off')
        divBtn.querySelector('#divDelete').classList.remove('last')
        NewDivBtn.querySelector('#divDelete').classList.add("last")

        //alert(NewDivBtn.querySelector('#divAdd'))
        if(amountDaysLista[Week] == 7){
            NewDivBtn.querySelector('#divAdd').classList.add("off")
            NewDivBtn.querySelector('#divDelete').classList.remove("last")
        }
        
        if(Load == true){
            NewDivBtn.setAttribute('name', (j - 1))
            Btn.innerText = DiaTextLista[Week][j - 1]
            SpanBtn.value = DiaTextLista[Week][j - 1]
        }
        else{
            NewDivBtn.setAttribute('name', (amountDaysLista[Week] - 1))
            Btn.innerText = "Dia " + amountDaysLista[Week]
            SpanBtn.value = "Dia " + amountDaysLista[Week]
            DiaTextLista[Week][amountDaysLista[Week] - 1] = "Dia " + amountDaysLista[Week]
        }

        th.appendChild(NewDivBtn)
        //th.insertBefore(NewDivBtn, th.children[(NumTrChilds)])
    }
}

function DeleteDaysLista(Button){
    let Week = Button.closest('#semana').getAttribute('name')

    if(amountDaysLista[Week] > 1){
        let div = Button.closest('#divButtons')
        let Day = parseInt(div.getAttribute('name'))
        amountDaysLista[Week]--

        for(let i = 0; i < amountEjerciciosDayLista[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDayLista${Week}${Day}${i}`)
            localStorage.removeItem(`textEjerciciosLista${Week}${Day}${i}`)
            localStorage.removeItem(`textSeriesLista${Week}${Day}${i}`)
            localStorage.removeItem(`textRepsLista${Week}${Day}${i}`)
            localStorage.removeItem(`textRIRLista${Week}${Day}${i}`)
            localStorage.removeItem(`DiaTextLista${Week}${Day}${i}`)
        }

        for(let i = 0; i < amountEjerciciosDayLista[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDayLista${Week}${amountDaysLista}${i}`)
            localStorage.removeItem(`textEjerciciosLista${Week}${amountDaysLista}${i}`)
            localStorage.removeItem(`textSeriesLista${Week}${amountDaysLista}${i}`)
            localStorage.removeItem(`textRepsLista${Week}${amountDaysLista}${i}`)
            localStorage.removeItem(`textRIRLista${Week}${amountDaysLista}${i}`)
            localStorage.removeItem(`DiaTextLista${Week}${amountDaysLista}${i}`)
        }

        amountEjerciciosDayLista[Week].splice(Day, 1)
        textEjerciciosLista[Week].splice(Day, 1)
        textSeriesLista[Week].splice(Day, 1)
        textRepsLista[Week].splice(Day, 1)
        textPesoLista[Week].splice(Day, 1)
        textRIRLista[Week].splice(Day, 1)
        DiaTextLista[Week].splice(Day, 1)
        dataBase.ListaRutinas[Week].DIASNAME.splice(Day, 1)
        dataBase.ListaRutinas[Week].CANTEJERCICIOSDIA.splice(Day, 1)
        dataBase.ListaRutinas[Week].TEXTEJERCICIO.splice(Day, 1)
        dataBase.ListaRutinas[Week].TEXTSERIES.splice(Day, 1)
        dataBase.ListaRutinas[Week].TEXTREPS.splice(Day, 1)
        dataBase.ListaRutinas[Week].TEXTPESO.splice(Day, 1)
        dataBase.ListaRutinas[Week].TEXTRIR.splice(Day, 1)

        SaveData()

        let divDivButtons = Button.closest('#divDivButtons')
        let divButtons = divDivButtons.querySelectorAll('#divButtons')
        let numberDay = Button.closest('#divButtons').getAttribute('name')

        for(let i = numberDay; i < divDivButtons.children.length; i++){
            divButtons[i].setAttribute('name', (i - 1))
        }

        if(amountDaysLista[Week] == 1){
            divDivButtons.querySelector('.buttonLabelDay').classList.add('deleteOff')
            divDivButtons.querySelector('#BtnDeleteButtons').classList.add('off')
        }

        div.remove()
        
        let lastAddButton = divDivButtons.querySelectorAll('#divAdd')[divDivButtons.children.length - 1]
        lastAddButton.classList.remove('off')

        if(amountDaysLista[Week] > 1){
            divDivButtons.querySelectorAll('#divDelete')[divDivButtons.children.length - 1].classList.add('last')
        }

        if(amountDaysLista[Week] == 6){
            let addButtons = divDivButtons.querySelectorAll('#divAdd')
            let addButton = addButtons[addButtons.length - 1]
            addButton.classList.remove("off")
        }

        let Buttons = divDivButtons.querySelectorAll('#divButtons')
        let FirstButton = Buttons[0].querySelector('button')
        FirstButton.classList.add('on')
        ButtonClickLista(FirstButton)
    }
}

function AddEjercicio(Button, Load, j){
    let Week = Button.closest('#semana').getAttribute('name')
    let Day = Button.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    if(Load == false){
        textEjerciciosLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textSeriesLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textRepsLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textPesoLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textRIRLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        amountEjerciciosDayLista[Week][Day]++
        SaveData()
    }

    let divSemana = Button.closest('#semana')
    let tBody = divSemana.querySelector('.tbodyBook')
    let trEjercicio = tBody.querySelector('.trBookEjercicio')
    let NewTrEjercicio = trEjercicio.cloneNode(true)

    if(Load == true){
        NewTrEjercicio.setAttribute('name', (j))
        tBody.appendChild(NewTrEjercicio)
    }
    else{
        NewTrEjercicio.setAttribute('name', (amountEjerciciosDayLista[Week][Day] - 1))
        tBody.appendChild(NewTrEjercicio)
        ButtonClickLista(divSemana.querySelector('#divDivButtons').querySelector('.on'))
    }
}

function DeleteEjercicio(Button, Load){
    let Week = Button.closest('#semana').getAttribute('name')
    let Day = Button.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    if(amountEjerciciosDayLista[Week][Day] > 1 || Load == true){
        if(Load == false){
            amountEjerciciosDayLista[Week][Day]--
            textEjerciciosLista[Week][Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            textSeriesLista[Week][Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            textRepsLista[Week][Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            textRIRLista[Week][Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            dataBase.ListaRutinas[Week].TEXTEJERCICIO[Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            dataBase.ListaRutinas[Week].TEXTSERIES[Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            dataBase.ListaRutinas[Week].TEXTREPS[Day].splice(amountEjerciciosDayLista[Week][Day], 1)
            dataBase.ListaRutinas[Week].TEXTRIR[Day].splice(amountEjerciciosDayLista[Week][Day], 1)

            localStorage.removeItem(`textEjerciciosLista${Week}${Day}${amountEjerciciosDayLista[Week][Day]}`)
            localStorage.removeItem(`textSeriesLista${Week}${Day}${amountEjerciciosDayLista[Week][Day]}`)
            localStorage.removeItem(`textRepsLista${Week}${Day}${amountEjerciciosDayLista[Week][Day]}`)
            localStorage.removeItem(`textRIRLista${Week}${Day}${amountEjerciciosDayLista[Week][Day]}`)
            SaveData()
        }
        let divSemana = Button.closest('#semana')
        let tBody = divSemana.querySelector('.tbodyBook')
        tBody.removeChild(tBody.lastChild)
    }
}

function EditButtonsLista(Button){
    let divSemana = Button.closest('div')
    let labelSemana = divSemana.querySelector('input')
    let labelDays = divSemana.querySelectorAll('.buttonLabelDay')
    let btnSlideSemana = divSemana.querySelector('button')
    let divsAdd = divSemana.querySelectorAll('#divAdd')
    let divAdd = divsAdd[divsAdd.length - 1]
    let btnDays = divSemana.querySelectorAll('.buttonBook')
    let btnDelete = divSemana.querySelectorAll('.buttonDelete')
    let EditIcon = divSemana.querySelector('#EditIcon')
    let Week = divSemana.getAttribute('name')
    //alert(Week + amountDaysLista[Week])

    if(edit == false){
        labelSemana.classList.remove('off')
        btnSlideSemana.classList.add('off')

        for(let i = 0; i < (labelDays.length); i++){
            labelDays[i].classList.remove('off')
            btnDays[i].classList.add('off')
        }


        if(amountDaysLista[Week] > 1){
            for(let i = 0; i <= (btnDays.length - 1); i++){
                btnDelete[i].classList.remove('off')
                labelDays[i].classList.remove('deleteOff')
            }
        }

        if(amountDaysLista[Week] < 7){
            divAdd.classList.remove('off')  
        }

        EditIcon.className = "fa-solid fa-check check"

        edit = true
    }
    else{
        labelSemana.classList.add('off')
        btnSlideSemana.classList.remove('off')
        divAdd.classList.add('off')

        for(let i = 0; i < (labelDays.length); i++){
            labelDays[i].classList.add('off')
            btnDays[i].classList.remove('off')
        }

        for(let i = 0; i <= (btnDelete.length - 1); i++){
            btnDelete[i].classList.add('off')
            labelDays[i].classList.add('deleteOff')
        }

        EditIcon.className = "fa-solid fa-pen-to-square"
        SaveData()
        edit = false
    }
    //SaveData()
}

function EditText(TextInput, event){
    event.preventDefault()
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    Btn.innerText = TextInput.textContent
}

var SemanaTextLista = []
var DiaTextLista = [[]]

function EditTextSpanLista(TextInput, Type){
    let Week = TextInput.closest('.PnlSemana').getAttribute('name')
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    if(Type == "Semana"){
        Btn.innerText = TextInput.value
        SemanaTextLista[Week] = TextInput.value
    } else
    if(Type == "Dia"){
        Btn.innerText = TextInput.value
        let Day = TextInput.closest('div').getAttribute('name')
        DiaTextLista[Week][Day] = TextInput.value
    }
    //SaveData()
}

var textEjerciciosLista =    [/* Semana */[/*Dia 1*/[""/*1er Ejercicio*/]]]
var textSeriesLista =        [/* Semana */[/*Dia 1*/[""/*1er Series*/]]]
var textRepsLista =          [/* Semana */[/*Dia 1*/[""/*1er Reps*/]]]
var textPesoLista =          [/* Semana */[/*Dia 1*/[""/*1er Peso*/]]]
var textRIRLista =           [/* Semana */[/*Dia 1*/[""/*1er RIR*/]]]
var TextoCambiado = false

function TextChanged(TextInput, Type){
    let Week = TextInput.closest('#semana').getAttribute('name')
    let Day = TextInput.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    let ExerciseID = TextInput.closest('tr').getAttribute('name')
    TextoCambiado = true

    if(Type == "Ejercicio"){
        textEjerciciosLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
    }

    if(Type == "Series"){
        textSeriesLista[Week][Day][ExerciseID] = TextInput.value
        SeriesChanged(TextInput)
        //alert(textEjerciciosLista[Week][Day][ExerciseID])
    }

    if(Type == "Reps"){
        textRepsLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
    }

    if(Type == "RIR"){
        textRIRLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
    }

    if(Type == 'Peso'){
        textPesoLista[Week][Day][ExerciseID] = TextInput.value
    }
}

function BlurData(){
    if(TextoCambiado == true){
        TextoCambiado = false
        SaveData()
    }
}

var dataBase = {
    ListaRutinas: [{
        SEMANAID: 0,
        SEMANANAME: "Semana",
        CANTDIAS: 0,
        DIASNAME: ["Dia 1"],
        CANTEJERCICIOSDIA: [],
        TEXTEJERCICIO:[[""]],
        TEXTSERIES: [[""]],
        TEXTREPS: [[""]],
        TEXTPESO: [[""]],
        TEXTRIR: [[""]],
        PASE: 0
    }],
    ListaBook: [{
        SEMANAID: 0,
        SEMANANAME: "Semana",
        CANTDIAS: 0,
        DIASNAME: ["Dia 1"],
        CANTEJERCICIOSDIA: [],
        TEXTEJERCICIO:[[""]],
        TEXTSERIES: [[""]],
        TEXTREPS: [[""]],
        TEXTPESO: [[""]],
        TEXTRIR: [[""]],
        PASE: 0
    }]
}

var usuarios = []
var contraseñas = []
var amountUsers

function SaveData(){
    localStorage.setItem("amountWeeksLista", amountWeeksLista)

    for(let i = 0; i < amountWeeksLista; i++){
        localStorage.setItem("SemanaTextLista" + i, SemanaTextLista[i])
    }

    for(let i = 0; i < amountDaysLista.length; i++){
        if(amountDaysLista[i] == null){
            amountDaysLista[i] = 1 
        }
        localStorage.setItem("amountDaysLista" + i, amountDaysLista[i])
    }

    for(let i = 0; i < amountWeeksLista; i++){
        for(let j = 0; j < amountDaysLista[i]; j++){
            localStorage.setItem("amountEjerciciosDayLista" + i + j, amountEjerciciosDayLista[i][j])
            localStorage.setItem("DiaTextLista" + i + j, DiaTextLista[i][j])
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        for(let j = 0; j < amountDaysLista[i]; j++){
            for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                localStorage.setItem("textEjerciciosLista" + i + j + k, textEjerciciosLista[i][j][k])
                localStorage.setItem("textSeriesLista" + i + j + k, textSeriesLista[i][j][k])
                localStorage.setItem("textRepsLista" + i + j + k, textRepsLista[i][j][k])
                localStorage.setItem("textPesoLista" + i + j + k, textPesoLista[i][j][k])
                localStorage.setItem("textRIRLista" + i + j + k, textRIRLista[i][j][k])
            }
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){

        if(dataBase.ListaRutinas[i] == undefined){
            dataBase.ListaRutinas[i] = {
                SEMANAID: 0,
                SEMANANAME: "Semana",
                CANTDIAS: 0,
                DIASNAME: ["Dia 1"],
                CANTEJERCICIOSDIA: [],
                TEXTEJERCICIO:[[""]],
                TEXTSERIES: [[""]],
                TEXTREPS: [[""]],
                TEXTPESO: [[""]],
                TEXTRIR: [[""]],
                PASE: 0
            }
        }
        
        dataBase.ListaRutinas[i].SEMANAID = i
        dataBase.ListaRutinas[i].SEMANANAME = SemanaTextLista[i]
        dataBase.ListaRutinas[i].PASE = pase

        for(let j = 0; j < amountDaysLista[i]; j++){
            
            dataBase.ListaRutinas[i].CANTDIAS = amountDaysLista[i]
            dataBase.ListaRutinas[i].DIASNAME[j] = DiaTextLista[i][j]
            dataBase.ListaRutinas[i].CANTEJERCICIOSDIA[j] = amountEjerciciosDayLista[i][j]

            for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                if(dataBase.ListaRutinas[i].TEXTEJERCICIO[j] == undefined){
                    dataBase.ListaRutinas[i].TEXTEJERCICIO[j] = []
                }

                if(dataBase.ListaRutinas[i].TEXTSERIES[j] == undefined){
                    dataBase.ListaRutinas[i].TEXTSERIES[j] = []
                }

                if(dataBase.ListaRutinas[i].TEXTREPS[j] == undefined){
                    dataBase.ListaRutinas[i].TEXTREPS[j] = []
                }

                if(dataBase.ListaRutinas[i].TEXTPESO[j] == undefined){
                    dataBase.ListaRutinas[i].TEXTPESO[j] = []
                }

                if(dataBase.ListaRutinas[i].TEXTRIR[j] == undefined){
                    dataBase.ListaRutinas[i].TEXTRIR[j] = []
                }

                dataBase.ListaRutinas[i].TEXTEJERCICIO[j][k] = textEjerciciosLista[i][j][k]
                dataBase.ListaRutinas[i].TEXTSERIES[j][k] = textSeriesLista[i][j][k]
                dataBase.ListaRutinas[i].TEXTREPS[j][k] = textRepsLista[i][j][k]
                console.log(textPesoLista[i][j][k])
                dataBase.ListaRutinas[i].TEXTPESO[j][k] = textPesoLista[i][j][k]
                dataBase.ListaRutinas[i].TEXTRIR[j][k] = textRIRLista[i][j][k]
            }
        }
    }

    for(let i = 0; i < amountWeeks; i++){

        if(dataBase.ListaBook[i] == undefined){
            dataBase.ListaBook[i] = {
                SEMANAID: 0,
                SEMANANAME: "Semana",
                CANTDIAS: 0,
                DIASNAME: ["Dia 1"],
                CANTEJERCICIOSDIA: [],
                TEXTEJERCICIO:[[""]],
                TEXTSERIES: [[""]],
                TEXTREPS: [[""]],
                TEXTPESO: [[""]],
                TEXTRIR: [[""]],
                PASE: 0
            }
        }
        
        dataBase.ListaBook[i].SEMANAID = i
        dataBase.ListaBook[i].SEMANANAME = SemanaText[i]
        dataBase.ListaBook[i].PASE = pase

        for(let j = 0; j < amountDays[i]; j++){
            
            dataBase.ListaBook[i].CANTDIAS = amountDays[i]
            dataBase.ListaBook[i].DIASNAME[j] = DiaText[i][j]
            dataBase.ListaBook[i].CANTEJERCICIOSDIA[j] = amountEjerciciosDay[i][j]

            for(let k = 0; k < amountEjerciciosDay[i][j]; k++){
                if(dataBase.ListaBook[i].TEXTEJERCICIO[j] == undefined){
                    dataBase.ListaBook[i].TEXTEJERCICIO[j] = []
                }

                if(dataBase.ListaBook[i].TEXTSERIES[j] == undefined){
                    dataBase.ListaBook[i].TEXTSERIES[j] = []
                }

                if(dataBase.ListaBook[i].TEXTREPS[j] == undefined){
                    dataBase.ListaBook[i].TEXTREPS[j] = []
                }

                if(dataBase.ListaBook[i].TEXTPESO[j] == undefined){
                    dataBase.ListaBook[i].TEXTPESO[j] = []
                }

                if(dataBase.ListaBook[i].TEXTRIR[j] == undefined){
                    dataBase.ListaBook[i].TEXTRIR[j] = []
                }

                dataBase.ListaBook[i].TEXTEJERCICIO[j][k] = textEjercicios[i][j][k]
                dataBase.ListaBook[i].TEXTSERIES[j][k] = textSeries[i][j][k]
                dataBase.ListaBook[i].TEXTREPS[j][k] = textReps[i][j][k]
                dataBase.ListaBook[i].TEXTPESO[j][k] = textPeso[i][j][k]
                dataBase.ListaBook[i].TEXTRIR[j][k] = textRIR[i][j][k]
            }
        }
    }

    localStorage.setItem("amountWeeks", amountWeeks)
    
    for(let i = 0; i < amountWeeks; i++){
        localStorage.setItem("SemanaText" + i, SemanaText[i])
    }

    for(let i = 0; i < amountWeeks; i++){
        for(let j = 0; j < amountDays[i]; j++){
            localStorage.setItem("DiaText" + i + "" + j, DiaText[i][j])
        }
    }

    for(let i = 0; i < amountDays.length; i++){
        if(amountDays[i] == null){
            amountDays[i] = 1 
        }
        localStorage.setItem("amountDays" + i, amountDays[i])
    }

    for(let i = 0; i < amountWeeks; i++){
        for(let j = 0; j < amountDays[i]; j++){
            localStorage.setItem("amountEjerciciosDay" + i + j, amountEjerciciosDay[i][j])
        }
    }

    for(let i = 0; i < amountWeeks; i++){
        for(let j = 0; j < amountDays[i]; j++){
            for(let k = 0; k < amountEjerciciosDay[i][j]; k++){
                localStorage.setItem("textEjercicios" + i + j + k, textEjercicios[i][j][k])
                localStorage.setItem("textSeries" + i + j + k, textSeries[i][j][k])
                localStorage.setItem("textReps" + i + j + k, textReps[i][j][k])
                localStorage.setItem("textPeso" + i + j + k, textPeso[i][j][k])
                localStorage.setItem("textRIR" + i + j + k, textRIR[i][j][k])
            }
        }
    }

    if(logueado){
        let FileName = `${user}DataBase.json`

        const datosJSON = JSON.stringify(dataBase)
        console.log(datosJSON)

        const NewDataBase = {
            [FileName]: {
            content: datosJSON
            }
        }

        fetch(`https://api.github.com/gists/${gistId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${git1 + git2}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                files: NewDataBase
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error)); 
    }

    //console.log(dataBase.ListaRutinas)
}

const gistId = 'ea76aea67dfe233b31662624d6d9cc43'; 
const git1 = 'github_pat_11A7P7C2I0iL7J0a7NZWTT_05Umcb6TlNi'
const git2 = 'tPXKjuwqcevZdPK51rrpe94BGwem3c9vOWSYTNJ4hxJLq0VD'

async function LoadData(FirstTime, Again){

    if(localStorage.getItem("user") != "" && localStorage.getItem("user") != undefined && localStorage.getItem("user") != null){
        user = localStorage.getItem("user")
        pw = localStorage.getItem("pw")
        document.getElementById('ButtonsSign').classList.add('off')
        document.getElementById('navAccount').classList.remove('off')
        document.querySelector('.btnRightSlide').classList.add('off')
        document.querySelector('.Popover').querySelector('.title').innerHTML = user + '<hr>'
        logueado = true
    }

    try{
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
            headers: {
                'Authorization': `token ${git1 + git2}`
              }
        })

        const data = await response.json()
        const usersData = JSON.parse(data.files["users.json"].content)
        amountUsers = usersData.users.length


        for(let i = 0; i < amountUsers; i++){
            usersFormat.users[i] = usersData.users[i]
            usersFormat.password[i] = usersData.password[i]
        }
    } 
    catch (error){
        console.error('Error:', error);
    }

    if(logueado){
        try{
            const response = await fetch(`https://api.github.com/gists/${gistId}`, {
                headers: {
                    'Authorization': `token ${git1 + git2}`
                  }
            })
    
            const data = await response.json()
            let FileName = `${user}DataBase.json`
            const dataBaseRaw = data.files[FileName].content
            const dataBaseLoad = JSON.parse(dataBaseRaw)
    
            amountWeeksLista = parseInt(dataBaseLoad.ListaRutinas.length)
    
            for(let i = 0; i < amountWeeksLista; i++){
                amountDaysLista[i] = parseInt(dataBaseLoad.ListaRutinas[i].CANTDIAS)
                SemanaTextLista[i] = dataBaseLoad.ListaRutinas[i].SEMANANAME
    
                if(typeof amountDaysLista[i] == undefined){
                    amountDaysLista[i] = 1
                }
    
                if(i != 0){
                    DiaTextLista[i] = [[]]
                    amountEjerciciosDayLista[i] = []
                }
                for(let j = 0; j < amountDaysLista[i]; j++){
                    DiaTextLista[i][j] = dataBaseLoad.ListaRutinas[i].DIASNAME[j]
                    amountEjerciciosDayLista[i][j] = dataBaseLoad.ListaRutinas[i].CANTEJERCICIOSDIA[j]
                }
            }
    
            for(let i = 0; i < amountWeeksLista; i++){
                if(i != 0){
                    textEjerciciosLista[i] = [[]]
                    textSeriesLista[i] = [[]]
                    textRepsLista[i] = [[]]
                    textPesoLista[i] = [[]]
                    textRIRLista[i] = [[]]
                }
    
                for(let j = 0; j < amountDaysLista[i]; j++){
                    if(j != 0){
                        textEjerciciosLista[i][j] = []
                        textSeriesLista[i][j] = []
                        textRepsLista[i][j] = []
                        textPesoLista[i][j] = []
                        textRIRLista[i][j] = []
                    }
                    for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                        //alert(localStorage.getItem(`textEjerciciosListaLista${i}${j}${k}`))
                        textEjerciciosLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTEJERCICIO[j][k]
                        textSeriesLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTSERIES[j][k]
                        textRepsLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTREPS[j][k]
                        textPesoLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTPESO[j][k]
                        textRIRLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTRIR[j][k]
                    }
                }
            }
    
            amountWeeks = parseInt(dataBaseLoad.ListaBook.length)
    
            for(let i = 0; i < amountWeeks; i++){
                amountDays[i] = parseInt(dataBaseLoad.ListaBook[i].CANTDIAS)
                SemanaText[i] = dataBaseLoad.ListaBook[i].SEMANANAME
    
                if(typeof amountDays[i] == undefined){
                    amountDays[i] = 1
                }
    
                if(i != 0){
                    DiaText[i] = [[]]
                    amountEjerciciosDay[i] = []
                }
                for(let j = 0; j < amountDays[i]; j++){
                    DiaText[i][j] = dataBaseLoad.ListaBook[i].DIASNAME[j]
                    amountEjerciciosDay[i][j] = dataBaseLoad.ListaBook[i].CANTEJERCICIOSDIA[j]
                }
            }
    
            for(let i = 0; i < amountWeeks; i++){
                if(i != 0){
                    textEjercicios[i] = [[]]
                    textSeries[i] = [[]]
                    textReps[i] = [[]]
                    textPeso[i] = [[]]
                    textRIR[i] = [[]]
                }
    
                for(let j = 0; j < amountDays[i]; j++){
                    if(j != 0){
                        textEjercicios[i][j] = []
                        textSeries[i][j] = []
                        textReps[i][j] = []
                        textPeso[i][j] = []
                        textRIR[i][j] = []
                    }
                    for(let k = 0; k < amountEjerciciosDay[i][j]; k++){
                        //alert(localStorage.getItem(`textEjercicios${i}${j}${k}`))
                        textEjercicios[i][j][k] = dataBaseLoad.ListaBook[i].TEXTEJERCICIO[j][k]
                        textSeries[i][j][k] = dataBaseLoad.ListaBook[i].TEXTSERIES[j][k]
                        textReps[i][j][k] = dataBaseLoad.ListaBook[i].TEXTREPS[j][k]
                        textPeso[i][j][k] = dataBaseLoad.ListaBook[i].TEXTPESO[j][k]
                        textRIR[i][j][k] = dataBaseLoad.ListaBook[i].TEXTRIR[j][k]
                    }
                }
            }
        } 
        catch (error){
            console.error('Error:', error);
        }
    }
    else{
        amountWeeksLista = localStorage.getItem("amountWeeksLista")

        if(amountWeeksLista == null){
            amountWeeksLista = 1
        }

        for(let i = 0; i < amountWeeksLista; i++){
            amountDaysLista[i] = localStorage.getItem("amountDaysLista" + i)

            if(typeof amountDaysLista[i] == undefined){
                amountDaysLista[i] = 1
            }
        }

        for(let i = 0; i < amountWeeksLista; i++){
            SemanaTextLista[i] = localStorage.getItem("SemanaTextLista" + i)
        }

        for(let i = 0; i < amountWeeksLista; i++){
            if(i != 0){
                DiaTextLista[i] = [[]]
            }
            for(let j = 0; j < amountDaysLista[i]; j++){
                DiaTextLista[i][j] = localStorage.getItem(`DiaTextLista${i}${j}`)
            }
        }

        for(let i = 0; i < amountWeeksLista; i++){
            if(i != 0){
                amountEjerciciosDayLista[i] = []
            }
            for(let j = 0; j < amountDaysLista[i]; j++){
                amountEjerciciosDayLista[i][j] = localStorage.getItem(`amountEjerciciosDayLista${i}${j}`)
            }
        }

        for(let i = 0; i < amountWeeksLista; i++){
            if(i != 0){
                textEjerciciosLista[i] = [[]]
                textSeriesLista[i] = [[]]
                textRepsLista[i] = [[]]
                textPesoLista[i] = [[]]
                textRIRLista[i] = [[]]
            }
            for(let j = 0; j < amountDaysLista[i]; j++){
                if(j != 0){
                    textEjerciciosLista[i][j] = []
                    textSeriesLista[i][j] = []
                    textRepsLista[i][j] = []
                    textPesoLista[i][j] = []
                    textRIRLista[i][j] = []
                }
                for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                    //alert(localStorage.getItem(`textEjerciciosListaLista${i}${j}${k}`))
                    textEjerciciosLista[i][j][k] = localStorage.getItem(`textEjerciciosLista${i}${j}${k}`)
                    textSeriesLista[i][j][k] = localStorage.getItem(`textSeriesLista${i}${j}${k}`)
                    textRepsLista[i][j][k] = localStorage.getItem(`textRepsLista${i}${j}${k}`)
                    textPesoLista[i][j][k] = localStorage.getItem(`textPesoLista${i}${j}${k}`)
                    textRIRLista[i][j][k] = localStorage.getItem(`textRIRLista${i}${j}${k}`)
                }
            }
        }

        amountWeeks = localStorage.getItem("amountWeeks")

        if(amountWeeks == null){
            amountWeeks = 1
        }

        for(let i = 0; i < amountWeeks; i++){
            amountDays[i] = localStorage.getItem("amountDays" + i)

            if(typeof amountDays[i] == undefined){
                amountDays[i] = 1
            }
        }

        for(let i = 0; i < amountWeeks; i++){
            SemanaText[i] = localStorage.getItem("SemanaText" + i)
        }

        for(let i = 0; i < amountWeeks; i++){
            if(i != 0){
                DiaText[i] = [[]]
            }
            for(let j = 0; j < amountDays[i]; j++){
                DiaText[i][j] = localStorage.getItem(`DiaText${i}${j}`)
            }
        }

        for(let i = 0; i < amountWeeks; i++){
            if(i != 0){
                amountEjerciciosDay[i] = []
            }
            for(let j = 0; j < amountDays[i]; j++){
                amountEjerciciosDay[i][j] = localStorage.getItem(`amountEjerciciosDay${i}${j}`)
            }
        }

        for(let i = 0; i < amountWeeks; i++){
            if(i != 0){
                textEjercicios[i] = [[]]
                textSeries[i] = [[]]
                textReps[i] = [[]]
                textRIR[i] = [[]]
            }
            for(let j = 0; j < amountDays[i]; j++){
                if(j != 0){
                    textEjercicios[i][j] = []
                    textSeries[i][j] = []
                    textReps[i][j] = []
                    textRIR[i][j] = []
                }
                for(let k = 0; k < amountEjerciciosDay[i][j]; k++){
                    textEjercicios[i][j][k] = localStorage.getItem(`textEjercicios${i}${j}${k}`)
                    textSeries[i][j][k] = localStorage.getItem(`textSeries${i}${j}${k}`)
                    textReps[i][j][k] = localStorage.getItem(`textReps${i}${j}${k}`)
                    textRIR[i][j][k] = localStorage.getItem(`textRIR${i}${j}${k}`)
                }
            }
        }
    }

    setTimeout(function (){
        if(FirstTime){
            LoadDaysLista()
            LoadDays()
        }
        if(!Again){
            document.querySelector('#loading').remove()
            document.querySelector('#DivSemanasLista').classList.remove('off')
        }
    }, 250)

}

/*function LoadData(FirstTime){

    amountWeeksLista = localStorage.getItem("amountWeeksLista")

    if(amountWeeksLista == null){
        amountWeeksLista = 1
    }

    for(let i = 0; i < amountWeeksLista; i++){
        amountDaysLista[i] = localStorage.getItem("amountDaysLista" + i)

        if(typeof amountDaysLista[i] == undefined){
            amountDaysLista[i] = 1
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        SemanaTextLista[i] = localStorage.getItem("SemanaTextLista" + i)
    }

    for(let i = 0; i < amountWeeksLista; i++){
        if(i != 0){
            DiaTextLista[i] = [[]]
        }
        for(let j = 0; j < amountDaysLista[i]; j++){
            DiaTextLista[i][j] = localStorage.getItem(`DiaTextLista${i}${j}`)
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        if(i != 0){
            amountEjerciciosDayLista[i] = []
        }
        for(let j = 0; j < amountDaysLista[i]; j++){
            amountEjerciciosDayLista[i][j] = localStorage.getItem(`amountEjerciciosDayLista${i}${j}`)
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        if(i != 0){
            textEjerciciosLista[i] = [[]]
            textSeriesLista[i] = [[]]
            textRepsLista[i] = [[]]
            textRIRLista[i] = [[]]
        }
        for(let j = 0; j < amountDaysLista[i]; j++){
            if(j != 0){
                textEjerciciosLista[i][j] = []
                textSeriesLista[i][j] = []
                textRepsLista[i][j] = []
                textRIRLista[i][j] = []
            }
            for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                //alert(localStorage.getItem(`textEjerciciosListaLista${i}${j}${k}`))
                textEjerciciosLista[i][j][k] = localStorage.getItem(`textEjerciciosLista${i}${j}${k}`)
                textSeriesLista[i][j][k] = localStorage.getItem(`textSeriesLista${i}${j}${k}`)
                textRepsLista[i][j][k] = localStorage.getItem(`textRepsLista${i}${j}${k}`)
                textRIRLista[i][j][k] = localStorage.getItem(`textRIRLista${i}${j}${k}`)
            }
        }
    }

    fetch(`https://api.github.com/gists/${gistId}`, {
        headers: {
            'Authorization': `token ${githubToken}`
          }
    })
    .then(response => response.json())
    .then(data => {
        // Accede al contenido del archivo en el Gist
        const gistContent = data.files['database.json'].content;
        var dataBaseLoad= JSON.parse(gistContent)

        amountWeeksLista = parseInt(dataBaseLoad.ListaRutinas.length)

        for(let i = 0; i < amountWeeksLista; i++){
            amountDaysLista[i] = parseInt(dataBaseLoad.ListaRutinas[i].CANTDIAS)
            console.log(amountDaysLista)
            SemanaTextLista[i] = dataBaseLoad.ListaRutinas[i].SEMANANAME

            if(typeof amountDaysLista[i] == undefined){
                amountDaysLista[i] = 1
            }

            if(i != 0){
                DiaTextLista[i] = [[]]
                amountEjerciciosDayLista[i] = []
            }
            for(let j = 0; j < amountDaysLista[i]; j++){
                DiaTextLista[i][j] = dataBaseLoad.ListaRutinas[i].DIASNAME[j]
                amountEjerciciosDayLista[i][j] = dataBaseLoad.ListaRutinas[i].CANTEJERCICIOSDIA[j]
            }
        }

        for(let i = 0; i < amountWeeksLista; i++){
            if(i != 0){
                textEjerciciosLista[i] = [[]]
                textSeriesLista[i] = [[]]
                textRepsLista[i] = [[]]
                textRIRLista[i] = [[]]
            }

            for(let j = 0; j < amountDaysLista[i]; j++){
                if(j != 0){
                    textEjerciciosLista[i][j] = []
                    textSeriesLista[i][j] = []
                    textRepsLista[i][j] = []
                    textRIRLista[i][j] = []
                }
                for(let k = 0; k < amountEjerciciosDayLista[i][j]; k++){
                    //alert(localStorage.getItem(`textEjerciciosListaLista${i}${j}${k}`))
                    textEjerciciosLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTEJERCICIO[j][k]
                    textSeriesLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTSERIES[j][k]
                    textRepsLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTREPS[j][k]
                    textRIRLista[i][j][k] = dataBaseLoad.ListaRutinas[i].TEXTRIR[j][k]
                }
            }
        }
        console.log(dataBaseLoad);
        console.log('data: ',amountWeeksLista)

    })
    .catch(error => console.error('Error:', error));


    console.log('data fuera: ',amountWeeksLista)


    if(FirstTime){
        LoadDaysLista()
    }
}*/

function LoadDaysLista(){

    if(SemanaTextLista[0] != null && SemanaTextLista[0] != "null"){
        document.querySelector('.PnlSemana').querySelector('input').value = SemanaTextLista[0]
        document.querySelector('.PnlSemana').querySelector('button').innerText = SemanaTextLista[0]
    }
    

    for(let i = 2; i <= amountWeeksLista; i++){
        AddWeekLista(document.querySelector('.AddWeek'), true, i)
    } 

    for(let i = 0; i <= amountWeeksLista; i++){
        for(let j = 2; j <= amountDaysLista[i]; j++){
            AddDaysLista(document.querySelectorAll('.PnlSemana')[i].querySelector('#BtnAddButtons'), true, j)
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        for(let j = 1; j < amountEjerciciosDayLista[i][0]; j++){
            AddEjercicio(document.querySelectorAll('.PnlSemana')[i].querySelector('#BtnAddEjercicios'), true, j)
        }
    }

    for(let i = 0; i < amountWeeksLista; i++){
        if(DiaTextLista[i][0] != null && DiaTextLista[i][0] != "null" && DiaTextLista[i][0] != undefined && DiaTextLista[i][0] != "undefined"){
            document.querySelectorAll('.PnlSemana')[i].querySelector('#divButtons[name="0"]').querySelector('input').value = DiaTextLista[i][0]
            document.querySelectorAll('.PnlSemana')[i].querySelector('#divButtons[name="0"]').querySelector('button').innerText = DiaTextLista[i][0]
        }
        
    }
}

var user
var pw
var recordar

document.getElementById('RegisterForm').addEventListener("submit", function (event) {
    event.preventDefault();
    
    const formData = new FormData(event.target)

    user = formData.get('user')
    pw = formData.get('pw')

    const encontrado = usersFormat.users.find(elemento => elemento === user);

    if (encontrado !== undefined) {
        document.getElementById('spanToast').innerHTML = '¡Ya existe ese usuario!'
        document.getElementById('liveToastBtn').click()
        console.log(`El valor ${user} fue encontrado en el array.`);
    } else {
        localStorage.setItem("user", user)
        localStorage.setItem("pw", pw)

        document.querySelector('#BtnRegister').setAttribute('data-bs-dismiss', 'modal')
        document.querySelector('#BtnRegister').click()
        
        console.log(user, pw)

        document.querySelector('.Popover').querySelector('.title').innerHTML = user + '<hr>'
        Logueado('Register')
        console.log(`El valor ${user} no fue encontrado en el array.`);
    }

    
})

document.getElementById('SignForm').addEventListener("submit", function (event) {
    event.preventDefault();
    
    const formData = new FormData(event.target)

    user = formData.get('user')
    pw = formData.get('pw')

    const encontrado = usersFormat.users.find(elemento => elemento === user);
    
    if (encontrado !== undefined) {
        console.log(`El valor ${user} fue encontrado en el array.`);

        const index = usersFormat.users.findIndex(elemento => elemento === user)
        const passwordUser = usersFormat.password[index]

        if(pw == passwordUser){
            localStorage.setItem("user", user)
            localStorage.setItem("pw", pw)
        
            console.log(user, pw)
        
            Logueado('SignUp')
        }
        else{
            document.getElementById('spanToast').innerHTML = 'La contraseña es incorrecta'
            document.getElementById('liveToastBtn').click()
        }
    } else {
        document.getElementById('spanToast').innerHTML = 'El usuario no existe'
        document.getElementById('liveToastBtn').click()
        console.log(`El valor ${user} no fue encontrado en el array.`);
    }

})

var logueado = false

var usersFormat = {
    users: [],
    password: []
}

function Logueado(Evento){
    document.getElementById('ButtonsSign').classList.add('off')
    document.getElementById('navAccount').classList.remove('off')
    logueado = true

    if(Evento == 'Register'){
        SaveData()
    
        usersFormat.users[amountUsers] = user
        usersFormat.password[amountUsers] = pw

        const usersJSON = JSON.stringify(usersFormat)

        fetch(`https://api.github.com/gists/${gistId}`, {
            method: "PATCH",
            headers: {
                Authorization: `token ${git1 + git2}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                files: {
                    "users.json": {
                    content: usersJSON
                    }
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Archivos agregados con éxito:", data);
        })
        .catch(error => console.error("Error:", error));
    }

    if(Evento == 'SignUp'){
        location.reload()
    }
}

function LogOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('pw')
    location.reload()
}

Popover = false

function AccountClick(){
    if (!Popover){
        Popover = !Popover
        document.querySelector('.Popover').classList.add('on')
    }
    else{
        Popover = !Popover
        document.querySelector('.Popover').classList.remove('on')
    }
}

function ShowBtnSeries(){
    let AllInputSeries = document.querySelectorAll('#InputSeries')

    console.log(AllInputSeries)
    for(let i = 0; i < AllInputSeries.length; i++){
        let NumberSeries = parseInt(AllInputSeries[i].value)
        let tdInput = AllInputSeries[i].closest('td')
        console.log(NumberSeries)
        if(NumberSeries > 1 && NumberSeries != undefined){
            tdInput.querySelector('#DivShowSeries').classList.add('on')
        }
        else if(tdInput.querySelector('#DivShowSeries').classList.contains('on')){
            tdInput.querySelector('#DivShowSeries').classList.remove('on')
        }
    }
}

function SeriesChanged(Input){
    let NumberSeries = parseInt(Input.value)
    let tdInput = Input.closest('td')
    console.log(tdInput)
    if(NumberSeries > 1){
        tdInput.querySelector('#DivShowSeries').classList.add('on')
    }
    else{
        tdInput.querySelector('#DivShowSeries').classList.remove('on')
    }
}

var SeriesShown = false

function ShowSeries(Button){
    let trBook = Button.closest('tr')

    if(trBook.querySelector('#BtnRetractSeries').classList.contains('off')){
        let SingleTrBook = trBook.cloneNode(true)

        trBook.querySelector('#BtnExpandSeries').classList.add('off')
        trBook.querySelector('#BtnRetractSeries').classList.remove('off')

        let InputSeries = trBook.querySelector('#InputSeries')
        let InputReps = trBook.querySelector('#InputReps')
        let InputPeso = trBook.querySelector('#InputPeso')
        let InputRIR = trBook.querySelector('#InputRIR')

        if(InputReps.value.includes('/')){
            var NumberRepsMoreSeries = InputReps.value.split('/')
        }

        if(InputPeso.value.includes('/')){
            var NumberPesoMoreSeries = InputPeso.value.split('/')
        }

        if(InputRIR.value.includes('/')){
            var NumberRIRMoreSeries = InputRIR.value.split('/')
        }

        for (let i = 0; i < InputSeries.value; i++){
    
            let NewTrBook = SingleTrBook.cloneNode(true)
    
            NewTrBook.querySelector('#InputExcercise').remove()
            NewTrBook.querySelector('#DivShowSeries').remove()
            NewTrBook.querySelector('#MoreSeries').remove()
    
            NewTrBook.classList.remove('trBookEjercicio')
            NewTrBook.classList.add('trMoreSeries')
            NewTrBook.setAttribute('name', `${i}`)
            NewTrBook.querySelector('#InputSeries').value = i + 1 + '°'
            NewTrBook.querySelector('#InputSeries').readOnly = true
            NewTrBook.querySelector('#InputSeries').classList.add('readOnly')
            NewTrBook.querySelector('#InputReps').setAttribute('oninput', 'MoreSeriesTextChanged(this)')
            NewTrBook.querySelector('#InputPeso').setAttribute('oninput', 'MoreSeriesTextChanged(this)')
            NewTrBook.querySelector('#InputRIR').setAttribute('oninput', 'MoreSeriesTextChanged(this)')

            if(i == 0){
                NewTrBook.classList.add('margintop')
            }
    
            if(i == (parseInt(InputSeries.value) - 1)){
                NewTrBook.classList.add('nomarginbottom')
            }

            if(InputReps.value.includes('/')){
                if(NumberRepsMoreSeries[i] == undefined){
                    NumberRepsMoreSeries[i] = ''
                }
                NewTrBook.querySelector('#InputReps').value = NumberRepsMoreSeries[i]
            }

            if(InputPeso.value.includes('/')){
                if(NumberPesoMoreSeries[i] == undefined){
                    NumberPesoMoreSeries[i] = ''
                }
                NewTrBook.querySelector('#InputPeso').value = NumberPesoMoreSeries[i]
            }

            if(InputRIR.value.includes('/')){
                if(NumberRIRMoreSeries[i] == undefined){
                    NumberRIRMoreSeries[i] = ''
                }
                NewTrBook.querySelector('#InputRIR').value = NumberRIRMoreSeries[i]
            }
    
            trBook.querySelector('#MoreSeries').appendChild(NewTrBook)
        }
    }
    else{
        trBook.querySelector('#BtnExpandSeries').classList.remove('off')
        trBook.querySelector('#BtnRetractSeries').classList.add('off')

        let tdMoreSeries = trBook.querySelector('#MoreSeries')

        while(tdMoreSeries.firstChild){
            tdMoreSeries.removeChild(tdMoreSeries.firstChild)
        }
    }
}

function MoreSeriesTextChanged(Input){
    if(Input.id == 'InputReps'){
        TextoCambiado = true
        let MoreSeries = Input.closest('#MoreSeries')
        let NumberReps = []
        let IHaveToJoin = false

        for(let i = 0; i < MoreSeries.childElementCount; i++){
            let trMoreSeries = MoreSeries.querySelectorAll('.trMoreSeries')[i]
            let InputReps = trMoreSeries.querySelector('#InputReps')
            NumberReps[i] = InputReps.value

            if(NumberReps[0] != NumberReps[i]){
                IHaveToJoin = true
            }
        }

        if(IHaveToJoin == true){
            let NumberRepsOneLine = NumberReps.join('/')
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputReps').value = NumberRepsOneLine
        }
        else{
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputReps').value = NumberReps[0]
        }

        while (NumberReps[NumberReps.length - 1] == '') {
            NumberReps.pop();
            
            if(IHaveToJoin == true){
                let NumberRepsOneLine = NumberReps.join('/')
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputReps').value = NumberRepsOneLine
            }
            else{
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputReps').value = NumberReps[0]
            }
        }
        
        if(Input.closest('tr').closest('td').classList.contains('Book')){
            TextChangedB(Input.closest('.trBookEjercicio').querySelector('#InputReps'), 'Reps')
        }
        else{
            TextChanged(Input.closest('.trBookEjercicio').querySelector('#InputReps'), 'Reps')
        }
    }

    if(Input.id == 'InputPeso'){
        let MoreSeries = Input.closest('#MoreSeries')
        let NumberPeso = []
        let IHaveToJoin = false

        for(let i = 0; i < MoreSeries.childElementCount; i++){
            let trMoreSeries = MoreSeries.querySelectorAll('.trMoreSeries')[i]
            let InputPeso = trMoreSeries.querySelector('#InputPeso')
            NumberPeso[i] = InputPeso.value

            if(NumberPeso[0] != NumberPeso[i]){
                IHaveToJoin = true
            }
        }

        if(IHaveToJoin == true){
            let NumberPesoOneLine = NumberPeso.join('/')
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputPeso').value = NumberPesoOneLine
        }
        else{
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputPeso').value = NumberPeso[0]
        }

        while (NumberPeso[NumberPeso.length - 1] == '') {
            NumberPeso.pop();
            
            if(IHaveToJoin == true){
                let NumberPesoOneLine = NumberPeso.join('/')
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputPeso').value = NumberPesoOneLine
            }
            else{
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputPeso').value = NumberPeso[0]
            }
        }
    
        if(Input.closest('tr').closest('td').classList.contains('Book')){
            TextChangedB(Input.closest('.trBookEjercicio').querySelector('#InputPeso'), 'Peso')
        }
        else{
            TextChanged(Input.closest('.trBookEjercicio').querySelector('#InputPeso'), 'Peso')
        }
    }

    if(Input.id == 'InputRIR'){
        let MoreSeries = Input.closest('#MoreSeries')
        let NumberRIR = []
        let IHaveToJoin = false
        
        for(let i = 0; i < MoreSeries.childElementCount; i++){
            let trMoreSeries = MoreSeries.querySelectorAll('.trMoreSeries')[i]
            let InputRIR = trMoreSeries.querySelector('#InputRIR')
            NumberRIR[i] = InputRIR.value

            if(NumberRIR[0] != NumberRIR[i]){
                IHaveToJoin = true
            }
        }

        if(IHaveToJoin == true){
            let NumberRIROneLine = NumberRIR.join('/')
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputRIR').value = NumberRIROneLine
        }
        else{
            let trBookEjercicio = Input.closest('.trBookEjercicio')
            trBookEjercicio.querySelector('#InputRIR').value = NumberRIR[0]
        }

        while (NumberRIR[NumberRIR.length - 1] == '') {
            NumberRIR.pop();
            
            if(IHaveToJoin == true){
                let NumberRIROneLine = NumberRIR.join('/')
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputRIR').value = NumberRIROneLine
            }
            else{
                let trBookEjercicio = Input.closest('.trBookEjercicio')
                trBookEjercicio.querySelector('#InputRIR').value = NumberRIR[0]
            }
        }
    
        if(Input.closest('tr').closest('td').classList.contains('Book')){
            TextChangedB(Input.closest('.trBookEjercicio').querySelector('#InputRIR'), 'RIR')
        }
        else{
            TextChanged(Input.closest('.trBookEjercicio').querySelector('#InputRIR'), 'RIR')
        }
    }
}

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

const container = document.getElementById('calendar');