let calculation = localStorage.getItem('calculation') || '';

showCalculation();

function updateCalculation (value) {
    calculation += value;
    console.log(calculation);
    saveCalculation();
    showCalculation();
}

function saveCalculation () {
    localStorage.setItem('calculation', calculation);
}

function showCalculation () {
    if (calculation === "") {
        document.querySelector('.js-result').innerHTML = `0`;
    }else{
        document.querySelector('.js-result').innerHTML = `${calculation}`;
    }
}
