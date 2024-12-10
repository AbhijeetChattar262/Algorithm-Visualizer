
import React, { createContext, useState } from 'react';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ChatbotContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ChatbotContext.Provider>
  );
};