import { request as graphqlRequest } from "./request";

export const register = async ({ uid, displayName }) => {
  const query = `mutation Mutation($uid: String!, $name: String!)
    {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }
  `;
  const data = await graphqlRequest({
    query: query,
    variables: {
      uid,
      name: displayName,
    },
  });
  return data;
};

export const getAllFolders = async () => {
  const query = `query Folders {
      folders {
        id
        name
        createdAt
        notes {
          folderId
          content
          id
        }
      }
    }`;
  const data = await graphqlRequest({
    query: query,
  });

  return data;
};

export const getNoteList = async ({ params }) => {
  const query = `query Folder($folderId: String) {
      folder(folderId: $folderId) {
        id
        notes {
          id
          content
          updatedAt
        }
      }
    }`;

  const data = await graphqlRequest({
    query,
    variables: {
      folderId: params.folderId,
    },
  });
  return data;
};

export const getNote = async ({ params }) => {
  const query = `query Note($noteId: String, $folderId: String) {
    note(noteId: $noteId, folderId: $folderId) {
      id
      content
      folderId
    }
  }`;
  const data = await graphqlRequest({
    query,
    variables: {
      noteId: params.noteId,
      folderId: params.folderId,
    },
  });
  return data;
};

export const addNewFolder = async (folder) => {
  const query = `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      id
      name
    }
  }
`;
  const data = await graphqlRequest({
    query: query,
    variables: { name: folder },
  });
  return data;
};

export const addNewNote = async ({ request }) => {
  const newNote = await request.formData();
  const formDataObj = { content: String, folderId: String };
  newNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `
  mutation Mutation($content: String!, $folderId: String!) {
    addNote(content: $content, folderId: $folderId) {
      content
      folderId
      id
    }
  }
  `;
  const data = await graphqlRequest({
    query,
    variables: {
      content: formDataObj.content,
      folderId: formDataObj.folderId,
    },
  });

  return data;
};

export const updateNote = async ({ request }) => {
  const updatedNote = await request.formData();
  const formDataObj = { content: String, folderId: String, id: String };
  updatedNote.forEach((value, key) => (formDataObj[key] = value));
  const query = `
  mutation Mutation($content: String!, $id: String!) {
    updateNote(content: $content, id: $id) {
      id
      content
      folderId
    }
  }
  `;
  const data = await graphqlRequest({
    query,
    variables: {
      id: formDataObj.id,
      content: formDataObj.content,
    },
  });

  return data;
};
