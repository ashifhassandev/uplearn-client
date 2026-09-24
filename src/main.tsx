import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import ConfirmModalProvider from "./components/common/confirm-modal/ConfirmModalProvider";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import App from "./App";
import GlowLoader from "@/components/PageLoader";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
            <GlowLoader />
          </div>
        }
        persistor={persistor}
      >
        <ConfirmModalProvider>
          <App />
        </ConfirmModalProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);