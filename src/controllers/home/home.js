function populateTable(rows, type) {
    const table = document.getElementById(type)

    rows.forEach(row => {
        const tr = document.createElement('tr')

        const th = document.createElement('th')
        th.scope = 'row'
        th.textContent = row.id

        const tdTitle = document.createElement('td')
        tdTitle.textContent = row.title

        const tdPrice = document.createElement('td')
        tdPrice.textContent = row.price + ' €'

        const tdButtons = document.createElement('td')

        const editBtn = document.createElement('button')
        editBtn.textContent = 'Modif.'
        editBtn.classList.add('btn', 'btn-outline-warning', 'mx-2')

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Suppr.'
        deleteBtn.classList.add('btn', 'btn-outline-danger', 'mx-2')

        tdButtons.append(editBtn, deleteBtn)

        tr.append(th, tdTitle, tdPrice, tdButtons)

        table.appendChild(tr)
    })
}

window.ipcRenderer.onceInitData(handleInitData)

function handleInitData(e, accountData) {
    const incomes = accountData.filter(d => d.type === 'income')
    populateTable(incomes, 'income')

    const expenses = accountData.filter(d => d.type === 'expense')
    populateTable(expenses, 'expense')
}