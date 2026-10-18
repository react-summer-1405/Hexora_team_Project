
import { createBrowserRouter } from "react-router-dom";
import LandingPage from './../pages/LandingPage';
import MainLayout from "../Components/layouts/MainLayout";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";

const router = createBrowserRouter([
 {path:'/', element:<MainLayout/>, children:[
     {index:true , element:<LandingPage/>,},
     {path:"/courses" , element:<CoursesPage/>},
     {path:"courses:{id}", element:<CourseDetailPage/>}
     
 ]}
]);

export default router;
