var amountWeeks = 1
var addButton
var edit = false
var pnlSlide = false

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    LoadDataBook(true);
});


function ButtonSemanaSlideBook(Button){
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

    ButtonClick(pnlSemana.querySelector('#divButtons').querySelector('button'))
}

function ButtonClick(Button){
    let divDivButton = Button.closest('#divDivButtons')
    let NowOn = divDivButton.querySelector('.on')

    NowOn.classList.remove('on')
    Button.classList.add('on')

    let divButtons = Button.closest('div')
    let tbody = Button.closest('.PnlSemanaBook').querySelector('.tbodyBook')
    let ButtonAdd = Button.closest('.PnlSemanaBook').querySelector('.btnAdd')
    let ButtonDelete = Button.closest('.PnlSemanaBook').querySelector('.btnDelete')

    let Week = Button.closest('.PnlSemanaBook').getAttribute('name')
    let Day = divButtons.getAttribute('name')

    let NumberExcercisesActual = tbody.children.length - 1
    let NumberExcercisesAfter =  amountEjerciciosDay[Week][Day]

    if(NumberExcercisesActual < NumberExcercisesAfter){
        let Diferencia = NumberExcercisesAfter - NumberExcercisesActual
        for(let i = 0; i < Diferencia; i++){
            AddEjercicioBook(ButtonAdd, true)
        }
    }
    else if(NumberExcercisesActual > NumberExcercisesAfter){
        let Diferencia = NumberExcercisesActual - NumberExcercisesAfter
        
        for(let i = 0; i < Diferencia; i++){
            DeleteEjercicioBook(ButtonDelete, true)
        }
    }

    let AllTextInputExcercise = tbody.querySelectorAll('#InputExcercise')
    let AllTextInputSeries = tbody.querySelectorAll('#InputSeries')
    let AllTextInputReps = tbody.querySelectorAll('#InputReps')
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
        if(textRIR[Week][Day][i] == "null"){
            textRIR[Week][Day][i] = ""
        }

        SaveDataBook()

        AllTextInputExcercise[i].value = textEjercicios[Week][Day][i]
        AllTextInputSeries[i].value = textSeries[Week][Day][i]
        AllTextInputReps[i].value = textReps[Week][Day][i]
        AllTextInputRIR[i].value = textRIR[Week][Day][i]
    }
}

var amountEjerciciosDay = [/*Semana 1*/ [1 /*Dia1*/]]

function AddWeek(Button, Load, i){
    if(Load == false){
        amountWeeks++
    }
    
    let divPagebook = Button.closest('#pagebook')
    let divPage = divPagebook.querySelector('#DivSemanasBook')
    let divSemana = divPage.querySelectorAll('#semana')
    let NewDivSemana = divSemana[divSemana.length - 1].cloneNode(true)
    let BtnSlide = NewDivSemana.querySelector('#BtnSemanaSlide')
    let SpanSlide = NewDivSemana.querySelector('#LabelSemana')
    let AmountDays = NewDivSemana.querySelector('#divDivButtons').children.length - 1

    if(Load == true){
        BtnSlide.innerText = "Semana " + i
        SpanSlide.textContent = "Semana " + i
        NewDivSemana.setAttribute('name', (i - 1))
        divPage.insertBefore(NewDivSemana, divPage.childNodes[(i + 2)])
    }
    else{
        BtnSlide.innerText = "Semana " + amountWeeks
        SpanSlide.textContent = "Semana " + amountWeeks
        NewDivSemana.setAttribute('name', (amountWeeks - 1))
        divPage.insertBefore(NewDivSemana, divPage.childNodes[(amountWeeks + 2)])

        amountDays[amountWeeks - 1] = AmountDays + 1
        amountEjerciciosDay[amountWeeks - 1] = []
        textEjercicios[amountWeeks - 1] = []
        textSeries[amountWeeks - 1] = []
        textReps[amountWeeks - 1] = []
        textRIR[amountWeeks - 1] = []
    
        for(let i = 0; i <= AmountDays; i++){
            amountEjerciciosDay[amountWeeks - 1][i] = "1"
            textEjercicios[amountWeeks - 1][i] = [""]
            textSeries[amountWeeks - 1][i] = [""]
            textReps[amountWeeks - 1][i] = [""]
            textRIR[amountWeeks - 1][i] = [""]
        }   
    }
    SaveDataBook() 
}

