

export const validateAuthSingIn = (data) => {
    if (data.username === null || data.username === "" || data.password === null || data.password === "") {
        return false
    }else{
        return true;
    }
}