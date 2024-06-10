const inputElement = document.getElementById('input')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')
const notes = JSON.parse(localStorage.getItem('notes')) || []

listElement.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed
        } else if (type === 'remove') {
            notes.splice(index, 1)
        }
        render()
    }
}

function render() {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет задач</p>'
    }
    for (let i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
}
render()

function getNoteTemplate(note, index) {
    localStorage.setItem('notes', JSON.stringify(notes))
    return `<li class="list-item">
    <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
    <div class="btn-small">
        <span title="Выполнено" class="btn-success${note.completed ? '-yellow' : ''}" data-index ="${index}" data-type ="toggle">✔</span>
        <span title="Удалить" class="btn-no" data-index ="${index}" data-type ="remove">X</span>
    </div>
</li>`
}

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return
    }
    const newNote = {
        title: inputElement.value,
        completed: false,
    }
    notes.push(newNote)
    localStorage.setItem('notes', JSON.stringify(notes))
    render()
    inputElement.value = ''
}

inputElement.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        if (inputElement.value.length === 0) {
            return
        }
        const newNote = {
            title: inputElement.value,
            completed: false,
        }
        notes.push(newNote)
        localStorage.setItem('notes', JSON.stringify(notes))
        render()
        inputElement.value = ''
    }
});
