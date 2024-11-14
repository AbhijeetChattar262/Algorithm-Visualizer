import React from 'react';
import './DefaultPage.css';

const AlgorithmDefaultView = () => {
  return (
    <div className="default-view">
      <h2>Welcome to the Algorithm Hub</h2>
      <p>
        Please select an algorithm from the sidebar to see its details and visualization.
      </p>
      {/* <div className="illustration">
        <img src="/api/placeholder/400/300" alt="Algorithm illustration" />
      </div> */}
    </div>
  );
};

export default AlgorithmDefaultView;