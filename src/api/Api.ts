import { getAuthenticationToken } from "../Session";
import AsyncStorage from "@react-native-community/async-storage";
import { Garden, User } from "./Types";

const baseApiUrl = "http://localhost:3000/api";

const getGarden = async (gardenId: number = 1): Promise<Garden | void> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/gardens/${gardenId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response: Response): Promise<Garden | undefined> => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 401) {
          AsyncStorage.removeItem("authentication_token");
          return undefined;
        } else {
          throw Error(response.statusText);
        }
      },
    )
    .then((result: Garden | undefined): Garden | undefined => {
      return result;
    })
    .catch((error: Error): void => console.error(error.message));
};

const signIn = async (email: string, password: string): Promise<User> => {
  return fetch(`${baseApiUrl}/sessions`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  }).then(
    (response: Response): Promise<User> => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    },
  );
};

const signOut = (): Promise<Response> => {
  return fetch(`${baseApiUrl}/sign_out`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
};

const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<User> => {
  return fetch(`${baseApiUrl}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      },
    }),
  }).then(
    (response: Response): Promise<User> => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    },
  );
};

export { getGarden, signIn, signOut, signUp };
