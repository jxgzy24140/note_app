interface Note {
  folderId: string;
  content: string;
  id: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  notes: Note[];
}

export interface Response {
  folders: Folder[];
}

interface INoteResponse {
  id: string;
  noteId: string;
  content: string;
  updatedAt: string;
}

export interface INoteListProps {
  folder: {
    id: string;
    notes: INoteResponse[];
  };
}

export interface INoteProps {
  note: Note;
}
