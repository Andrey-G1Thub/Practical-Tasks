const notesList = document.querySelector<HTMLDivElement>('#notes-list')

const addNoteForm = document.querySelector<HTMLFormElement>('#add-note-form')
const noteTitle = document.querySelector<HTMLInputElement>('#note-title')
if (addNoteForm && noteTitle) {
  addNoteForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const titleData = noteTitle.value.trim()
    console.log('titleData', titleData)

    if (!titleData) {
      console.log('Title is required')
      return
    }
    // console.log('titleData', titleData)

    const response = await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        title: titleData,
      }),
    })
    const result = await response.json()
    if (response.ok) {
      console.log('result', result)
      if (notesList) {
        const elP = document.createElement('p')
        // elP.textContent = titleData
        elP.textContent = result.note.title

        notesList.append(elP)
      }
      noteTitle.value = ''
      noteTitle.focus()
    }
  })
}
