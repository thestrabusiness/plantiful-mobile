import AsyncStorage from "@react-native-community/async-storage";
import { signIn, signOut, signUp } from "./api/Api";

const AUTH_TOKEN_KEY = "authentication_token";
const USER_KEY = "current_user";

const getAuthenticationToken = (): Promise<string> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(AUTH_TOKEN_KEY)
      .then((token: string | null): void => {
        if (token !== null) {
          resolve(token);
        } else {
          resolve("");
        }
      })
      .catch((error: any): void => reject(error));
  });
};

const onSignIn = async (email: string, password: string): Promise<boolean> => {
  return signIn(email, password).then((response): boolean => {
    if (response.data) {
      AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.mobile_api_token);
      AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
      return true;
    } else {
      return false;
    }
  });
};

const onSignOut = async (): Promise<void> => {
  await signOut();
  AsyncStorage.removeItem(AUTH_TOKEN_KEY);
};

const onSignUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<boolean> => {
  return signUp(firstName, lastName, email, password).then(
    (response): boolean => {
      if (response.data) {
        AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.mobile_api_token);
        AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
        return true;
      } else {
        return false;
      }
    },
  );
};

const checkIfSignedIn = (): Promise<boolean> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(AUTH_TOKEN_KEY)
      .then((res: string | null): void => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err: any): void => reject(err));
  });
};

const retrieveCurrentUser = (): Promise<void> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(USER_KEY)
      .then((res: string | null): void => {
        if (res !== null) {
          resolve(JSON.parse(res));
        } else {
          resolve(undefined);
        }
      })
      .catch((err: any): void => reject(err));
  });
};

export {
  onSignIn,
  onSignOut,
  onSignUp,
  checkIfSignedIn,
  getAuthenticationToken,
  retrieveCurrentUser,
};
