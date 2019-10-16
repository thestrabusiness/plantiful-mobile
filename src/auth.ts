import AsyncStorage from "@react-native-community/async-storage";

interface User {
  id: number;
  default_garden_id: number;
  first_name: string;
  last_name: string;
  email: string;
  remember_token: string;
}

const USER_KEY = "authentication_token";

const onSignIn = (): Promise<void> => {
  return fetch("http://localhost:3000/api/sessions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      user: {
        email: "uncletony@example.com",
        password: "password",
      },
    }),
  })
    .then(
      (response: Response): Promise<User> => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      },
    )
    .then((user: User): void => {
      AsyncStorage.setItem(USER_KEY, user.remember_token);
    })
    .catch((error: Error): void => console.error(error.message));
};

const onSignOut = (): Promise<void> => AsyncStorage.removeItem(USER_KEY);

const checkIfSignedIn = (): Promise<void> => {
  return new Promise((resolve, reject): void => {
    AsyncStorage.getItem(USER_KEY)
      .then((res: boolean | null): void => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err: any): void => reject(err));
  });
};

export { onSignIn, onSignOut, checkIfSignedIn, USER_KEY };
