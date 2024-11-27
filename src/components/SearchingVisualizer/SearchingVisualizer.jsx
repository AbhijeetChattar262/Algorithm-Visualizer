import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SearchingVisualizer.css';
import algorithms from '../../algorithms/searching';

const SearchingVisualizer = ({ algorithm }) => {
  const [array, setArray] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchingIndex, setSearchingIndex] = useState(null);
  const [found, setFound] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [messages, setMessages] = useState([]);
  const [searchedIndices, setSearchedIndices] = useState([]);
  const messageLogRef = useRef(null);

  const generateArray = () => {
    const size = 12; // Smaller size for better visibility
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 99) + 1
    );
    
    if (algorithm === 'binary_search') {
      newArray.sort((a, b) => a - b);
    }
    
    setArray(newArray);
    setFound(null);
    setSearchingIndex(null);
    setMessages([]);
    setSearchedIndices([]);
  };

  const search = async () => {
    if (!searchKey || isSearching) return;
    
    setIsSearching(true);
    setFound(null);
    setMessages([]);
    setSearchingIndex(null);
    setSearchedIndices([]);

    const searchAlgorithm = algorithms[algorithm];
    const animations = searchAlgorithm(array, parseInt(searchKey));
    let elementFound = false;

    for (const { indices, type, message } of animations) {
      setSearchingIndex(indices[0]);
      setSearchedIndices(prev => [...prev, indices[0]]);
      setMessages(prev => [...prev, message]);
      
      if (type === 'found') {
        elementFound = true;
        setFound(indices[0]);
        toast.success(`🎉 Element ${searchKey} found at index ${indices[0]}`, {
          style: { backgroundColor: 'black' },
          position: "top-right",
          autoClose: 3000
        });
      }
      
      await new Promise(r => setTimeout(r, speed));
    }

    if (!elementFound) {
        setMessages(prev => [...prev, `❌ Element ${searchKey} not found`]);
      toast.error(`❌ Element ${searchKey} not found in array`, {
        position: "top-right",
        autoClose: 3000,
        style: { backgroundColor: 'black' }
      });
    }

    setIsSearching(false);
    setSearchingIndex(null);
  };

  const scrollToBottom = () => {
    if (messageLogRef.current) {
      messageLogRef.current.scrollTo({
        top: messageLogRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    generateArray();
  }, [algorithm]);

  const getBoxClassName = (idx) => {
    const classes = ['number-box'];
    if (idx === searchingIndex) classes.push('searching-box');
    if (searchedIndices.includes(idx)) classes.push('searched-box');
    if (found === idx) classes.push('found');
    return classes.join(' ');
  };

  return (
    <div className="search-visualizer">
      <div className="search-controls">
        <input
          type="number"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Number to search"
        />
        <button onClick={search} disabled={isSearching}>
          Search
        </button>
        <button onClick={generateArray} disabled={isSearching}>
          New Array
        </button>
        <div className="speed-control">
          <input
            type="range"
            min="100"
            max="1000"
            value={1100 - speed}
            onChange={(e) => setSpeed(1100 - e.target.value)}
          />
        </div>
      </div>

      <motion.div className="numbers-grid">
        {array.map((num, idx) => (
          <motion.div
            key={idx}
            className={getBoxClassName(idx)}
            layout
          >
            {num}
          </motion.div>
        ))}
      </motion.div>

      <div className="message-log" ref={messageLogRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className="log-entry">
            {msg}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchingVisualizer;
