import React from "react";
import "./styles/global.scss";
import styles from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Auth from "./pages/Auth/Auth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
