
import { createBrowserRouter } from "react-router-dom";
import LandingPage from './../pages/LandingPage';
import MainLayout from "../Components/layouts/MainLayout";
import CoursesPage from "../pages/CoursesPage";

const router = createBrowserRouter([
 {path:'/', element:<MainLayout/>, children:[
     {index:true , element:<LandingPage/>,},
     {path:"/courses" , element:<CoursesPage/>}
     
 ]}
]);

export default router;
