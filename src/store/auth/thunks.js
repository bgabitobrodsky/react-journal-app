import { signinWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signinWithGoogle();
    }
}