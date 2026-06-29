const titleInput = document.getElementById("titleText");
const noteInput = document.getElementById("notesText");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const selectedNote = document.getElementById("selectedNote");

const notes = [];
let selectedId = null;

function renderNotes(){
    notesList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.textContent = note.title

        div.addEventListener("click", () => {
            selectedId = note.id
            renderSelectedNote();
        });

        notesList.appendChild(div);
    });
}

function renderSelectedNote(){
    
}

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const text = noteInput.value.trim();

    if (!title.trim()) return;

    const note = {
        id: Date.now(),
        title,
        text
    };

    notes.push(note);
    
    renderNotes();

    titleInput.value = "";
    noteInput.value = "";
});
