function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

const gistId = 'ea76aea67dfe233b31662624d6d9cc43'; 
//const git1 = 'github_pat_11A7P7C2I0fyFzvkezKokP_GYWSYgR7c0'
//const git2 = 'F5UpMP7RspnfwYSn9VUPvOeRK3TFTdRoGI2GFFLILb73RRdcL'
const git1 = 'ghp_4hEcWsmThTfnjLqBY5Vu'
const git2 = '4L76Z4mbJI0ZZWfo'

var amountWeeksLista = 1
var amountEjerciciosDayLista = [/*Semana 1*/ [1 /*Dia1*/]]
var amountDaysLista = [1/*Semana1*/]
var SemanaTextLista = []
var DiaTextLista = [[]]
var textEjerciciosLista =    [/* Semana */[/*Dia 1*/[""/*1er Ejercicio*/]]]
var textSeriesLista =        [/* Semana */[/*Dia 1*/[""/*1er Series*/]]]
var textRepsLista =          [/* Semana */[/*Dia 1*/[""/*1er Reps*/]]]
var textPesoLista =          [/* Semana */[/*Dia 1*/[""/*1er Peso*/]]]
var textRIRLista =           [/* Semana */[/*Dia 1*/[""/*1er RIR*/]]]
var TextoCambiadoLista = false

var amountWeeksBook = 1
var amountEjerciciosDayBook = [/*Semana 1*/ [1 /*Dia1*/]]
var amountDaysBook = [1/*Semana1*/]
var SemanaTextBook = []
var DiaTextBook = [[]]
var textEjerciciosBook =    [/* Semana */[/*Dia 1*/[""/*1er Ejercicio*/]]]
var textSeriesBook =        [/* Semana */[/*Dia 1*/[""/*1er Series*/]]]
var textRepsBook =          [/* Semana */[/*Dia 1*/[""/*1er Reps*/]]]
var textPesoBook =          [/* Semana */[/*Dia 1*/[""/*1er Peso*/]]]
var textRIRBook =           [/* Semana */[/*Dia 1*/[""/*1er RIR*/]]]
var TextoCambiadoBook = false

var edit = false
var slide = true
var pase
var SeriesShown = false

var usuarios = []
var contraseñas = []
var amountUsers
var user
var pw
var recordar
var logueado = false
var SyncLists = false

Popover = false
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
const container = document.getElementById('calendar');

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    LoadData(true, false);
    SlideDivButtons()
});

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

function ButtonSemanaSlide(Button, SectionPage){
    let divSemana = Button.closest('div')
    let pnlSemana = divSemana.querySelector('.SectionTable')

    if(pnlSemana.classList.contains('on')){
        pnlSemana.classList.remove('on')
    }
    else{
        pnlSemana.classList.add('on')
    }

    ButtonClick(pnlSemana.querySelector('#divButtons').querySelector('button'), SectionPage)
}

function ButtonClick(Button, SectionPage){

    let textEjercicios, textSeries, textReps, textPeso, textRIR, amountEjerciciosDay

    if (SectionPage == "Lists") {
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
        amountEjerciciosDay = amountEjerciciosDayLista
    }
    else if (SectionPage == "Book") {
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
        amountEjerciciosDay = amountEjerciciosDayBook
    }

    let divDivButton = Button.closest('#divDivButtons')
    let NowOn = divDivButton.querySelector('.on')

    NowOn.classList.remove('on')
    Button.classList.add('on')

    let divButtons = Button.closest('div')
    let tbody = Button.closest('.Week').querySelector('.tbodyBook')
    let ButtonAdd = Button.closest('.Week').querySelector('.btnAdd')
    let ButtonDelete = Button.closest('.Week').querySelector('.btnDelete')

    let Week = Button.closest('.Week').getAttribute('name')
    let Day = divButtons.getAttribute('name')

    let NumberExcercisesActual = tbody.children.length - 1
    let NumberExcercisesAfter =  amountEjerciciosDay[Week][Day]

    let AllBtnRetractSeries = Button.closest('.Week').querySelectorAll('#BtnRetractSeries')
    
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
            AddEjercicio(ButtonAdd, true, SectionPage)
        }
    }
    else if(NumberExcercisesActual > NumberExcercisesAfter){
        let Diferencia = NumberExcercisesActual - NumberExcercisesAfter
        for(let i = 0; i < Diferencia; i++){
            DeleteEjercicio(ButtonDelete, true, SectionPage)
        }
    }

    let AllTextInputExcercise = tbody.querySelectorAll('#InputExcercise')
    let AllTextInputSeries = tbody.querySelectorAll('#InputSeries')
    let AllTextInputReps = tbody.querySelectorAll('#InputReps')
    let AllTextInputPeso = tbody.querySelectorAll('#InputPeso')
    let AllTextInputRIR = tbody.querySelectorAll('#InputRIR')

    for(let i = 0; i < NumberExcercisesAfter; i++){

        if(textEjercicios[Week][Day][i] == "null"){
            textEjercicios[Week][Day][i] = ""
        }
        if(textSeries[Week][Day][i] == "null"){
            textSeries[Week][Day][i] = ""
        }
        if(textReps[Week][Day][i] == "null"){
            textReps[Week][Day][i] = ""
        }
        if(textPeso[Week][Day][i] == "null"){
            textPeso[Week][Day][i] = ""
        }
        if(textRIR[Week][Day][i] == "null"){
            textRIR[Week][Day][i] = ""
        }

        AllTextInputExcercise[i].value = textEjercicios[Week][Day][i]
        AllTextInputSeries[i].value = textSeries[Week][Day][i]
        AllTextInputReps[i].value = textReps[Week][Day][i]
        AllTextInputPeso[i].value = textPeso[Week][Day][i]
        AllTextInputRIR[i].value = textRIR[Week][Day][i]
    }
    
    ShowBtnSeries()
    //SaveData()
}

