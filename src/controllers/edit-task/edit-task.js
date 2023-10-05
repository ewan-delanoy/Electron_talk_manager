const newTaskForm = document.querySelector('#newTaskForm');
const labelInput = document.querySelector('#labelInput');
const descriptionInput = document.querySelector('#descriptionInput');
const statusCheckbox = document.querySelector('#statusCheckbox');


newTaskForm.addEventListener('submit', (e) => {
    console.log("Insert modal 1 : Entering event listener for insert form in controllers/new-task.js");
    e.preventDefault();
    const label = labelInput.value;
    const description = descriptionInput.value;
    const status = statusCheckbox.checked;
    const task = { label, description, status };
    window.ipcRenderer.invokeAddNewTask(task, (res) => {
        console.log("Insert modal 2 : Entering invoke method for insert form in controllers/new-task.js");
        newTaskForm.reset();
        const divMsg = document.getElementById('successMsg');
        divMsg.hidden = false;
        divMsg.textContent = res;
    });
})