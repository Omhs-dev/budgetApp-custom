const budgetInput = document.getElementById('number');
const budgetForm = document.getElementById('addform');
const expForm = document.getElementById('expform');
const expName = document.getElementById('expname');
const expAmount = document.getElementById('expnumber');

const budgetAmount = document.getElementById('amountbudget');
const budgetBalance = document.getElementById('amountbalance');
const budgetExpense = document.getElementById('amountexpense');

const displayExpenses = document.getElementById('expValue');
const edit = document.getElementById('edit');
const remove = document.getElementById('remove');
const historyDiv = document.getElementById('history');

const close = document.getElementById('close');
const btn = document.getElementById('btn');

let details = JSON.parse(localStorage.getItem('details')) || [];
let budget = JSON.parse(localStorage.getItem('budget')) || [];
// let budgetLc = JSON.parse(localStorage.getItem('budget'));
let detailsSecondMem = JSON.parse(localStorage.getItem('secMem')) || [];
let lc = JSON.parse(localStorage.getItem('details'));

function getBudgetSome(amount) {
    if(!amount) {
        budgetInput.style.border = "1px solid red";
        budgetInput.placeholder = "Input can not be empty";
        budgetInput.style.color = "#b80c09";
        setTimeout(() => {
            budgetInput.style.color = "#495057";
            budgetInput.style.border = "1px solid red";
        }, 3000);
    } else {
        budgetAmount.innerText = amount;
        budgetBalance.innerText = amount;
        expForm.style.display = "block";
        // budgetForm.style.display = "none";
        // editForm.style.display = "none";
        budget.push(amount);
        budgetInput.value = "";
        localStorage.setItem("budget", JSON.stringify(budget));
    }
}

function generateId() {
    var timestamp = Date.now().toString(36);
    var randomNum = Math.random().toString(36).substr(2, 9);
    return timestamp + randomNum;
}  

function getBudgetExpenses(name, number) {
    if(!name.length || !number.length) {
        expName.style.border = "1px solid red";
        expName.placeholder = "Input can not be empty";
        expName.style.color = "#b80c09";

        expAmount.style.border = "1px solid red";
        expAmount.placeholder = "Input can not be empty";
        expAmount.style.color = "#b80c09";

        setTimeout(() => {
            expName.style.border = "1px solid gray";
            expName.placeholder = "Input can not be empty";
            expName.style.color = "#495057";

            expAmount.placeholder = "Input can not be empty";
            expAmount.style.border = "1px solid gray";
            expAmount.style.color = "#495057";
        }, 3000);
    } else {
        let id = generateId();
        const userExp = {
            id: id,
            name: name,
            number: parseInt(number),
        };
        details.push(userExp);
        detailsSecondMem.push(userExp);
        console.log(details);
        displayExp(details);
        expName.value = "";
        expAmount.value = "";
        localStorage.setItem("details", JSON.stringify(details));
        localStorage.setItem("secMem", JSON.stringify(details));
        // console.log(localStorage.setItem("details", JSON.stringify(details)));
    }
}

function displayExp(details) {
    displayExpenses.innerHTML = null;
    for (let i = 0; i < details.length; i++) {
        displayExpenses.innerHTML += `
        <div id="expValue" id="${details[i].id}"
        style="display: flex; justify-content: space-around"
        class="row"
        >
            <div id="expTitleName" class="exp col">
                <p>${details[i].name}</p>
            </div>
            <div id="expValueAmount" class="exp col">
                <p><span>$</span>${details[i].number}</p>
            </div>
            <div id="editdelete" class="col">
                <p class="d-flex">
                    <button id="edit" class="btn text-success" id="${details[i].id}" onclick="editExpDetails(${details[i].id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn text-danger" id="${details[i].id}" onclick="delExpenseDetails(${details[i].id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </p>
            </div>
        </div>
        `;
    }
    calcExpenses();
}
            
function calcExpenses() {
    let totalExp = 0;
    for (i = 0; i < details.length; i++) {  
        totalExp = details[i].number + totalExp;
    }
    // console.log(totalExp);
    budgetExpense.innerText = totalExp;
    updateBalance();
}

function updateBalance() {
    // budgetBalance.innerText = parseInt(budgetAmount.innerText) - parseInt(budgetExpense.innerText);
    budgetBalance.innerText = (budgetAmount.innerText = budget) - parseInt(budgetExpense.innerText);
}

