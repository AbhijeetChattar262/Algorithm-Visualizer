import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import styles from "./Algorithm.module.css";
import InfoSection from "../../components/Algorithm/InfoSection/InfoSection";
import Visualization from "../../components/Algorithm/Visualization/Visualization";
import SearchingVisualizer from "../../components/SearchingVisualizer/SearchingVisualizer";
import Chatbot from "../../components/Algorithm/Chatbot/Chatbot";
import GraphVisualizer from "../../components/GraphVisualizer/GraphVisualizer";
import DataStructuresVisualizer from "../../components/DataStructuresVisualizer/DataStructuresVisualizer";
import PathfindingVisualizer from "../../components/PathfindingVisualizer/PathfindingVisualizer";

export default function Algorithm({ algorithm, sidebarCollapsed }) {
  const [isChatbotExpanded, setIsChatbotExpanded] = useState(false);
  const [prevAlgorithm, setPrevAlgorithm] = useState("");

  // Keep track of algorithm changes to help with transitions
  useEffect(() => {
    setPrevAlgorithm(algorithm);
  }, [algorithm]);

  const isSorting = algorithm.includes("sort");
  const isSearching = algorithm.includes("search");
  const isGraph = algorithm.includes("graph_");
  const isDataStructure = ["array", "linked_list", "stack", "queue"].includes(
    algorithm
  );
  const isPathfinding = ["a*", "dijkstra"].includes(algorithm);

  // Get the right algorithm name for pathfinding visualizer
  const getPathfindingAlgorithm = (algo) => {
    switch (algo) {
      case "a*":
        return "astar";
      case "dijkstra":
        return "dijkstra";
      default:
        return algo;
    }
  };

  return (
    <div className={styles.algoContainer}>
      <div
        className={`${styles.algoHero} ${
          isChatbotExpanded ? styles.chatbotExpanded : ""
        }`}
        style={{ width: "100%" }}
      >
        <AnimatePresence mode="wait">
          <InfoSection key={`info-${algorithm}`} algorithm={algorithm} />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isSorting && <Visualization algorithm={algorithm} />}
          {isSearching && <SearchingVisualizer algorithm={algorithm} />}
          {isGraph && (
            <GraphVisualizer
              algorithm={algorithm}
              sidebarCollapsed={sidebarCollapsed}
            />
          )}
          {isDataStructure && (
            <DataStructuresVisualizer
              key={`ds-${algorithm}`}
              algorithm={algorithm}
              prevAlgorithm={prevAlgorithm}
            />
          )}
          {isPathfinding && (
            <PathfindingVisualizer
              algorithm={getPathfindingAlgorithm(algorithm)}
            />
          )}
        </AnimatePresence>
      </div>
      <Chatbot onExpandChange={setIsChatbotExpanded} />
    </div>
  );
}
