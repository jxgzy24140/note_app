export const typeDefs = `#graphql
  scalar Date

  type Author {
    uid: String,
    name: String
  }

  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String
    folderId: String
    updatedAt: Date
  }

  type Query {
    folders: [Folder],
    folder(folderId: String): Folder,
    note(noteId: String, folderId: String): Note
  }

  type Mutation {
    addFolder(name: String!): Folder,
    deleteFolder(folderId: String): Folder
    addNote(content: String!, folderId: String!): Note
    deleteNote(noteId: String): Note
    updateNote(content: String!, id: String!): Note
    register(uid: String!, name: String!): Author
    pushNotification(content: String): Message
  }

  type Message {
    message: String
  }

  type Subscription {
    folderCreated: Message
    notification: Message
  }
`;
