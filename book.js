var amountWeeks = 1
var edit = false
var pnlSlide = false

document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes llamar a tu función para cargar datos
    LoadDataBook(true);
    SlideDivButtons()
    
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
        BtnSlide.innerText = SemanaText[i - 1]
        SpanSlide.value = SemanaText[i - 1]
        NewDivSemana.setAttribute('name', (i - 1))
        divPage.insertBefore(NewDivSemana, divPage.childNodes[(i + 2)])
    }
    else{
        BtnSlide.innerText = "Semana " + amountWeeks
        SpanSlide.textContent = "Semana " + amountWeeks
        NewDivSemana.setAttribute('name', (amountWeeks - 1))
        

        amountDays[amountWeeks - 1] = AmountDays + 1
        amountEjerciciosDay[amountWeeks - 1] = []
        textEjercicios[amountWeeks - 1] = []
        textSeries[amountWeeks - 1] = []
        textReps[amountWeeks - 1] = []
        textRIR[amountWeeks - 1] = []
        DiaText[amountWeeks - 1] = [[]]
        SemanaText[amountWeeks - 1] = "Semana " + amountWeeks
    
        for(let i = 0; i <= AmountDays; i++){
            amountEjerciciosDay[amountWeeks - 1][i] = "1"
            textEjercicios[amountWeeks - 1][i] = [""]
            textSeries[amountWeeks - 1][i] = [""]
            textReps[amountWeeks - 1][i] = [""]
            textRIR[amountWeeks - 1][i] = [""]
            DiaText[amountWeeks - 1][i] = NewDivSemana.querySelectorAll('#divButtons')[i].querySelector('input').value
        }

        divPage.insertBefore(NewDivSemana, divPage.childNodes[(amountWeeks + 2)])
        
        ButtonClick(NewDivSemana.querySelector('#divDivButtons').querySelector('.on'))
    }
    SaveDataBook() 
    SlideDivButtons()
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
        DiaText.splice(amountWeeks, 1)

        SaveDataBook()

        let divPagebook = Button.closest('#pagebook')
        let divPage = divPagebook.querySelector('#DivSemanasBook')

        divPage.removeChild(divPage.children[(amountWeeks)])
        LoadDataBook(false)
    }
}

var amountDays = [1/*Semana1*/]

function AddDays(Button, Load, j){
    let tr = Button.closest('tr')
    let th = tr.querySelector('th')
    let semana = Button.closest('#semana')
    let Week = semana.getAttribute('name')
    let addButton = Button.closest('#divAdd')

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
            localStorage.removeItem(`DiaText${Week}${Day}${i}`)
        }
        SaveDataBook()

        for(let i = 0; i < amountEjerciciosDay[Week][Day]; i++){
            localStorage.removeItem(`amountEjerciciosDay${Week}${amountDays}${i}`)
            localStorage.removeItem(`textEjercicios${Week}${amountDays}${i}`)
            localStorage.removeItem(`textSeries${Week}${amountDays}${i}`)
            localStorage.removeItem(`textReps${Week}${amountDays}${i}`)
            localStorage.removeItem(`textRIR${Week}${amountDays}${i}`)
            localStorage.removeItem(`DiaText${Week}${amountDays}${i}`)
        }

        amountEjerciciosDay[Week].splice(Day, 1)
        textEjercicios[Week].splice(Day, 1)
        textSeries[Week].splice(Day, 1)
        textReps[Week].splice(Day, 1)
        textRIR[Week].splice(Day, 1)
        DiaText[Week].splice(Day, 1)

        SaveDataBook()

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

    if(Load == true){
        NewTrEjercicio.setAttribute('name', (j))
        tBody.appendChild(NewTrEjercicio)
    }
    else{
        NewTrEjercicio.setAttribute('name', (amountEjerciciosDay[Week][Day] - 1))
        tBody.appendChild(NewTrEjercicio)
        ButtonClick(divSemana.querySelector('#divDivButtons').querySelector('.on'))
    }
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
    let labelSemana = divSemana.querySelector('input')
    let labelDays = divSemana.querySelectorAll('.buttonLabelDay')
    let btnSlideSemana = divSemana.querySelector('button')
    let divsAdd = divSemana.querySelectorAll('#divAdd')
    let divAdd = divsAdd[divsAdd.length - 1]
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

var SemanaText = []
var DiaText = [[]]

function EditTextSpan(TextInput, Type){
    let Week = TextInput.closest('.PnlSemanaBook').getAttribute('name')
    let Div = TextInput.closest('div')
    let Btn = Div.querySelector('button')
    if(Type == "Semana"){
        Btn.innerText = TextInput.value
        SemanaText[Week] = TextInput.value
    } else
    if(Type == "Dia"){
        Btn.innerText = TextInput.value
        let Day = TextInput.closest('div').getAttribute('name')
        DiaText[Week][Day] = TextInput.value
    }
    SaveDataBook()
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

    if(FirstTime){
        LoadDays()
    }
}

function LoadDays(){

    if(SemanaText[0] != null && SemanaText[0] != "null"){
        document.querySelector('.PnlSemanaBook').querySelector('input').value = SemanaText[0]
        document.querySelector('.PnlSemanaBook').querySelector('button').innerText = SemanaText[0]
    }

    for(let i = 2; i <= amountWeeks; i++){
        AddWeek(document.querySelector('.AddWeekBook'), true, i)
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

    for(let i = 0; i < amountWeeks; i++){
        if (DiaText[i][0] != null && DiaText[i][0] != "null") {
            document.querySelectorAll('.PnlSemanaBook')[i].querySelector('#divButtons[name="0"]').querySelector('input').value = DiaText[i][0]
            document.querySelectorAll('.PnlSemanaBook')[i].querySelector('#divButtons[name="0"]').querySelector('button').innerText = DiaText[i][0]
        }
    }
}