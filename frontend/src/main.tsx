import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "src/context/snt_context";
import { App } from "./App";
import { client } from "./graphql";

const container = document.getElementById("app") as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </ApolloProvider>
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
