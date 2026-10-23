import "../assets/styles/app.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster containerStyle={{top:25}}/>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
