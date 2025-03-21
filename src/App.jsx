import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { ChatbotProvider } from "./context/ChatbotContext"; // Import provider

function App() {
  injectSpeedInsights();
  return (
    <ChatbotProvider>
      {" "}
      {/* Wrap with provider */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ChatbotProvider>
  );
}

export default App;
