import Api_client from "../../interceptor/interceptor";

export const getProfileInfo = async () => {
  const response = await Api_client.get("/SharePanel/GetProfileInfo");
  return response.data;
};


export const updateProfileInfo = async (data) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const response = await Api_client.put("/SharePanel/UpdateProfileInfo", formData);
  return response.data;
};

export const addProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("formFile", file);

  const response = await Api_client.post("/SharePanel/AddProfileImage", formData);
  return response.data;
};

export const selectProfileImage = async (imageId) => {
  const formData = new FormData();
  formData.append("ImageId", imageId);

  const response = await Api_client.post("/SharePanel/SelectProfileImage", formData);
  return response.data;
};


export const deleteProfileImage = async (imageId) => {
  const formData = new FormData();
  formData.append("DeleteEntityId", imageId);

  const response = await Api_client.delete("/SharePanel/DeleteProfileImage", {
    data: formData,
  });
  return response.data;
};