function DeleteWeek(Button){
    if(amountWeeks > 1){
        amountWeeks--
        localStorage.removeItem("amountDays" + amountWeeks)
        SaveDataBook()

        for(let i = 0; i < amountDays[amountWeeks]; i++){
            localStorage.removeItem(`amountEjerciciosDay${amountWeeks}${i}`)
            for(let j = 0; j < amountEjerciciosDay[amountWeeks][i]; j++){
                localStorage.removeItem(`textEjercicios${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textSeries${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textReps${amountWeeks}${i}${j}`)
                localStorage.removeItem(`textRIR${amountWeeks}${i}${j}`)
            }
        }
    
        amountDays[amountWeeks] = "1"
        amountEjerciciosDay.splice(amountWeeks, 1)
        textEjercicios.splice(amountWeeks, 1)
        textSeries.splice(amountWeeks, 1)
        textReps.splice(amountWeeks, 1)
        textRIR.splice(amountWeeks, 1)

        SaveDataBook()

        let divPage = Button.closest('#pagebook')
        divPage.removeChild(divPage.children[(amountWeeks + 1)])
        LoadDataBook(false)
    }
}

var amountDays = [1/*Semana1*/]

function AddDays(Button, Load, i){
    let tr = Button.closest('tr')
    let th = tr.querySelector('th')
    let semana = Button.closest('#semana')
    let Week = semana.getAttribute('name')
    addButton = tr.querySelector('#divAdd')

    if(amountDays[Week] < 7 || Load == true){
        if(Load == false){
            amountDays[Week]++
            amountEjerciciosDay[Week][amountDays[Week] - 1] = 1
            textEjercicios[Week][amountDays[Week] - 1] = [""]
            textSeries[Week][amountDays[Week] - 1] = [""]
            textReps[Week][amountDays[Week] - 1] = [""]
            textRIR[Week][amountDays[Week] - 1] = [""]
            SaveDataBook()
        }

        if(amountDays[Week] == 2 && Load == false){
            th.querySelector('.buttonLabelDay').classList.remove('deleteOff')
            th.querySelector('#BtnDeleteButtons').classList.remove('off')
        }

        if(amountDays[Week] == 7){
            addButton.classList.add("off")
        }

        let divBtn = tr.querySelector('div')
        let NewDivBtn = divBtn.cloneNode(true)
        let Btn = NewDivBtn.querySelector('button')
        let SpanBtn = NewDivBtn.querySelector('span')
        Btn.classList.remove('on')
        
        if(Load == true){
            NewDivBtn.setAttribute('name', (i - 1))
            Btn.innerText = "Dia " + i
            SpanBtn.textContent = "Dia " + i
        }
        else{
            NewDivBtn.setAttribute('name', (amountDays[Week] - 1))
            Btn.innerText = "Dia " + amountDays[Week]
            SpanBtn.textContent = "Dia " + amountDays[Week]
        }

        let NumTrChilds = th.childElementCount
        th.insertBefore(NewDivBtn, th.children[(NumTrChilds)])
    }
    SaveDataBook()
}

function DeleteDays(Button){
    let Week = Button.closest('#semana').getAttribute('name')

    if(amountDays[Week] > 1){
        let div = Button.closest('#divButtons')
        let Day = parseInt(div.getAttribute('name'))
        amountDays[Week]--

        for(let i = 0; i < amountEjerciciosDay[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Week}${Day}${i}`)
            localStorage.removeItem(`textEjercicios${Week}${Day}${i}`)
            localStorage.removeItem(`textSeries${Week}${Day}${i}`)
            localStorage.removeItem(`textReps${Week}${Day}${i}`)
            localStorage.removeItem(`textRIR${Week}${Day}${i}`)
        }
        SaveDataBook()

        for(let i = 0; i < amountEjerciciosDay[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Week}${amountDays}${i}`)
            localStorage.removeItem(`textEjercicios${Week}${amountDays}${i}`)
            localStorage.removeItem(`textSeries${Week}${amountDays}${i}`)
            localStorage.removeItem(`textReps${Week}${amountDays}${i}`)
            localStorage.removeItem(`textRIR${Week}${amountDays}${i}`)
        }

        amountEjerciciosDay[Week].splice(Day, 1)
        textEjercicios[Week].splice(Day, 1)
        textSeries[Week].splice(Day, 1)
        textReps[Week].splice(Day, 1)
        textRIR[Week].splice(Day, 1)

        SaveDataBook()

        let divDivButtons = Button.closest('#divDivButtons')
        let divButtons = divDivButtons.querySelectorAll('#divButtons')
        let numberDay = Button.closest('#divButtons').getAttribute('name')

        for(let i = numberDay; i < divDivButtons.children.length; i++){
            divButtons[i].setAttribute('name', (i - 1))
        }

        if(amountDays == 1){
            div.remove()
            divDivButtons.querySelector('.buttonLabelDay').classList.add('deleteOff')
            divDivButtons.querySelector('#BtnDeleteButtons').classList.add('off')
        }
        else{
            div.remove()
        }

        if(amountDays == 6){
            addButton.classList.remove("off")
        }

        let Buttons = divDivButtons.querySelectorAll('#divButtons')
        let FirstButton = Buttons[0].querySelector('button')
        FirstButton.classList.add('on')
        ButtonClick(FirstButton)
    }

    SaveDataBook()
}


