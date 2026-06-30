const titleInput = document.getElementById("titleText");
const noteInput = document.getElementById("notesText");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");
const selectedNote = document.getElementById("selectedNote");
const searchInput = document.getElementById("searchInput");
const delBtn = document.getElementById("delBtn");
const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

// STATE VARIABLES //////////
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedId = null;
let searchText = "";
let isEditing = false;

// USER INTERACTION /////////////
searchInput.addEventListener("input", () => {
  searchText = searchInput.value.toLowerCase();
  render();
});

delBtn.addEventListener("click", () => {
  if (!selectedId) return;

  notes = notes.filter((note) => note.id !== selectedId);
  selectedId = null;
  isEditing = false; 

  render();
});

editBtn.addEventListener("click", () => {
  if (!selectedId) return;

  isEditing = true;
  render();
});

addBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const text = noteInput.value.trim();

  if (!title) return;

  const note = {
    id: Date.now(),
    title,
    text,
  };

  notes.push(note);
  selectedId = note.id;
  isEditing = false;

  render();

  titleInput.value = "";
  noteInput.value = "";
});

saveBtn.addEventListener("click", () => {
  const currentNote = notes.find((note) => note.id === selectedId);
  if (!currentNote) return;


  const editTitleInput = document.getElementById("editTitleInput");
  const editTextArea = document.getElementById("editTextArea");

  if (editTitleInput && editTextArea) {
    currentNote.title = editTitleInput.value.trim();
    currentNote.text = editTextArea.value.trim();
  }

  isEditing = false;
  render();
});

cancelBtn.addEventListener("click", () => {
  isEditing = false;
  render();
});

// RENDER FUNCTIONS //////////////

function renderButtons() {
  if (!selectedId) {
    saveBtn.classList.add("hidden");
    cancelBtn.classList.add("hidden");
    delBtn.classList.add("hidden");
    editBtn.classList.add("hidden");
    return;
  }

  if (isEditing) {
    saveBtn.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
    delBtn.classList.add("hidden");
    editBtn.classList.add("hidden");
  } else {
    saveBtn.classList.add("hidden");
    cancelBtn.classList.add("hidden");
    delBtn.classList.remove("hidden");
    editBtn.classList.remove("hidden");
  }
}

function renderNotes() {
  notesList.innerHTML = "";

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText),
  );

  filteredNotes.forEach((note) => {
    const div = document.createElement("div");
    div.textContent = note.title;

    div.addEventListener("click", () => {
      if (selectedId === note.id) return; 

      selectedId = note.id;
      isEditing = false; 
      render();
    });

    if (note.id === selectedId) {
      div.classList.add("active");
    }

    notesList.appendChild(div);
  });
}

function renderSelectedNote() {
  const currentNote = notes.find((note) => note.id === selectedId);

  const isFilteredOut = currentNote && !currentNote.title.toLowerCase().includes(searchText);
  if (!currentNote || isFilteredOut) {
    selectedNote.innerHTML = "";
    return;
  }

  if (isEditing) {

    if (!document.getElementById("editTitleInput")) {
      selectedNote.innerHTML = "";

      const editTitleInput = document.createElement("input");
      editTitleInput.id = "editTitleInput";
      editTitleInput.value = currentNote.title;

      const editTextArea = document.createElement("textarea");
      editTextArea.id = "editTextArea";
      editTextArea.value = currentNote.text;

      selectedNote.appendChild(editTitleInput);
      selectedNote.appendChild(editTextArea);
    }
  } else {

    selectedNote.innerHTML = "";

    const div = document.createElement("div");
    const headline = document.createElement("h2");
    const para = document.createElement("p");

    headline.textContent = currentNote.title;
    para.textContent = currentNote.text;

    div.appendChild(headline);
    div.appendChild(para);
    selectedNote.appendChild(div);
  }
}

function render() {
  localStorage.setItem("notes", JSON.stringify(notes));

  renderNotes();
  renderSelectedNote();
  renderButtons();
}