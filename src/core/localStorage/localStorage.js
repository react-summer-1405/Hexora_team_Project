export const setItem = (key,value)=>{
    const stringValue =JSON.stringify(value)
    localStorage.setItem(key,stringValue)
}

export const setTypeItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItem = (key)=>{
    if(localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key))
        return false
}

export const removeItem = (key)=>{
    localStorage.removeItem(key)
}
