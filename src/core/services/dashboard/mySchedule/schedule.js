import Api_Client from "../../../interceptor/interceptor";


export const getAllCourseGroups = async () => {
  const response = await Api_Client.get("/CourseGroup")

  return response.data.courseGroupDtos;
};


export const getMySessions = async () => {
  const res = await Api_Client.get("/Schedual/GetMine"
  );

  return res.data;

}

export const getSessionHomeWork = async (sessionId)=>{
  const res = await Api_Client.get(`/Session/GetSessionHomeWork?SessionId=${sessionId}`)

  return res.data
}




export const sendStudent_AP = async (payload) => {
  const res = await Api_Client.post("/Session/Student_AP", payload)

  return res.data
}


export const addHomeWork = async(payload)=>{

    const res = await Api_Client.post("/Session/AddCourseUserHomeWork", payload)

  return res.data
}


export const addExerciseFile =async({homeWorkId,files})=>{

  const formData = new FormData()

  formData.append("CouresUserHomeWorkId", homeWorkId)

    files.forEach((file) => {
    formData.append("ExersiceFiles", file);
  });

      const res = await Api_Client.post("/Session/AddExerciseFile", formData)

  return res.data
}