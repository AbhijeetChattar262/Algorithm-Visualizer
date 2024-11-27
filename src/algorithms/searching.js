const linear_search = (arr, key) => {
  const moves = [];
  for (let i = 0; i < arr.length; i++) {
    moves.push({
      indices: [i],
      type: 'searching',
      message: `Checking index ${i}: Is ${arr[i]} equal to ${key}?`
    });
    
    if (arr[i] === key) {
      moves.push({
        indices: [i],
        type: 'found',
        message: `✅ Found ${key} at index ${i}!`
      });
      return moves;
    }
  }
  return moves;
};

const binary_search = (arr, key) => {
  const moves = [];
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    moves.push({
      indices: [mid],
      type: 'searching',
      message: `Checking middle element at index ${mid}: Is ${arr[mid]} equal to ${key}?`
    });

    if (arr[mid] === key) {
      moves.push({
        indices: [mid],
        type: 'found',
        message: `✅ Found ${key} at index ${mid}!`
      });
      return moves;
    }

    if (arr[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return moves;
};

const algorithms = {
  linear_search,
  binary_search,
};

export default algorithms;