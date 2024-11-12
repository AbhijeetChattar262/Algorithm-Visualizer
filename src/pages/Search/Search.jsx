import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Search.css'; // Import the CSS file

const SearchVisualization = () => {
  const [data, setData] = useState([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const [searchKey, setSearchKey] = useState('');
  const [searchIndex, setSearchIndex] = useState(-1);

  const handleSearch = () => {
    let index = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === parseInt(searchKey)) {
        index = i;
        break;
      }
    }
    setSearchIndex(index);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Search Algorithm Visualization</h2>
      </div>
      <div className="card-content">
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter search key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="grid-container">
          {data.map((item, index) => (
            <AnimatePresence key={item}>
              <motion.div
                className={`grid-item ${searchIndex === index ? 'highlight' : ''}`}
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }}
                exit={{ x: 100, opacity: 0 }}
              >
                {item}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchVisualization;
