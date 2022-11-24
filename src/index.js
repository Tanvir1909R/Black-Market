import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import UrlContext from "./contexts/UrlContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "swiper/css/bundle";
import "./styles.css";
import UserContext from "./contexts/UserContext";

const queryClint = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContext>
      <UrlContext>
        <QueryClientProvider client={queryClint}>
          <App />
        </QueryClientProvider>
      </UrlContext>
    </UserContext>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
