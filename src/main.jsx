import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";

import "./index.css";
import App from "./Pages/App.jsx";
import Home from "./Pages/Home.jsx";
import ActressPage from "./Pages/actress.jsx";
import WatchPage from "./Pages/watch.jsx";
import Login from "./Pages/loginpage.jsx";
import ProtectedRoute from "./component/protectrout/protectrout.jsx";
import SearchPage from "./Pages/search.jsx";
import Upload from "./Pages/upload.jsx";

const router = createHashRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "watch/:id",
          element: <WatchPage />,
        },
        {
          path: "series/:name",
          element: <SeriesPage />,
        },
        {
          path: "actress/:name",
          element: <ActressPage />,
        },
        {
          path: "search/:keyword",
          element: <SearchPage />,
        },
        {
          path: "upload",
          element: <Upload />,
        },
      ],
    },
  ],
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
