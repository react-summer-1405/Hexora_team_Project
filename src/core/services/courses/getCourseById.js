import Api_Client from "../../interceptor/interceptor"

const getCourseById = async(id) => {

  const response = await Api_Client.get(`/Home/GetCourseDetails?CourseId=${id}`);
return response.data
}

export default getCourseById