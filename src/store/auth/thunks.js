import {
  singInWithGoogle,
  registerUser,
  singInUser,
  logOutFirebase,
  resetPassword,
} from "../../firebase/providers";
import {
  checkingCredentials,
  logout,
  login,
  setResetPassword,
} from "./authSlice";
import { clearNotesLogOut } from "../journal/journalSlice";

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await singInWithGoogle();

    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, errorMessage, uid, photoURL } = await registerUser({
      email,
      password,
      displayName,
    });
    if (!ok) return dispatch(logout(errorMessage));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startSingIn = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { uid, displayName, photoURL, errorMessage, ok } = await singInUser({
      email,
      password,
    });
    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, photoURL, email }));
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    await logOutFirebase();

    dispatch(clearNotesLogOut());
    dispatch(logout());
  };
};

export const startRestorePassword = ({ email }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, errorMessage } = await resetPassword(email); 

    if (!ok) return dispatch(setResetPassword({ errorMessage, statusMessage: "not-auth"  }));

    dispatch(setResetPassword({ statusMessage: "restoring password"  }));

    // setTimeout(() => {
    //   dispatch(logout());
    // }, 5000);
  };
};
