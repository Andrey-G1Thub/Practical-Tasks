export interface Note {
  id: string
  title: string
}

export type CreateNoteDto = Pick<Note, 'title'>
