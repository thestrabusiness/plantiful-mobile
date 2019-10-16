import React, { useState } from "react";
import { checkIfSignedIn } from "./src/auth";
import AppNavigator from "./src/components/Router";
import { createAppContainer } from "react-navigation";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  if (!isSignedIn) {
    checkIfSignedIn().then((res: any) => setIsSignedIn(res));
  }

  const AppContainer = createAppContainer(AppNavigator(isSignedIn));

  return <AppContainer />;
};

export default App;
