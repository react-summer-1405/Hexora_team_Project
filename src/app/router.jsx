
import { createBrowserRouter } from "react-router-dom";
import LandingPage from './../pages/LandingPage';
import MainLayout from "../Components/layouts/MainLayout";

const router = createBrowserRouter([
 {path:'/', element:<MainLayout/>, children:[
     {index:true , element:<LandingPage/>,},
     
 ]}
]);

export default router;
