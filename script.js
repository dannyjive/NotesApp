const titleInput = document.getElementById("titleText");
const noteInput = document.getElementById("notesText");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const selectedNote = document.getElementById("selectedNote");

const notes = [];

function renderNotes(){
    notesList.innerHTML = "";

    notes.forEach(note => {
        const div = document.createElement("div");
        div.textContent = note.title

        notesList.appendChild(div);
    });
}

addBtn.addEventListener("click", () => {
  const title = titleInput.value;
  const text = noteInput.value;

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
