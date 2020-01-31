import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { getAuthenticationToken } from "../Session";
import { Garden, User, Plant, CheckIn } from "./Types";

// const baseApiUrl = "http://plantiful.herokuapp.com/api";
// const baseApiUrl = "http://plantiful-staging.herokuapp.com/api";

const baseApiUrl =
  Platform.OS == "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";

const defaultHeaders = {
  "content-type": "application/json",
  "session-type": "mobile",
};

interface APIError {
  message: string;
}

interface APIResponse<T> {
  data: T | null;
  error: APIError | null;
}

const baseRequest = async <T>(
  url: string,
  headers: any,
  method: string,
  body: any = null,
): Promise<APIResponse<T>> => {
  return fetch(url, { method, headers, body })
    .then((response: Response): Promise<any> | undefined => {
      if (response.ok) {
        return response.json();
      } else if (response.status == 401) {
        AsyncStorage.removeItem("authentication_token");
        throw new Error("You aren't signed in");
      }

      return undefined;
    })
    .then((result: T) => {
      if (result) {
        return { data: result, error: null };
      } else {
        return {
          data: null,
          error: { message: "Something went wrong" },
        };
      }
    })
    .catch(error => {
      return { data: null, error };
    });
};

const authenticatedRequest = async <T>(
  url: string,
  method: string,
  body: any = null,
): Promise<APIResponse<T>> => {
  const authToken = await getAuthenticationToken();
  const headers = {
    ...defaultHeaders,
    Authorization: `Bearer ${authToken}`,
  };

  return baseRequest(url, headers, method, body);
};

const createPlant = async (
  gardenId: number,
  name: string,
  checkFrequencyUnit: string,
  checkFrequencyScalar: number,
  avatar: string | null,
): Promise<APIResponse<Plant>> => {
  const body = JSON.stringify({
    plant: {
      name,
      check_frequency_scalar: checkFrequencyScalar,
      check_frequency_unit: checkFrequencyUnit,
      avatar,
    },
  });

  return authenticatedRequest<Plant>(
    `${baseApiUrl}/gardens/${gardenId}/plants`,
    "POST",
    body,
  );
};

const updatePlant = async (
  plantId: number,
  name: string,
  checkFrequencyUnit: string,
  checkFrequencyScalar: number,
  avatar: string | null,
): Promise<APIResponse<Plant>> => {
  const body = JSON.stringify({
    plant: {
      name,
      check_frequency_scalar: checkFrequencyScalar,
      check_frequency_unit: checkFrequencyUnit,
      avatar,
    },
  });

  return authenticatedRequest<Plant>(
    `${baseApiUrl}/plants/${plantId}`,
    "PUT",
    body,
  );
};

const fetchPlant = async (plantId: number): Promise<APIResponse<Plant>> => {
  return authenticatedRequest(`${baseApiUrl}/plants/${plantId}`, "GET");
};

const getGarden = async (
  gardenId: number = 1,
): Promise<APIResponse<Garden>> => {
  return authenticatedRequest(`${baseApiUrl}/gardens/${gardenId}`, "GET");
};

const createCheckIn = async (
  plantId: number,
  watered: boolean,
  fertilized: boolean,
  notes: string,
  photos: string[] = [],
): Promise<APIResponse<CheckIn>> => {
  const body = JSON.stringify({
    check_in: {
      watered,
      fertilized,
      notes,
      photos,
    },
  });
  return authenticatedRequest(
    `${baseApiUrl}/plants/${plantId}/check_ins`,
    "POST",
    body,
  );
};

const createGarden = async (name: string): Promise<APIResponse<Garden>> => {
  const body = JSON.stringify({
    garden: {
      name,
    },
  });
  return authenticatedRequest(`${baseApiUrl}/gardens`, "POST", body);
};

const uploadAvatar = async (
  plantId: number,
  photoData: string | null,
): Promise<APIResponse<Plant>> => {
  const body = JSON.stringify({
    plant: { avatar: photoData },
  });

  return authenticatedRequest(
    `${baseApiUrl}/plants/${plantId}/avatar`,
    "POST",
    body,
  );
};

const signIn = async (
  email: string,
  password: string,
): Promise<APIResponse<User>> => {
  const body = JSON.stringify({
    user: {
      email,
      password,
    },
  });
  return baseRequest(`${baseApiUrl}/sessions`, defaultHeaders, "POST", body);
};

const signOut = async (): Promise<APIResponse<Response>> => {
  return authenticatedRequest(`${baseApiUrl}/sign_out`, "DELETE");
};

const signUp = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<APIResponse<User>> => {
  const body = JSON.stringify({
    user: {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    },
  });
  return baseRequest(`${baseApiUrl}/users`, defaultHeaders, "POST", body);
};

export {
  createCheckIn,
  createPlant,
  createGarden,
  fetchPlant,
  getGarden,
  signIn,
  signOut,
  signUp,
  uploadAvatar,
  updatePlant,
};
