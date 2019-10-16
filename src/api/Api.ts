import { getAuthenticationToken } from "../auth";
import AsyncStorage from "@react-native-community/async-storage";
import { Plant, User } from "./Types";

const baseApiUrl = "http://localhost:3000/api";

const getPlants = async (gardenId: number = 1): Promise<Plant[] | void> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/gardens/${gardenId}/plants`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response: Response): Promise<Plant[]> | undefined => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 401) {
        AsyncStorage.removeItem("authentication_token");
        return undefined;
      } else {
        throw Error(response.statusText);
      }
    })
    .then((plants: Plant[] | undefined): Plant[] | undefined => {
      return plants;
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

export { getPlants, signIn };
