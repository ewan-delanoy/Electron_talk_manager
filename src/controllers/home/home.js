function _generateRow(row)  {
    let tr = document.createElement('tr')

    const tdLabel = document.createElement('td')
    tdLabel.textContent = row.label

    const tdDescription = document.createElement('td')
    tdDescription.textContent = row.description

    const tdStatus = document.createElement('td')
    tdStatus.textContent = row.status

    const tdButtons = document.createElement('td')

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Supprimer'
    deleteBtn.classList.add('btn', 'btn-outline-danger', 'mx-2')

    tdButtons.append(deleteBtn)

    tr.append(tdLabel, tdDescription, tdStatus, tdButtons)

    return(tr);
}

function populateTasksTable(rows) {
    const table = document.getElementById("tasks")

    rows.forEach(row => {
        const tr = _generateRow(row);
        table.appendChild(tr);
    })
}


window.ipcRenderer.onceInitData(handleInitData)

function handleInitData(e, taskData) {
    populateTasksTable(taskData);
}

let addNewTaskBtn = document.querySelector('#addNewTaskBtn');

addNewTaskBtn.addEventListener('click', (e) => {
    console.log("Main display 4 : Entering event listener for add new task button in home/home.js");
    window.ipcRenderer.askOpenNewTaskWindow();
});

window.ipcRenderer.onNewTaskAdded(handleNewTaskAdded);

function handleNewTaskAdded(e, newData) {
    console.log("Main display 5 : Entering handleNewTaskAdded in home.js");
    // J'ajoute dans le bon tableau la nouvelle valeur
    const newTask = newData[newData.length - 1];

    const table = document.getElementById("main-table");
    const tr = _generateRow(newTask);
    table.appendChild(tr);
};