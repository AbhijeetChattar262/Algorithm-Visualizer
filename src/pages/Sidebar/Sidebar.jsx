import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, GitBranch, Share2, Search } from 'lucide-react';
import { algorithmCategories, subCategories } from '../../constants';
import './AlgorithmSidebar.css';

const Sidebar = ({ setSelectedAlgorithm }) => { // Correctly destructuring props
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryIcon = (categoryTitle) => {
    switch (categoryTitle) {
      case 'Sorting Algorithms':
        return <GitBranch className="category-icon" />;
      case 'Searching Algorithms':
        return <Search className="category-icon" />;
      case 'Graph Algorithms':
        return <Share2 className="category-icon" />;
      default:
        return <Code className="category-icon" />;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Algorithm Hub</div>
      <nav className="sidebar-nav">
        {algorithmCategories.map(({ title }) => (
          <div key={title} className="category-container">
            <button
              onClick={() => toggleCategory(title)}
              className="category-button"
            >
              <div className="category-label">
                {getCategoryIcon(title)}
                <span>{title}</span>
              </div>
              {openCategories[title] ? (
                <ChevronDown className="chevron-icon" />
              ) : (
                <ChevronRight className="chevron-icon" />
              )}
            </button>
            {openCategories[title] && subCategories[title.toLowerCase().replace(/ /g, '_')] && (
              <div className="algorithm-list">
                {subCategories[title.toLowerCase().replace(/ /g, '_')].map((item) => (
                  <button
                    key={item}
                    className="algorithm-item"
                    onClick={() => {
                      const formattedAlgorithm = item.toLowerCase().replace(/ /g, '_');
                      setSelectedAlgorithm(formattedAlgorithm);
                      console.log('Selected Algorithm:', formattedAlgorithm);
                  }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
