import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Code,
  GitBranch,
  Share2,
  Search,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { algorithmCategories, subCategories } from "../../constants";
import styles from "./AlgorithmSidebar.module.css";

const Sidebar = ({ setSelectedAlgorithm }) => {
  const [openCategories, setOpenCategories] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (categoryTitle) => {
    switch (categoryTitle) {
      case "Sorting Algorithms":
        return <GitBranch className={styles.categoryIcon} />;
      case "Searching Algorithms":
        return <Search className={styles.categoryIcon} />;
      case "Graph Algorithms":
        return <Share2 className={styles.categoryIcon} />;
      case "Pathfinding Algorithms":
        return <MapPin className={styles.categoryIcon} />;
      default:
        return <Code className={styles.categoryIcon} />;
    }
  };

  return (
    <div
      className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}
      style={{ minWidth: isCollapsed ? "55px" : "256px" }}
    >
      <div className={styles.sidebarHeader}>
        {!isCollapsed && (
          <div className={styles.sidebarTitle}>Algorithm Hub</div>
        )}
        <button
          className={styles.collapseToggle}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      <nav className={styles.sidebarNav}>
        {algorithmCategories.map(({ title }) => (
          <div key={title} className={styles.categoryContainer}>
            <button
              onClick={() => toggleCategory(title)}
              className={styles.categoryButton}
            >
              <div className={styles.categoryLabel}>
                {getCategoryIcon(title)}
                {!isCollapsed && <span>{title}</span>}
              </div>
              {!isCollapsed &&
                (openCategories[title] ? (
                  <ChevronDown className={styles.chevronIcon} />
                ) : (
                  <ChevronRight className={styles.chevronIcon} />
                ))}
            </button>
            {!isCollapsed &&
              openCategories[title] &&
              subCategories[title.toLowerCase().replace(/ /g, "_")] && (
                <div className={styles.algorithmList}>
                  {subCategories[title.toLowerCase().replace(/ /g, "_")].map(
                    (item) => (
                      <button
                        key={item}
                        className={styles.algorithmItem}
                        onClick={() => {
                          const formattedAlgorithm = item
                            .toLowerCase()
                            .replace(/ /g, "_");
                          setSelectedAlgorithm(formattedAlgorithm);
                          console.log(
                            "Selected Algorithm:",
                            formattedAlgorithm
                          );
                        }}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
