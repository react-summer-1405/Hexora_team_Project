import Api_Client from "../../../interceptor/interceptor";


export const getSessionFileAndGroup= async (sessionId) => {
  const res = await Api_Client.get(`/Session/SessionDetail?SessionId=${sessionId}`
  );

  return res.data;

}


export const getMySessions = async () => {
  const res = await Api_Client.get("/Schedual/GetMine"
  );

  return res.data;

}

export const getSessionHomeWork = async ()=>{
  const res = await Api_Client.get(`/Session/StudentHomeworkList`)

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


export const addExerciseFile =async({courseUserHomeWorkId,files})=>{

  const formData = new FormData()

  formData.append("CouresUserHomeWorkId", courseUserHomeWorkId)

    files.forEach((file) => {
    formData.append("ExersiceFiles", file);
  });

      const res = await Api_Client.post("/Session/AddExerciseFile", formData)

  return res.data
}