function AddWeeks(Button, Load, i, SectionPage){

    let amountWeeks, amountDays, SemanaText, DiaText, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

    if (SectionPage == "Lists") {
        amountWeeks = amountWeeksLista
        amountDays = amountDaysLista
        SemanaText = SemanaTextLista
        DiaText = DiaTextLista
        amountEjerciciosDay = amountEjerciciosDayLista
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
    }
    else if (SectionPage == "Book") {
        amountWeeks = amountWeeksBook
        amountDays = amountDaysBook
        SemanaText = SemanaTextBook
        DiaText = DiaTextBook
        amountEjerciciosDay = amountEjerciciosDayBook
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
    }

    if(Load == false){
        amountWeeks++
    }
    
    let divSectionPage = Button.closest('.SectionPage')
    let divPage = divSectionPage.querySelector('.DivAllWeeks')
    let divWeek = divPage.querySelectorAll('.Week')
    let NewDivWeek = divWeek[divWeek.length - 1].cloneNode(true)
    let BtnSlide = NewDivWeek.querySelector('#BtnSemanaSlide')
    let SpanSlide = NewDivWeek.querySelector('#LabelSemana')
    let AmountDays = NewDivWeek.querySelector('#divDivButtons').children.length - 1
    let DivShowSeries = NewDivWeek.querySelector('#DivShowSeries')
    DivShowSeries.classList.remove('on')

    if(Load == true){
        if(SemanaText[i - 1] != "" || SemanaText[i - 1] != undefined || SemanaText[i - 1] != null){    
            BtnSlide.innerText = SemanaText[i - 1]
            SpanSlide.value = SemanaText[i - 1]
        }
        NewDivWeek.setAttribute('name', (i - 1))
        divPage.insertBefore(NewDivWeek, divPage.childNodes[(i + 2)])
    }
    else{
        BtnSlide.innerText = "Semana " + amountWeeks
        SpanSlide.textContent = "Semana " + amountWeeks
        NewDivWeek.setAttribute('name', (amountWeeks - 1))
        

        amountDays[amountWeeks - 1] = AmountDays + 1
        amountEjerciciosDay[amountWeeks - 1] = []
        textEjercicios[amountWeeks - 1] = []
        textSeries[amountWeeks - 1] = []
        textReps[amountWeeks - 1] = []
        textPeso[amountWeeks - 1] = []
        textRIR[amountWeeks - 1] = []
        DiaText[amountWeeks - 1] = [[]]
        SemanaText[amountWeeks - 1] = "Semana " + amountWeeks
    
        for(let i = 0; i <= AmountDays; i++){
            amountEjerciciosDay[amountWeeks - 1][i] = "1"
            textEjercicios[amountWeeks - 1][i] = [""]
            textSeries[amountWeeks - 1][i] = [""]
            textReps[amountWeeks - 1][i] = [""]
            textPeso[amountWeeks - 1][i] = [""]
            textRIR[amountWeeks - 1][i] = [""]
            DiaText[amountWeeks - 1][i] = NewDivWeek.querySelectorAll('#divButtons')[i].querySelector('input').value
        }

        divPage.insertBefore(NewDivWeek, divPage.childNodes[(amountWeeks + 2)])

        if(SectionPage == "Lists"){
            amountWeeksLista = amountWeeks
            amountDaysLista = amountDays
            SemanaTextLista = SemanaText
            DiaTextLista = DiaText
            amountEjerciciosDayLista = amountEjerciciosDay
            textEjerciciosLista = textEjercicios
            textSeriesLista = textSeries
            textRepsLista = textReps
            textPesoLista = textPeso
            textRIRLista = textRIR
        }
        else if(SectionPage == "Book"){
            amountWeeksBook = amountWeeks
            amountDaysBook = amountDays
            SemanaTextBook = SemanaText
            DiaTextBook = DiaText
            amountEjerciciosDayBook = amountEjerciciosDay
            textEjerciciosBook = textEjercicios
            textSeriesBook = textSeries
            textRepsBook = textReps
            textPesoBook = textPeso
            textRIRBook = textRIR
        }
        
        ButtonClick(NewDivWeek.querySelector('#divDivButtons').querySelector('.on'), SectionPage)
        SaveData()
    }
    SlideDivButtons()
}

