import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import Header from "./components/Header/Header";
import { createStore } from "redux";
import reducer from "./redux/Reducer";
const store = createStore(reducer);
function App() {

  return (
    <>
      <Provider store={store}>
        <Header />
      </Provider>
    </>
  );
}

export default App;
