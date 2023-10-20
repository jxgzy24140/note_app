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
  console.log("loader [getAllFolders]");

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
  console.log("loader [getNoteList]");

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
  console.log("loader [getNote]");
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
  console.log("note: ", data);

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

export const noteAction = async ({ request }) => {
  const formDataObj = {
    content: "",
    folderId: "",
    id: "",
    type: "",
    noteId: "",
  };
  const updatedNote = await request.formData();
  updatedNote.forEach((value, key) => (formDataObj[key] = value));

  let query = "";
  let variables = {};
  if (formDataObj.type == "edit") {
    query = `
    mutation Mutation($content: String!, $id: String!) {
      updateNote(content: $content, id: $id) {
        id
        content
        folderId
      }
    }
    `;
    variables = {
      id: formDataObj.id,
      content: formDataObj.content,
    };
  }
  if (formDataObj.type === "add") {
    query = `
    mutation Mutation($content: String!, $folderId: String!) {
      addNote(content: $content, folderId: $folderId) {
        id
        content
        folderId
        updatedAt
      }
    }
    `;
    variables = {
      content: formDataObj.content,
      folderId: formDataObj.folderId,
    };
  }
  if (formDataObj.type === "delete") {
    query = `
    mutation Mutation($noteId: String) {
      deleteNote(noteId: $noteId) {
        id
        content
      }
    }
    `;
    variables = {
      noteId: formDataObj.noteId,
    };
  }
  const data = await graphqlRequest({
    query,
    variables: variables,
  });
  return data;
};
