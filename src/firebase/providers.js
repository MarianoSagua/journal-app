import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - inicio de sesion - google",
    };
  }
};

export const registerUser = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - registro",
    };
  }
};

export const singInUser = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - inicio de sesion",
    };
  }
};

export const logOutFirebase = async () => {
  return await FirebaseAuth.signOut();
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(FirebaseAuth, email);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: "Error - restore password",
    };
  }
};
