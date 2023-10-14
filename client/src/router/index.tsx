/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import {
  getAllFolders,
  getNoteList,
  getNote,
  addNewNote,
  updateNote,
} from "../utils";
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            loader: getAllFolders,
            path: "/",
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,
                loader: getNoteList,
                action: addNewNote,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    loader: getNote,
                    action: updateNote,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
