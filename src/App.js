import React from "react";
import "./styles/global.scss";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import SetAvatar from "./pages/SetAvatar/SetAvatar";
import Auth from "./pages/Auth/Auth";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="avatar" element={<SetAvatar />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