function DeleteWeeks(Button, SectionPage){
    
    let amountWeeks, amountDays, DiaText, IDPage, Page, dataBasePage, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

    if (SectionPage == "Lists") {
        amountWeeks = amountWeeksLista
        amountDays = amountDaysLista
        DiaText = DiaTextLista
        amountEjerciciosDay = amountEjerciciosDayLista
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
        dataBasePage = dataBase.ListaRutinas
        Page = 'Lista'
        IDPage = '#pagerutinas'
    }
    else if (SectionPage == "Book") {
        amountWeeks = amountWeeksBook
        amountDays = amountDaysBook
        DiaText = DiaTextBook
        amountEjerciciosDay = amountEjerciciosDayBook
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
        dataBasePage = dataBase.ListaBook
        Page = 'Book'
        IDPage = '#pagebook'
    }

    if(amountWeeks > 1){
        amountWeeks--
        localStorage.removeItem("amountDays" + Page + amountWeeks)

        for(let i = 0; i < amountDays[amountWeeks]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Page}${amountWeeks}${i}`)
            for(let j = 0; j < amountEjerciciosDay[amountWeeks][i]; j++){
                localStorage.removeItem(`textEjercicios${Page}${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textSeries${Page}${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textReps${Page}${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textRIR${Page}${amountWeeks}${i}${j}`)
            }
        }
    
        amountDays[amountWeeks] = "1"
        amountEjerciciosDay.splice(amountWeeks, 1)
        textEjercicios.splice(amountWeeks, 1)
        textSeries.splice(amountWeeks, 1)
        textReps.splice(amountWeeks, 1)
        textPeso.splice(amountWeeks, 1)
        textRIR.splice(amountWeeks, 1)
        DiaText.splice(amountWeeks, 1)
        dataBasePage.splice(amountWeeks, 1)
        pase = Math.random()

        if(SectionPage == "Lists"){
            amountWeeksLista = amountWeeks
            amountDaysLista = amountDays
            DiaTextLista = DiaText
            amountEjerciciosDayLista = amountEjerciciosDay
            textEjerciciosLista = textEjercicios
            textSeriesLista = textSeries
            textRepsLista = textReps
            textPesoLista = textPeso
            textRIRLista = textRIR
        }
        else if(SectionPage == "Book"){
            amountWeeksBook = amountWeeks
            amountDaysBook = amountDays
            DiaTextBook = DiaText
            amountEjerciciosDayBook = amountEjerciciosDay
            textEjerciciosBook = textEjercicios
            textSeriesBook = textSeries
            textRepsBook = textReps
            textPesoBook = textPeso
            textRIRBook = textRIR
        }

        SaveData()

        let divSectionPage = Button.closest(`${IDPage}`)
        let divAllWeeks = divSectionPage.querySelector('.DivAllWeeks')

        divAllWeeks.removeChild(divAllWeeks.children[(amountWeeks)])
    }
}

function AddDays(Button, Load, j, SectionPage){
    let tr = Button.closest('tr')
    let th = tr.querySelector('th')
    let semana = Button.closest('.Week')
    let Week = semana.getAttribute('name')
    let addButton = Button.closest('#divAdd')
    
    let amountDays, DiaText, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

    if (SectionPage == "Lists") {
        amountDays = amountDaysLista
        DiaText = DiaTextLista
        amountEjerciciosDay = amountEjerciciosDayLista
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
    }
    else if (SectionPage == "Book") {
        amountDays = amountDaysBook
        DiaText = DiaTextBook
        amountEjerciciosDay = amountEjerciciosDayBook
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
    }

    if(amountDays[Week] < 7 || Load == true){
        if(Load == false){
            amountDays[Week]++
            DiaText[Week][amountDays[Week] - 1] = `Dia ${amountDays[Week]}`
            amountEjerciciosDay[Week][amountDays[Week] - 1] = 1
            textEjercicios[Week][amountDays[Week] - 1] = [""]
            textSeries[Week][amountDays[Week] - 1] = [""]
            textReps[Week][amountDays[Week] - 1] = [""]
            textPeso[Week][amountDays[Week] - 1] = [""]
            textRIR[Week][amountDays[Week] - 1] = [""]

            if(SectionPage == "Lists"){
                amountDaysLista = amountDays
                DiaTextLista = DiaText
                amountEjerciciosDayLista = amountEjerciciosDay
                textEjerciciosLista = textEjercicios
                textSeriesLista = textSeries
                textRepsLista = textReps
                textPesoLista = textPeso
                textRIRLista = textRIR
            }
            else if(SectionPage == "Book"){
                amountDaysBook = amountDays
                DiaTextBook = DiaText
                amountEjerciciosDayBook = amountEjerciciosDay
                textEjerciciosBook = textEjercicios
                textSeriesBook = textSeries
                textRepsBook = textReps
                textPesoBook = textPeso
                textRIRBook = textRIR
            }

            SaveData()
        }

        if(amountDays[Week] == 2 && Load == false){
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

        if(amountDays[Week] == 7){
            NewDivBtn.querySelector('#divAdd').classList.add("off")
            NewDivBtn.querySelector('#divDelete').classList.remove("last")
        }
        
        if(Load == true){
            NewDivBtn.setAttribute('name', (j - 1))
            Btn.innerText = DiaText[Week][j - 1]
            SpanBtn.value = DiaText[Week][j - 1]
        }
        else{
            NewDivBtn.setAttribute('name', (amountDays[Week] - 1))
            Btn.innerText = "Dia " + amountDays[Week]
            SpanBtn.value = "Dia " + amountDays[Week]
            DiaText[Week][amountDays[Week] - 1] = "Dia " + amountDays[Week]
        }

        th.appendChild(NewDivBtn)
        //th.insertBefore(NewDivBtn, th.children[(NumTrChilds)])
    }
}

function DeleteDays(Button, SectionPage){
    let Week = Button.closest('.Week').getAttribute('name')
    
    let amountDays, DiaText, Page, dataBasePage, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

    if (SectionPage == "Lists") {
        amountDays = amountDaysLista
        DiaText = DiaTextLista
        amountEjerciciosDay = amountEjerciciosDayLista
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
        Page = 'Lista'
        dataBasePage = dataBase.ListaRutinas
    }
    else if (SectionPage == "Book") {
        amountDays = amountDaysBook
        DiaText = DiaTextBook
        amountEjerciciosDay = amountEjerciciosDayBook
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
        Page = 'Book'
        dataBasePage = dataBase.ListaBook
    }

    if(amountDays[Week] > 1){
        let div = Button.closest('#divButtons')
        let Day = parseInt(div.getAttribute('name'))
        amountDays[Week]--

        for(let i = 0; i < amountEjerciciosDay[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Page}${Week}${Day}${i}`)
            localStorage.removeItem(`textEjercicios${Page}${Week}${Day}${i}`)
            localStorage.removeItem(`textSeries${Page}${Week}${Day}${i}`)
            localStorage.removeItem(`textReps${Page}${Week}${Day}${i}`)
            localStorage.removeItem(`textRIR${Page}${Week}${Day}${i}`)
            localStorage.removeItem(`DiaText${Page}${Week}${Day}${i}`)
        }

        for(let i = 0; i < amountEjerciciosDay[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Page}${Week}${amountDays}${i}`)
            localStorage.removeItem(`textEjercicios${Page}${Week}${amountDays}${i}`)
            localStorage.removeItem(`textSeries${Page}${Week}${amountDays}${i}`)
            localStorage.removeItem(`textReps${Page}${Week}${amountDays}${i}`)
            localStorage.removeItem(`textRIR${Page}${Week}${amountDays}${i}`)
            localStorage.removeItem(`DiaText${Page}${Week}${amountDays}${i}`)
        }

        amountEjerciciosDay[Week].splice(Day, 1)
        textEjercicios[Week].splice(Day, 1)
        textSeries[Week].splice(Day, 1)
        textReps[Week].splice(Day, 1)
        textPeso[Week].splice(Day, 1)
        textRIR[Week].splice(Day, 1)
        DiaText[Week].splice(Day, 1)
        dataBasePage[Week].DIASNAME.splice(Day, 1)
        dataBasePage[Week].CANTEJERCICIOSDIA.splice(Day, 1)
        dataBasePage[Week].TEXTEJERCICIO.splice(Day, 1)
        dataBasePage[Week].TEXTSERIES.splice(Day, 1)
        dataBasePage[Week].TEXTREPS.splice(Day, 1)
        dataBasePage[Week].TEXTPESO.splice(Day, 1)
        dataBasePage[Week].TEXTRIR.splice(Day, 1)

        if(SectionPage == "Lists"){
            amountDaysLista = amountDays
            DiaTextLista = DiaText
            amountEjerciciosDayLista = amountEjerciciosDay
            textEjerciciosLista = textEjercicios
            textSeriesLista = textSeries
            textRepsLista = textReps
            textPesoLista = textPeso
            textRIRLista = textRIR
        }
        else if(SectionPage == "Book"){
            amountDaysBook = amountDays
            DiaTextBook = DiaText
            amountEjerciciosDayBook = amountEjerciciosDay
            textEjerciciosBook = textEjercicios
            textSeriesBook = textSeries
            textRepsBook = textReps
            textPesoBook = textPeso
            textRIRBook = textRIR
        }

        SaveData()

        let divDivButtons = Button.closest('#divDivButtons')
        let divButtons = divDivButtons.querySelectorAll('#divButtons')
        let numberDay = Button.closest('#divButtons').getAttribute('name')

        for(let i = numberDay; i < divDivButtons.children.length; i++){
            divButtons[i].setAttribute('name', (i - 1))
        }

        if(amountDays[Week] == 1){
            divDivButtons.querySelector('.buttonLabelDay').classList.add('deleteOff')
            divDivButtons.querySelector('#BtnDeleteButtons').classList.add('off')
        }

        div.remove()
        
        let lastAddButton = divDivButtons.querySelectorAll('#divAdd')[divDivButtons.children.length - 1]
        lastAddButton.classList.remove('off')

        if(amountDays[Week] > 1){
            divDivButtons.querySelectorAll('#divDelete')[divDivButtons.children.length - 1].classList.add('last')
        }

        if(amountDays[Week] == 6){
            let addButtons = divDivButtons.querySelectorAll('#divAdd')
            let addButton = addButtons[addButtons.length - 1]
            addButton.classList.remove("off")
        }

        let Buttons = divDivButtons.querySelectorAll('#divButtons')
        let FirstButton = Buttons[0].querySelector('button')
        FirstButton.classList.add('on')
        ButtonClick(FirstButton, "Lists")
    }
}

function AddEjercicio(Button, Load, j, SectionPage){
    let Week = Button.closest('.Week').getAttribute('name')
    let Day = Button.closest('.Week').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    let textEjercicios, textSeries, textReps, textPeso, textRIR, amountEjerciciosDay

    if (SectionPage == "Lists") {
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
        amountEjerciciosDay = amountEjerciciosDayLista
    }
    else if (SectionPage == "Book") {
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
        amountEjerciciosDay = amountEjerciciosDayBook
    }

    if(Load == false){
        textEjercicios[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textSeries[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textReps[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textPeso[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textRIR[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        amountEjerciciosDay[Week][Day]++
        
        if(SectionPage == "Lists"){
            amountEjerciciosDayLista = amountEjerciciosDay
            textEjerciciosLista = textEjercicios
            textSeriesLista = textSeries
            textRepsLista = textReps
            textPesoLista = textPeso
            textRIRLista = textRIR
        }
        else if(SectionPage == "Book"){
            amountEjerciciosDayBook = amountEjerciciosDay
            textEjerciciosBook = textEjercicios
            textSeriesBook = textSeries
            textRepsBook = textReps
            textPesoBook = textPeso
            textRIRBook = textRIR
        }
        SaveData()
    }

    let divSemana = Button.closest('.Week')
    let tBody = divSemana.querySelector('.tbodyBook')
    let trEjercicio = tBody.querySelector('.trBookEjercicio')
    let NewTrEjercicio = trEjercicio.cloneNode(true)
    let DivShowSeries = NewTrEjercicio.querySelector('#DivShowSeries')
    DivShowSeries.classList.remove('on')

    if(Load == true){
        NewTrEjercicio.setAttribute('name', (j))
        tBody.appendChild(NewTrEjercicio)
    }
    else{
        NewTrEjercicio.setAttribute('name', (amountEjerciciosDay[Week][Day] - 1))
        tBody.appendChild(NewTrEjercicio)
        ButtonClick(divSemana.querySelector('#divDivButtons').querySelector('.on'), SectionPage)
    }
}

function DeleteEjercicio(Button, Load, SectionPage){
    let Week = Button.closest('.Week').getAttribute('name')
    let Day = Button.closest('.Week').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    let textEjercicios, textSeries, textReps, textPeso, textRIR, amountEjerciciosDay, dataBaseSectionPage

    if (SectionPage == "Lists") {
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
        amountEjerciciosDay = amountEjerciciosDayLista
        dataBaseSectionPage = dataBase.ListaRutinas
    }
    else if (SectionPage == "Book") {
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
        amountEjerciciosDay = amountEjerciciosDayBook
        dataBaseSectionPage = dataBase.ListaBook
    }

    if(amountEjerciciosDay[Week][Day] > 1 || Load == true){
        if(Load == false){
            amountEjerciciosDay[Week][Day]--
            textEjercicios[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textSeries[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textReps[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textRIR[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            dataBaseSectionPage[Week].TEXTEJERCICIO[Day].splice(amountEjerciciosDay[Week][Day], 1)
            dataBaseSectionPage[Week].TEXTSERIES[Day].splice(amountEjerciciosDay[Week][Day], 1)
            dataBaseSectionPage[Week].TEXTREPS[Day].splice(amountEjerciciosDay[Week][Day], 1)
            dataBaseSectionPage[Week].TEXTRIR[Day].splice(amountEjerciciosDay[Week][Day], 1)

            localStorage.removeItem(`textEjerciciosLista${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textSeriesLista${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textRepsLista${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textRIRLista${Week}${Day}${amountEjerciciosDay[Week][Day]}`)

                
            if(SectionPage == "Lists"){
                amountEjerciciosDayLista = amountEjerciciosDay
                textEjerciciosLista = textEjercicios
                textSeriesLista = textSeries
                textRepsLista = textReps
                textPesoLista = textPeso
                textRIRLista = textRIR
            }
            else if(SectionPage == "Book"){
                amountEjerciciosDayBook = amountEjerciciosDay
                textEjerciciosBook = textEjercicios
                textSeriesBook = textSeries
                textRepsBook = textReps
                textPesoBook = textPeso
                textRIRBook = textRIR
            }

            SaveData()
        }
        let divSemana = Button.closest('.Week')
        let tBody = divSemana.querySelector('.tbodyBook')
        tBody.removeChild(tBody.lastChild)
    }
}

function EditButtons(Button, SectionPage){
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

    let amountDays

    if (SectionPage == "Lists") {
        amountDays = amountDaysLista
    }
    else if (SectionPage == "Book") {
        amountDays = amountDaysBook
    }

    if(edit == false){
        labelSemana.classList.remove('off')
        btnSlideSemana.classList.add('off')

        for(let i = 0; i < (labelDays.length); i++){
            labelDays[i].classList.remove('off')
            btnDays[i].classList.add('off')
        }


        if(amountDays[Week] > 1){
            for(let i = 0; i <= (btnDays.length - 1); i++){
                btnDelete[i].classList.remove('off')
                labelDays[i].classList.remove('deleteOff')
            }
        }

        if(amountDays[Week] < 7){
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

        if (SectionPage == "Lists") {
            amountDaysLista = amountDays
        }
        else if (SectionPage == "Book") {
            amountDaysBook = amountDays

        }

        SaveData()
        edit = false
    }
}

function EditText(TextInput, event){
    event.preventDefault()
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    Btn.innerText = TextInput.textContent
}

function EditTextSpan(TextInput, Type, SectionPage){
    let Week = TextInput.closest('.Week').getAttribute('name')
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    
    let SemanaText, DiaText

    if (SectionPage == "Lists") {
        SemanaText = SemanaTextLista
        DiaText = DiaTextLista
    }
    else if (SectionPage == "Book") {
        SemanaText = SemanaTextBook
        DiaText = DiaTextBook
    }

    if(Type == "Semana"){
        Btn.innerText = TextInput.value
        SemanaText[Week] = TextInput.value
    } else
    if(Type == "Dia"){
        Btn.innerText = TextInput.value
        let Day = TextInput.closest('div').getAttribute('name')
        DiaText[Week][Day] = TextInput.value
    }

    if (SectionPage == "Lists") {
        SemanaTextLista = SemanaText
        DiaTextLista = DiaText
    }
    else if (SectionPage == "Book") {
        SemanaTextBook = SemanaText
        DiaTextBook = DiaText
    }
}

function TextChanged(TextInput, Type, SectionPage){
    let Week = TextInput.closest('#semana').getAttribute('name')
    let Day = TextInput.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    let ExerciseID = TextInput.closest('tr').getAttribute('name')

    let TextoCambiado, textEjercicios, textSeries, textReps, textPeso, textRIR

    if (SectionPage == "Lists") {
        TextoCambiado = TextoCambiadoLista
        textEjercicios = textEjerciciosLista
        textSeries = textSeriesLista
        textReps = textRepsLista
        textPeso = textPesoLista
        textRIR = textRIRLista
    }
    else if (SectionPage == "Book") {
        TextoCambiado = TextoCambiadoBook
        textEjercicios = textEjerciciosBook
        textSeries = textSeriesBook
        textReps = textRepsBook
        textPeso = textPesoBook
        textRIR = textRIRBook
    }

    TextoCambiado = true

    if(Type == "Ejercicio"){
        textEjercicios[Week][Day][ExerciseID] = TextInput.value
    }

    if(Type == "Series"){
        textSeries[Week][Day][ExerciseID] = TextInput.value
        SeriesChanged(TextInput)
    }

    if(Type == "Reps"){
        textReps[Week][Day][ExerciseID] = TextInput.value
    }

    if(Type == "RIR"){
        textRIR[Week][Day][ExerciseID] = TextInput.value
    }

    if(Type == 'Peso'){
        textPeso[Week][Day][ExerciseID] = TextInput.value
    }

    if(SectionPage == "Lists"){
        TextoCambiadoLista = TextoCambiado
        textEjerciciosLista = textEjercicios
        textSeriesLista = textSeries
        textRepsLista = textReps
        textPesoLista = textPeso
        textRIRLista = textRIR
    }
    else if(SectionPage == "Book"){
        TextoCambiadoBook = TextoCambiado
        textEjerciciosBook = textEjercicios
        textSeriesBook = textSeries
        textRepsBook = textReps
        textPesoBook = textPeso
        textRIRBook = textRIR
    }
}

function BlurData(SectionPage){
    if(SectionPage == "Lists"){
        if(TextoCambiadoLista == true){
            TextoCambiadoLista = false
            SaveData()
        }
    }
    else if(SectionPage == "Book"){
        if(TextoCambiadoBook == true){
            TextoCambiadoBook = false
            SaveData()
        }
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
    }],
    Settings: [{
        SYNC: false
    }]
}

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
                dataBase.ListaRutinas[i].TEXTPESO[j][k] = textPesoLista[i][j][k]
                dataBase.ListaRutinas[i].TEXTRIR[j][k] = textRIRLista[i][j][k]
            }
        }
    }

    for(let i = 0; i < amountWeeksBook; i++){

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
        dataBase.ListaBook[i].SEMANANAME = SemanaTextBook[i]
        dataBase.ListaBook[i].PASE = pase

        for(let j = 0; j < amountDaysBook[i]; j++){
            
            dataBase.ListaBook[i].CANTDIAS = amountDaysBook[i]
            dataBase.ListaBook[i].DIASNAME[j] = DiaTextBook[i][j]
            dataBase.ListaBook[i].CANTEJERCICIOSDIA[j] = amountEjerciciosDayBook[i][j]

            for(let k = 0; k < amountEjerciciosDayBook[i][j]; k++){
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

                dataBase.ListaBook[i].TEXTEJERCICIO[j][k] = textEjerciciosBook[i][j][k]
                dataBase.ListaBook[i].TEXTSERIES[j][k] = textSeriesBook[i][j][k]
                dataBase.ListaBook[i].TEXTREPS[j][k] = textRepsBook[i][j][k]
                dataBase.ListaBook[i].TEXTPESO[j][k] = textPesoBook[i][j][k]
                dataBase.ListaBook[i].TEXTRIR[j][k] = textRIRBook[i][j][k]
            }
        }
    }

    localStorage.setItem("amountWeeks", amountWeeksBook)
    
    for(let i = 0; i < amountWeeksBook; i++){
        localStorage.setItem("SemanaText" + i, SemanaTextBook[i])
    }

    for(let i = 0; i < amountWeeksBook; i++){
        for(let j = 0; j < amountDaysBook[i]; j++){
            localStorage.setItem("DiaText" + i + "" + j, DiaTextBook[i][j])
        }
    }

    for(let i = 0; i < amountDaysBook.length; i++){
        if(amountDaysBook[i] == null){
            amountDaysBook[i] = 1 
        }
        localStorage.setItem("amountDays" + i, amountDaysBook[i])
    }

    for(let i = 0; i < amountWeeksBook; i++){
        for(let j = 0; j < amountDaysBook[i]; j++){
            localStorage.setItem("amountEjerciciosDay" + i + j, amountEjerciciosDayBook[i][j])
        }
    }

    for(let i = 0; i < amountWeeksBook; i++){
        for(let j = 0; j < amountDaysBook[i]; j++){
            for(let k = 0; k < amountEjerciciosDayBook[i][j]; k++){
                localStorage.setItem("textEjercicios" + i + j + k, textEjerciciosBook[i][j][k])
                localStorage.setItem("textSeries" + i + j + k, textSeriesBook[i][j][k])
                localStorage.setItem("textReps" + i + j + k, textRepsBook[i][j][k])
                localStorage.setItem("textPeso" + i + j + k, textPesoBook[i][j][k])
                localStorage.setItem("textRIR" + i + j + k, textRIRBook[i][j][k])
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
}

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

            dataBase = dataBaseLoad
            amountWeeksLista = parseInt(dataBaseLoad.ListaRutinas.length)
            amountWeeksBook = parseInt(dataBaseLoad.ListaBook.length)
            SyncLists = dataBaseLoad.Settings.SYNC

            for(let SectionPage = 0; SectionPage < 2; SectionPage++){

                let amountWeeks, amountDays, SemanaText, dataBaseLoadPage, DiaText, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

                if(SectionPage == 0 /*Lista rutinas*/){
                    amountWeeks = amountWeeksLista
                    amountDays = amountDaysLista
                    SemanaText = SemanaTextLista
                    DiaText = DiaTextLista
                    amountEjerciciosDay = amountEjerciciosDayLista
                    dataBaseLoadPage = dataBaseLoad.ListaRutinas
                    textEjercicios = textEjerciciosLista
                    textSeries = textSeriesLista
                    textReps = textRepsLista
                    textPeso = textPesoLista
                    textRIR = textRIRLista
                }
                else if(SectionPage == 1 /*Cuaderno*/){
                    amountWeeks = amountWeeksBook
                    amountDays = amountDaysBook
                    SemanaText = SemanaTextBook
                    DiaText = DiaTextBook
                    amountEjerciciosDay = amountEjerciciosDayBook
                    dataBaseLoadPage = dataBaseLoad.ListaBook
                    textEjercicios = textEjerciciosBook
                    textSeries = textSeriesBook
                    textReps = textRepsBook
                    textPeso = textPesoBook
                    textRIR = textRIRBook
                }
        
                for(let i = 0; i < amountWeeks; i++){
                    amountDays[i] = parseInt(dataBaseLoadPage[i].CANTDIAS)
                    SemanaText[i] = dataBaseLoadPage[i].SEMANANAME
        
                    if(typeof amountDays[i] == undefined){
                        amountDays[i] = 1
                    }
        
                    if(i != 0){
                        DiaText[i] = [[]]
                        amountEjerciciosDay[i] = []
                    }
                    for(let j = 0; j < amountDays[i]; j++){
                        DiaText[i][j] = dataBaseLoadPage[i].DIASNAME[j]
                        amountEjerciciosDay[i][j] = dataBaseLoadPage[i].CANTEJERCICIOSDIA[j]
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
                            textEjercicios[i][j][k] = dataBaseLoadPage[i].TEXTEJERCICIO[j][k]
                            textSeries[i][j][k] = dataBaseLoadPage[i].TEXTSERIES[j][k]
                            textReps[i][j][k] = dataBaseLoadPage[i].TEXTREPS[j][k]
                            textPeso[i][j][k] = dataBaseLoadPage[i].TEXTPESO[j][k]
                            textRIR[i][j][k] = dataBaseLoadPage[i].TEXTRIR[j][k]
                        }
                    }
                }

                if(SectionPage == 0){
                    amountWeeksLista = amountWeeks
                    amountDaysLista = amountDays
                    SemanaTextLista = SemanaText
                    DiaTextLista = DiaText
                    amountEjerciciosDayLista = amountEjerciciosDay
                    textEjerciciosLista = textEjercicios
                    textSeriesLista = textSeries
                    textRepsLista = textReps
                    textPesoLista = textPeso
                    textRIRLista = textRIR
                }
                else if(SectionPage == 1){
                    amountWeeksBook = amountWeeks
                    amountDaysBook = amountDays
                    SemanaTextBook = SemanaText
                    DiaTextBook = DiaText
                    amountEjerciciosDayBook = amountEjerciciosDay
                    textEjerciciosBook = textEjercicios
                    textSeriesBook = textSeries
                    textRepsBook = textReps
                    textPesoBook = textPeso
                    textRIRBook = textRIR
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
            LoadDays()
            SyncListsFunction(document.querySelector('.SyncLists'), true)
        }
        if(!Again){
            document.querySelector('#loading').remove()
            document.querySelector('#DivSemanasLista').classList.remove('off')
        }
    }, 250)

}

function LoadDays(){
    for(let SectionPage = 0; SectionPage <= 1; SectionPage++){

        let amountWeeks, Page, amountDays, SemanaText, ClassAddWeek, ClassPnlSemana, DiaText, amountEjerciciosDay, textEjercicios, textSeries, textReps, textPeso, textRIR

        if(SectionPage == 0 /*Lista rutinas*/){
            amountWeeks = amountWeeksLista
            amountDays = amountDaysLista
            SemanaText = SemanaTextLista
            DiaText = DiaTextLista
            amountEjerciciosDay = amountEjerciciosDayLista
            textEjercicios = textEjerciciosLista
            textSeries = textSeriesLista
            textReps = textRepsLista
            textPeso = textPesoLista
            textRIR = textRIRLista
            ClassPnlSemana = '.PnlSemana'
            Page = 'Lists'
            ClassAddWeek = '.AddWeek'
        }
        else if(SectionPage == 1 /*Cuaderno*/){
            amountWeeks = amountWeeksBook
            amountDays = amountDaysBook
            SemanaText = SemanaTextBook
            DiaText = DiaTextBook
            amountEjerciciosDay = amountEjerciciosDayBook
            textEjercicios = textEjerciciosBook
            textSeries = textSeriesBook
            textReps = textRepsBook
            textPeso = textPesoBook
            textRIR = textRIRBook
            ClassPnlSemana = '.PnlSemanaBook'
            Page = 'Book'
            ClassAddWeek = '.AddWeekBook'
        }

        if(SemanaText[0] != null && SemanaText[0] != "null"){
            document.querySelector(`${ClassPnlSemana}`).querySelector('input').value = SemanaText[0]
            document.querySelector(`${ClassPnlSemana}`).querySelector('button').innerText = SemanaText[0]
        }
        
        for(let i = 2; i <= amountWeeks; i++){
            AddWeeks(document.querySelector(`${ClassAddWeek}`), true, i, Page)
        } 
    
        for(let i = 0; i <= amountWeeks; i++){
            for(let j = 2; j <= amountDays[i]; j++){
                AddDays(document.querySelectorAll(`${ClassPnlSemana}`)[i].querySelector('#BtnAddButtons'), true, j, Page)
            }
        }
    
        for(let i = 0; i < amountWeeks; i++){
            for(let j = 1; j < amountEjerciciosDay[i][0]; j++){
                AddEjercicio(document.querySelectorAll(`${ClassPnlSemana}`)[i].querySelector('#BtnAddEjercicios'), true, j, Page)
            }
        }
    
        for(let i = 0; i < amountWeeks; i++){
            if(DiaText[i][0] != null && DiaText[i][0] != "null" && DiaText[i][0] != undefined && DiaText[i][0] != "undefined"){
                document.querySelectorAll(`${ClassPnlSemana}`)[i].querySelector('#divButtons[name="0"]').querySelector('input').value = DiaText[i][0]
                document.querySelectorAll(`${ClassPnlSemana}`)[i].querySelector('#divButtons[name="0"]').querySelector('button').innerText = DiaText[i][0]
            }
            
        }
    }
}

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

function SyncListsFunction(Button, Load){
    if(!Load){
        SyncLists = !SyncLists
    
        if(SyncLists == true){
            Button.querySelector('#toggleOff').classList.add('toggleOn')
        }
        else{
            Button.querySelector('#toggleOff').classList.remove('toggleOn')
        }
    
        dataBase.Settings.SYNC = SyncLists
        SaveData()
    }
    else if (Load){
        if(SyncLists == true){
            Button.querySelector('#toggleOff').classList.add('toggleOn')
        }
        else{
            Button.querySelector('#toggleOff').classList.remove('toggleOn')
        }
    }
}

function LogOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('pw')
    location.reload()
}

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
        TextoCambiadoLista = true
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

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}
