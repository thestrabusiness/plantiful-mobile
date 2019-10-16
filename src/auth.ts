import AsyncStorage from "@react-native-community/async-storage";
import { signIn } from "./api/Api";

interface User {
  id: number;
  default_garden_id: number;
  first_name: string;
  last_name: string;
  email: string;
  remember_token: string;
}

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

const onSignIn = (): Promise<void> => {
  return signIn("uncletony@example.com", "password")
    .then((user: User): void => {
      AsyncStorage.setItem(USER_KEY, user.remember_token);
    })
    .catch((error: Error): void => console.error(error.message));
};

const onSignOut = (): Promise<void> => AsyncStorage.removeItem(USER_KEY);

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
  checkIfSignedIn,
  USER_KEY,
  getAuthenticationToken,
  User,
};
