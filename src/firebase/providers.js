import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signinWithGoogle = async () => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        const credentials = GoogleAuthProvider.credentialFromResult( result ); 

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch ( e ) {

        const errorCode = e.code;
        const errorMessage = e.message;

        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName });

        return { ok: true, uid, photoURL, email, displayName }

    } catch (e) {
        return { ok: false, errorMessage: e.message }
    }
}


export const loginWithEmailPassword = async ({ email, password }) => {

    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        console.log( resp );
        const { uid, photoURL, displayName } = resp.user;

        return { ok: true, uid, photoURL, email, displayName }
        
    }catch (e){
        return { ok: false, errorMessage: e.message }
    }
}