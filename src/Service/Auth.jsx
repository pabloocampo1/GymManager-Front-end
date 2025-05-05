import {api} from "./api"

export const tokenResetPassword = async (email) => {
    try {
        const response = await api.get("/api/auth/generateResetPasswordToken/"+ email);

        if (response.status == 200) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        
    }
}

export const resetPassword = async (password, token) => {
    try {
        const response = await api.post("/api/auth/resetPassword", {
            token: token,
            password:password
        } );

        if (response.status == 200) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        
    }
}
