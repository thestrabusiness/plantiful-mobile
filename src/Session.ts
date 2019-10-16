import AsyncStorage from "@react-native-community/async-storage";
import { signIn, signOut, signUp } from "./api/Api";
import { User } from "./api/Types";

const USER_KEY = "authentication_token";

const getAuthenticationToken = (): Promise<string> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(USER_KEY)
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

const onSignIn = (email: string, password: string): Promise<boolean> => {
  return signIn(email, password)
    .then((user: User): boolean => {
      AsyncStorage.setItem(USER_KEY, user.remember_token);
      return true;
    })
    .catch((): boolean => {
      return false;
    });
};

const onSignOut = async (): Promise<void> => {
  await signOut();
  AsyncStorage.removeItem(USER_KEY);
};

const onSignUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<boolean> => {
  return signUp(firstName, lastName, email, password)
    .then((user: User): boolean => {
      AsyncStorage.setItem(USER_KEY, user.remember_token);
      return true;
    })
    .catch((): boolean => {
      return false;
    });
};

const checkIfSignedIn = (): Promise<void> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(USER_KEY)
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

export {
  onSignIn,
  onSignOut,
  onSignUp,
  checkIfSignedIn,
  USER_KEY,
  getAuthenticationToken,
};
