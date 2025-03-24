import React, { useState, useEffect } from "react";
import Algorithm from "../Algorithm/Algorithm";
import DefaultPage from "../DefaultPage/DefaultPage";
import Sidebar from "../../components/Sidebar/Sidebar";
import { algorithmCategories } from "../../constants";
import "./Home.css";
import SearchingVisualizer from "../../components/SearchingVisualizer/SearchingVisualizer";

const Home = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="home">
      <Sidebar
        setSelectedAlgorithm={setSelectedAlgorithm}
        onCollapseChange={setIsSidebarCollapsed}
      />
      <div style={{ width: "100%" }}>
        {selectedAlgorithm ? (
          <Algorithm
            algorithm={selectedAlgorithm}
            sidebarCollapsed={isSidebarCollapsed}
          />
        ) : (
          <DefaultPage />
        )}
      </div>
    </div>
  );
};

export default Home;
