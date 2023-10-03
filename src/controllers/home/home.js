function populateTasksTable(rows) {
    const table = document.getElementById("tasks")

    rows.forEach(row => {
        const tr = document.createElement('tr')

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

        table.appendChild(tr)
    })
}


window.ipcRenderer.onceInitData(handleInitData)

function handleInitData(e, taskData) {
    /*
    const incomes = accountData.filter(d => d.type === 'income')
    populateTable(incomes, 'income')
    */

    populateTasksTable(taskData);
}
