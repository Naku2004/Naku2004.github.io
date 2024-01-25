
function cambia_de_pagina(){
    setTimeout(() => { 
        location.href="rutins.html" }, 900);
}

var amountWeeksLista = 1
var edit = false
var pnlSlide = false

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    LoadData(true);
    SlideDivButtons()
    
    const gistId = 'be77eb681b29ec2b483f2183ab5f0db5 ';
    const apiUrl = `https://api.github.com/gists/${gistId}`;

    // Realizar una solicitud HTTP GET para obtener información del Gist
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log('Contenido del Gist:', data.files[Object.keys(data.files)[0]].content);
    })
    .catch(error => {
        console.error('Error al obtener el Gist:', error);
    });
});

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

    if(pnlSlide == false){
        pnlSemana.classList.add('on')
        pnlSlide = true
    }
    else{
        pnlSemana.classList.remove('on')
        pnlSlide = false
    }

    //ButtonClickLista(pnlSemana.querySelector('#divButtons').querySelector('button'))
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
        if(textRIRLista[Week][Day][i] == "null"){
            textRIRLista[Week][Day][i] = ""
        }

        SaveData()

        AllTextInputExcercise[i].value = textEjerciciosLista[Week][Day][i]
        AllTextInputSeries[i].value = textSeriesLista[Week][Day][i]
        AllTextInputReps[i].value = textRepsLista[Week][Day][i]
        AllTextInputRIR[i].value = textRIRLista[Week][Day][i]
    }
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
        textRIRLista[amountWeeksLista - 1] = []
        DiaTextLista[amountWeeksLista - 1] = [[]]
        SemanaTextLista[amountWeeksLista - 1] = "Semana " + amountWeeksLista
    
        for(let i = 0; i <= AmountDays; i++){
            amountEjerciciosDayLista[amountWeeksLista - 1][i] = "1"
            textEjerciciosLista[amountWeeksLista - 1][i] = [""]
            textSeriesLista[amountWeeksLista - 1][i] = [""]
            textRepsLista[amountWeeksLista - 1][i] = [""]
            textRIRLista[amountWeeksLista - 1][i] = [""]
            DiaTextLista[amountWeeksLista - 1][i] = NewDivSemana.querySelectorAll('#divButtons')[i].querySelector('input').value
        }

        divPage.insertBefore(NewDivSemana, divPage.childNodes[(amountWeeksLista + 2)])
        
        ButtonClickLista(NewDivSemana.querySelector('#divDivButtons').querySelector('.on'))
    }
    SaveData() 
    SlideDivButtons()
}

function DeleteWeekLista(Button){
    if(amountWeeksLista > 1){
        amountWeeksLista--
        localStorage.removeItem("amountDaysLista" + amountWeeksLista)
        SaveData()

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
        textRIRLista.splice(amountWeeksLista, 1)
        DiaTextLista.splice(amountWeeksLista, 1)

        SaveData()

        let divpagerutinas = Button.closest('#pagerutinas')
        let divPage = divpagerutinas.querySelector('#DivSemanasLista')

        divPage.removeChild(divPage.children[(amountWeeksLista)])
        LoadData(false)
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
            amountEjerciciosDayLista[Week][amountDaysLista[Week] - 1] = 1
            textEjerciciosLista[Week][amountDaysLista[Week] - 1] = [""]
            textSeriesLista[Week][amountDaysLista[Week] - 1] = [""]
            textRepsLista[Week][amountDaysLista[Week] - 1] = [""]
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
    SaveData()
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
        SaveData()

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
        textRIRLista[Week].splice(Day, 1)
        DiaTextLista[Week].splice(Day, 1)

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

    SaveData()
}

function AddEjercicio(Button, Load, j){
    let Week = Button.closest('#semana').getAttribute('name')
    let Day = Button.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    if(Load == false){
        textEjerciciosLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textSeriesLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
        textRepsLista[Week][Day][amountEjerciciosDayLista[Week][Day]] = ""
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

        edit = false
    }
    SaveData()
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
    SaveData()
}

var textEjerciciosLista =    [/* Semana */[/*Dia 1*/[""/*1er Ejercicio*/]]]
var textSeriesLista =        [/* Semana */[/*Dia 1*/[""/*1er Series*/]]]
var textRepsLista =          [/* Semana */[/*Dia 1*/[""/*1er Reps*/]]]
var textRIRLista =           [/* Semana */[/*Dia 1*/[""/*1er RIR*/]]]

function TextChanged(TextInput, Type){
    let Week = TextInput.closest('#semana').getAttribute('name')
    let Day = TextInput.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    let ExerciseID = TextInput.closest('tr').getAttribute('name')

    if(Type == "Ejercicio"){
        textEjerciciosLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveData()
    }

    if(Type == "Series"){
        textSeriesLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjerciciosLista[Week][Day][ExerciseID])
        SaveData()
    }

    if(Type == "Reps"){
        textRepsLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveData()
    }

    if(Type == "RIR"){
        textRIRLista[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveData()
    }
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
                localStorage.setItem("textRIRLista" + i + j + k, textRIRLista[i][j][k])
            }
        }
    }
}

function LoadData(FirstTime){

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

    if(FirstTime){
        LoadDaysLista()
    }
}

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
        if(DiaTextLista[i][0] != null && DiaTextLista[i][0] != "null"){
            document.querySelectorAll('.PnlSemana')[i].querySelector('#divButtons[name="0"]').querySelector('input').value = DiaTextLista[i][0]
            document.querySelectorAll('.PnlSemana')[i].querySelector('#divButtons[name="0"]').querySelector('button').innerText = DiaTextLista[i][0]
        }
        
    }
}