const titleInput = document.getElementById("titleText");
const noteInput = document.getElementById("notesText");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const selectedNote = document.getElementById("selectedNote");
const searchInput = document.getElementById("searchInput");

const notes = [];
let selectedId = null;
let searchText = "";

function renderNotes() {
    notesList.innerHTML = "";
    
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchText))

    filteredNotes.forEach((note) => {
        const div = document.createElement("div");
        div.textContent = note.title;
        
        
        
        div.addEventListener("click", () => {
            selectedId = note.id;
            
            renderNotes();
            renderSelectedNote();
        });
        
        if (note.id === selectedId) {        
            div.classList.add('active');
        }
        
        notesList.appendChild(div);
    });
}

searchInput.addEventListener("input", () => {
    searchText = searchInput.value.toLowerCase();

    renderNotes()
})

function renderSelectedNote() {
  selectedNote.innerHTML = "";

  const div = document.createElement("div");
  const headline = document.createElement("h2");
  const para = document.createElement("p");

  const currentNote = notes.find((note) => note.id === selectedId);
  
  if (!currentNote) return;
  
  headline.textContent = currentNote.title;
  para.textContent = currentNote.text

  div.appendChild(headline);
  div.appendChild(para);
  selectedNote.appendChild(div);

}

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const text = noteInput.value.trim();

  if (!title.trim()) return;

  const note = {
    id: Date.now(),
    title,
    text,
  };

  notes.push(note);

  selectedId = note.id;

  renderNotes();
  renderSelectedNote();

  titleInput.value = "";
  noteInput.value = "";
});
