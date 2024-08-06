import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import User from "./pages/User";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "user",
        element: <User />,
      },
      {
        path: "admin",
        element: <div>admin</div>,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
