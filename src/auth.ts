import AsyncStorage from "@react-native-community/async-storage";

const USER_KEY = "auth-demo-key";

const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

const checkIfSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export { onSignIn, onSignOut, checkIfSignedIn, USER_KEY };