//Modifier une depense
function editExpDetails(id) {
    var ids = id.id;

    console.log(ids);
    details = lc.filter(function(element) {
        return element.id !== ids;
    })

    console.log(lc);
    for(let i = 0; i < lc.length; i++) {
        expAmount.value = lc[i].number;
        expName.value = lc[i].name;
    }

    id.parentNode.parentNode.parentNode.remove(id);
    localStorage.setItem('details', JSON.stringify(lc));
    // delExpenseDetails(id);
    // calcExpenses();
}

//supprimer une depense
function delExpenseDetails(id) {
    if (id) {
        id.parentNode.parentNode.parentNode.remove(id);
    }
    // console.log(id.id);
    var ids = id.id;
    console.log(ids);
    let details = JSON.parse(localStorage.getItem('details')) ?? [];
    details = details.filter(function(element) {
        return element.id != ids;
    })
    localStorage.setItem('details', JSON.stringify(details));
    calcExpenses();
    location.reload();
    // console.log("good")
}

function resetBudget() {
    localStorage.clear();
    location.reload();
    console.log("buum")
}

function historyBudget() {
    historyDiv.innerHTML = null;
    historyDiv.style.height = "250px";
    historyDiv.style.overflow = "auto";
    const lce = JSON.parse(localStorage.getItem('secMem'));
    // console.log(lce);
    if (historyDiv && lce == null) {
            historyDiv.innerHTML = `
            <h5 class="container text-center mt-4">Faites une depense d'abord !!!🤦🏿‍♂️🙄😁</h5>
            `;
            setTimeout(() => {
                historyDiv.innerHTML = null;
            }, 5000)
            return ;
    }
    for (let i = 0; i < lce.length; i++)   {
        console.log(localStorage.key(i));
        historyDiv.innerHTML += `
        <div id="expValue" id="${lce.id}"
        style="display: flex;
        justify-content: space-around;"
        >
            <div id="expTitleName" class="exp">
                <p>${lce[i].name}</p>
            </div>
            <div id="expValueAmount" class="exp">
                <p><span>$</span>${lce[i].number}</p>
            </div>
            <div id="editdelete">
                <p>
                    <button id="edit" class="btn text-success" id="${lce.id}" onclick="editExpDetails(${lce.id})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn text-danger" id="${lce.id}" onclick="delExpenseDetails(${lce.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </p>
            </div>
        </div>
        `;
    }
    closeHistoryInnerHtml();
    console.log("work")
}

function closeHistoryInnerHtml() {
    console.log(close)
    close.innerHTML += `
    <button class="btn btn-danger w-100" onclick="closeHistory()">
        Close <i class="fa-solid fa-arrow-up"></i>
    </button>
    `;
    btn.disabled = true;
}

function closeHistory() {
    historyDiv.innerHTML = null;
    historyDiv.style.height = "0";
    historyDiv.style.overflow = "0";
    close.innerHTML = "";
    btn.disabled = false;
    console.log(close)
}

budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getBudgetSome(budgetInput.value);
});

expForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    console.log("okay");
    if (expName.value === "" || expAmount.value === "") {
        expName.placeholder = "Input can not be empty";
        expAmount.placeholder = "Input can not be empty";
    } else {
        getBudgetExpenses(expName.value, expAmount.value);
        location.reload();
    }
    // getBudgetExpenses(expName.value, expAmount.value);
});

window.onload = function () {
    displayExp(details);
    budgetAmount.innerText = budget;
    // budgetBalance.innerText = budget;
    console.log(budget);
}

//chartjs -------------------voila--------------------------

const ctx = document.getElementById('myChart');
//------------retrieve numbers--------------
const detData = () => {
    const result = [];
    for (i = 0; i < lc.length; i++) {
        if (lc.length != null)
        console.log("cool for lc");
    else
        console.log("lc = null");
        result.push(lc[i].number);
        // console.log(lc[i].number);
    }
    // console.log(detData);
    return (result);
}

//------------retrieve name--------------
const detNameData = () => {
    const result = [];
    for (i = 0; i < lc.length; i++) {
        if (lc.length != null)
        console.log("cool for lc");
    else
        console.log("lc = null");
        result.push(lc[i].name);
        // console.log(lc[i].name);
    }
    // console.log(detData);
    return (result);
}
const data = {
    labels: detNameData(),
    datasets: [{
        label: 'Prix',
        data: detData(),
        backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

new Chart(ctx, {
    type: 'doughnut',
    data: data
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   }
});
