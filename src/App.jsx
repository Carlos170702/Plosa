import React from "react";
import { InitialRouter } from "../router/InitialRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <div className="min-h-screen	">
      <Provider store={store}>
        <InitialRouter />
      </Provider>
    </div>
  );
};

export default App;
