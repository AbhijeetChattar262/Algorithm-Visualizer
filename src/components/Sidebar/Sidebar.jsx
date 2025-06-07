import React, { useState, useEffect, useRef } from "react";
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

const Sidebar = ({ setSelectedAlgorithm, onCollapseChange }) => {
  const [openCategories, setOpenCategories] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Add a state for tracking the position of each category button
  const [tooltipPositions, setTooltipPositions] = useState({});
  const categoryRefs = useRef({});

  // Update tooltip positions when the sidebar collapses/expands
  useEffect(() => {
    if (isCollapsed) {
      // Update positions after a brief delay to allow for DOM updates
      setTimeout(updateTooltipPositions, 100);
    }
  }, [isCollapsed]);

  // Function to update tooltip positions
  const updateTooltipPositions = () => {
    const positions = {};
    Object.keys(categoryRefs.current).forEach((title) => {
      const buttonRef = categoryRefs.current[title];
      if (buttonRef) {
        const rect = buttonRef.getBoundingClientRect();
        positions[title] = {
          top: rect.top + rect.height / 2,
          left: rect.right + 10,
        };
      }
    });
    setTooltipPositions(positions);
  };

  const toggleCategory = (category) => {
    // If sidebar is collapsed, expand it first
    if (isCollapsed) {
      setIsCollapsed(false);
      if (onCollapseChange) {
        onCollapseChange(false);
      }
      // Set a small timeout to allow the sidebar to expand before opening the category
      setTimeout(() => {
        setOpenCategories((prev) => ({
          ...prev,
          [category]: true,
        }));
      }, 100);
    } else {
      setOpenCategories((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    }
  };

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapseChange) {
      onCollapseChange(newCollapsedState);
    }
  };

  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, []);

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

  const selectAlgorithm = (algorithm) => {
    // If sidebar is collapsed, expand it first
    if (isCollapsed) {
      setIsCollapsed(false);
      if (onCollapseChange) {
        onCollapseChange(false);
      }
    }
    const formattedAlgorithm = algorithm.toLowerCase().replace(/ /g, "_");
    setSelectedAlgorithm(formattedAlgorithm);
    console.log("Selected Algorithm:", formattedAlgorithm);
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
        <button className={styles.collapseToggle} onClick={toggleCollapse}>
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      <nav className={styles.sidebarNav}>
        {algorithmCategories.map(({ title }) => (
          <div key={title} className={styles.categoryContainer}>
            <button
              ref={(el) => (categoryRefs.current[title] = el)}
              onClick={() => toggleCategory(title)}
              className={styles.categoryButton}
              aria-label={title}
            >
              <div className={styles.categoryLabel}>
                {getCategoryIcon(title)}
                {!isCollapsed && <span>{title}</span>}
              </div>
              {isCollapsed && tooltipPositions[title] && (
                <span
                  className={styles.tooltipText}
                  style={{
                    top: `${tooltipPositions[title].top}px`,
                    left: `${tooltipPositions[title].left}px`,
                    position: "fixed",
                  }}
                >
                  {title}
                </span>
              )}
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
                        onClick={() => selectAlgorithm(item)}
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
