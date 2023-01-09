import { signinWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        const result = await signinWithGoogle();

        if( !result.ok ) return dispatch( logout( result ))
        
        dispatch( login( result ))
    }
}