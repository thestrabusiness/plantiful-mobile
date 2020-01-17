import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { getAuthenticationToken } from "../Session";
import { Garden, User, Plant } from "./Types";

const baseApiUrl =
  Platform.OS == "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";

const defaultHeaders = {
  "content-type": "application/json",
  "session-type": "mobile",
};

const createPlant = async (
  gardenId: number,
  name: string,
  checkFrequencyUnit: string,
  checkFrequencyScalar: number,
): Promise<Plant | void> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/gardens/${gardenId}/plants`, {
    method: "POST",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      plant: {
        name,
        check_frequency_scalar: checkFrequencyScalar,
        check_frequency_unit: checkFrequencyUnit,
      },
    }),
  })
    .then(
      (response: Response): Promise<Plant | undefined> => {
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
    .then((result: Plant | undefined): Plant | undefined => {
      return result;
    })
    .catch((error: Error): void => console.error(error.message));
};

const fetchPlant = async (plantId: number): Promise<Plant | void> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/plants/${plantId}`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then(
      (response: Response): Promise<Plant | undefined> => {
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
    .then((result: Plant | undefined): Plant | undefined => {
      return result;
    })
    .catch((error: Error): void => console.error(error.message));
};

const getGarden = async (gardenId: number = 1): Promise<Garden | void> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/gardens/${gardenId}`, {
    method: "GET",
    headers: {
      ...defaultHeaders,
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
    headers: defaultHeaders,
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

const signOut = async (): Promise<Response> => {
  const authToken = await getAuthenticationToken();

  return fetch(`${baseApiUrl}/sign_out`, {
    method: "DELETE",
    headers: {
      ...defaultHeaders,
      Authorization: `Bearer ${authToken}`,
    },
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
    headers: defaultHeaders,
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

export { createPlant, fetchPlant, getGarden, signIn, signOut, signUp };
