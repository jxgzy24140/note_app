import { GraphQLScalarType } from "graphql";
import {
  AuthorModel,
  FolderModel,
  NoteModel,
  NotificationModel,
} from "../models/index.js";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (parent, args, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      });
      return folders;
    },
    folder: async (parent, args) => {
      const folder = await FolderModel.findOne({
        _id: args.folderId,
      });
      return folder;
    },
    note: async (parent, args) => {
      const note = await NoteModel.findOne({
        _id: args.noteId,
        folderId: args.folderId,
      });
      return note;
    },
  },
  Folder: {
    author: (parent, args) => {
      const author = AuthorModel.find({
        id: parent.authorId,
      });
      return author && author;
    },
    notes: async (parent, args) => {
      const notes = await NoteModel.find({
        folderId: parent.id,
      });
      return notes;
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({
        name: args.name,
        authorId: context.uid,
      });
      pubsub.publish("FOLDER_CREATED", {
        folderCreated: {
          message: "A new folder was created",
        },
      });
      await newFolder.save();
      return newFolder;
    },
    addNote: async (parent, args, context) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },
    register: async (parent, args) => {
      const user = await AuthorModel.findOne({
        uid: args.uid,
      });
      if (!user) {
        const newUser = new AuthorModel(args);
        await newUser.save();
        return newUser;
      }
      return user;
    },
    updateNote: async (parent, args, context) => {
      const id = args.id;
      await NoteModel.findByIdAndUpdate(id, args);
      const updatedNote = await NoteModel.findOne({ _id: id });
      return updatedNote;
    },
    pushNotification: async (parent, args, context) => {
      const newNotification = await new NotificationModel(args);
      pubsub.publish("PUSH_NOTIFICATION", {
        notification: {
          message: args.content,
        },
      });
      await newNotification.save();
      return { message: "Success" };
    },
    deleteNote: async (parent, args, context) => {
      const note = await NoteModel.findOne({
        _id: args.noteId,
      });
      if (note) {
        await NoteModel.findByIdAndDelete({
          _id: args.noteId,
        });
        return note;
      }
      return { msg: "Note does not exist" };
    },
    deleteFolder: async (parent, args, context) => {
      const folder = await FolderModel.findOne({ _id: args.folderId });
      if (folder) {
        await FolderModel.findByIdAndDelete({ _id: args.folderId });
        return folder;
      }
      return { msg: "Folder does not exist" };
    },
  },
  Subscription: {
    folderCreated: {
      //asyncIterator receive an array because it accepts lots of event's name
      subscribe: () => pubsub.asyncIterator(["FOLDER_CREATED"]),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(["PUSH_NOTIFICATION"]),
    },
  },
};