function AddEjercicioBook(Button, Load, j){
    let Week = Button.closest('#semana').getAttribute('name')
    let Day = Button.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    if(Load == false){
        textEjercicios[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textSeries[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textReps[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        textRIR[Week][Day][amountEjerciciosDay[Week][Day]] = ""
        amountEjerciciosDay[Week][Day]++
        SaveDataBook()
    }

    let divSemana = Button.closest('#semana')
    let tBody = divSemana.querySelector('.tbodyBook')
    let trEjercicio = tBody.querySelector('.trBookEjercicio')
    let NewTrEjercicio = trEjercicio.cloneNode(true)

    if(Load){
        NewTrEjercicio.setAttribute('name', (j))
    }
    else{
        NewTrEjercicio.setAttribute('name', (amountEjerciciosDay[Week][Day] - 1))
    }

    tBody.appendChild(NewTrEjercicio)
}

function DeleteEjercicioBook(Button, Load){
    let Week = Button.closest('#semana').getAttribute('name')
    let Day = Button.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    
    if(amountEjerciciosDay[Week][Day] > 1 || Load == true){
        if(Load == false){
            amountEjerciciosDay[Week][Day]--
            textEjercicios[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textSeries[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textReps[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)
            textRIR[Week][Day].splice(amountEjerciciosDay[Week][Day], 1)

            localStorage.removeItem(`textEjercicios${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textSeries${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textReps${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            localStorage.removeItem(`textRIR${Week}${Day}${amountEjerciciosDay[Week][Day]}`)
            SaveDataBook()
        }
        let divSemana = Button.closest('#semana')
        let tBody = divSemana.querySelector('.tbodyBook')
        tBody.removeChild(tBody.lastChild)
    }
}

function EditButtons(Button){
    let divSemana = Button.closest('div')
    let labelSemana = divSemana.querySelector('span')
    let labelDays = divSemana.querySelectorAll('.buttonLabelDay')
    let btnSlideSemana = divSemana.querySelector('button')
    let divAdd = divSemana.querySelector('#divAdd')
    let btnDays = divSemana.querySelectorAll('.buttonBook')
    let btnDelete = divSemana.querySelectorAll('.buttonDelete')
    let EditIcon = divSemana.querySelector('#EditIcon')
    let Week = divSemana.getAttribute('name')
    //alert(Week + amountDays[Week])

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

        edit = false
    }
    SaveDataBook()
}

function EditText(TextInput, event){
    event.preventDefault()
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    Btn.innerText = TextInput.textContent
}

var textEjercicios =    [/* Semana */[/*Dia 1*/[""/*1er Ejercicio*/]]]
var textSeries =        [/* Semana */[/*Dia 1*/[""/*1er Series*/]]]
var textReps =          [/* Semana */[/*Dia 1*/[""/*1er Reps*/]]]
var textRIR =           [/* Semana */[/*Dia 1*/[""/*1er RIR*/]]]

function TextChangedB(TextInput, Type){
    let Week = TextInput.closest('#semana').getAttribute('name')
    let Day = TextInput.closest('#semana').querySelector('#divDivButtons').querySelector('.on').closest('#divButtons').getAttribute('name')
    let ExerciseID = TextInput.closest('tr').getAttribute('name')

    if(Type == "Ejercicio"){
        textEjercicios[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveDataBook()
    }

    if(Type == "Series"){
        textSeries[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveDataBook()
    }

    if(Type == "Reps"){
        textReps[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveDataBook()
    }

    if(Type == "RIR"){
        textRIR[Week][Day][ExerciseID] = TextInput.value
        //alert(textEjercicios[Week][Day][ExerciseID])
        SaveDataBook()
    }
}

function SaveDataBook(){
    localStorage.setItem("amountWeeks", amountWeeks)

    for(let i = 0; i < amountDays.length; i++){
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
                localStorage.setItem("textRIR" + i + j + k, textRIR[i][j][k])
            }
        }
    }
}

function LoadDataBook(FirstTime){

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

    if(FirstTime){
        LoadDays()
    }
}

function LoadDays(){
    for(let i = 2; i <= amountWeeks; i++){
        AddWeek(document.querySelector('.AddWeek'), true, i)
    } 

    for(let i = 0; i <= amountWeeks; i++){
        for(let j = 2; j <= amountDays[i]; j++){
            AddDays(document.querySelectorAll('.PnlSemanaBook')[i].querySelector('#BtnAddButtons'), true, j)
        }
    }

    for(let i = 0; i < amountWeeks; i++){
        for(let j = 1; j < amountEjerciciosDay[i][0]; j++){
            AddEjercicioBook(document.querySelectorAll('.PnlSemanaBook')[i].querySelector('#BtnAddEjercicios'), true, j)
        }
    }
}