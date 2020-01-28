import React, { useState, ReactElement } from "react";
import { createAppContainer } from "react-navigation";

import { checkIfSignedIn } from "./src/Session";
import AppNavigator from "./src/components/Router";
import ImageViewProvider from "./src/ImageViewProvider";

const App = (): ReactElement => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  if (!isSignedIn) {
    checkIfSignedIn().then((res: any) => setIsSignedIn(res));
  }

  const AppContainer = createAppContainer(AppNavigator(isSignedIn));

  return (
    <ImageViewProvider>
      <AppContainer />
    </ImageViewProvider>
  );
};

export default App;
