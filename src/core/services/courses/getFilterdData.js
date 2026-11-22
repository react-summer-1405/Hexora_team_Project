import Api_Client from "../../interceptor/interceptor"

export const getCourseLevel = async () => { 

const response = await Api_Client.get("/CourseLevel/GetAllCourseLevel");


return response.data
}

export const getCourseTech = async () => { 

const response = await Api_Client.get("/Home/GetTechnologies");

return response.data
}

export const getTeachers = async () => { 

const response = await Api_Client.get("/Home/GetTeachers");

return response.data
}