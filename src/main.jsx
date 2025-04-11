import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeContextProvider from "./context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}> {/* Подключаем Redux */}
      <ThemeContextProvider> {/* Подключаем Context для темы */}
        <App />
      </ThemeContextProvider>
    </Provider>
  </StrictMode>
);
