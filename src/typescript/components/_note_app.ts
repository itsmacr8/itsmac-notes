const notesContainer = document.querySelector('[data-note="container"]');
const addNoteButton = document.querySelector('[data-note="add-button"]');
const searchForm = document.querySelector('[data-search="form"]');
const searchInput = document.querySelector('[data-search="input"]') as HTMLInputElement;
const addNoteTitle = document.querySelector('[data-note="title"]') as HTMLInputElement;
const addNoteText = document.querySelector('[data-note="body"]') as HTMLInputElement;

// Show notes from localStorage
function showNotes() {
    const saveNotes = checkNotes();
    if (saveNotes.length !== 0) {
        saveNotes.forEach((note: any, index: string) => {
            notesContainer?.insertAdjacentHTML('beforeend', `<div class=card data-note-id=${index}><div class=card-body><h3 class=card-title><strong>${note.title}</strong><p class=card-text>${note.text}</p><button class="btn btn--danger"data-note=delete-button id=${index}>Delete Note</button></div></div>`);
        });
    } else {
        notesContainer?.insertAdjacentHTML('beforeend', '<p class="text-center">Nothing to show! Use "Add a Note" to add a new note.</p>');
    }
}

function checkNotes() {
    const notes = localStorage.getItem('notes'); // Getting notes from localStorage.
    let savedNotes = []; //  Creating an empty array if no notes inside localStorage.
    if (notes) savedNotes = JSON.parse(notes);
    return savedNotes;
}

// If user adds a note, add it to the localStorage
function addNote() {
    const saveNotes = checkNotes();
    const note = {
        title: addNoteTitle.value,
        text: addNoteText.value,
    };
    if (note.title !== '' && note.text !== '') {
        saveNotes.push(note);
        localStorage.setItem('notes', JSON.stringify(saveNotes)); // convert the array into a string and save it to the localStorage.
        addNoteTitle.value = '';
        addNoteText.value = '';
        // Remove all the notes from the screen and show the new notes with existing notes.
        while (notesContainer?.firstChild) notesContainer?.firstChild.remove();
        showNotes(); // Calling show notes so that it can render new notes which is created now.
    }
}

// Delete a note
function deleteNote(index: string) {
    const saveNotes = checkNotes();
    saveNotes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(saveNotes));
    while (notesContainer?.firstElementChild) notesContainer?.firstElementChild.remove();
    showNotes();
}

showNotes();

addNoteButton?.addEventListener('click', addNote);
notesContainer?.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const noteId = target.id;
    target.dataset.note === 'delete-button' && deleteNote(noteId);
});

searchForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll('[data-note-id]') as NodeListOf<HTMLElement>;
    for (const note of notes) {
        const titleEl = note.querySelector('.card-title')! as HTMLElement;
        const textEl = note.querySelector('.card-text')! as HTMLElement;
        const titleValue: string = titleEl.innerText.toLowerCase();
        const textValue: string = textEl.innerText.toLowerCase();
        if (!titleValue.includes(searchValue) || !textValue.includes(searchValue)) {
            note.classList.add('js-note-hidden');
            console.log(notesContainer?.children);
        } else {
            note.classList.remove('js-note-hidden');
        }
    }
});
