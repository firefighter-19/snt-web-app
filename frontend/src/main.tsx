import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { client } from "./graphql";

const container = document.getElementById("app") as HTMLElement;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
