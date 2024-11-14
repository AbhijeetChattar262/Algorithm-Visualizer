const linear_search = (arr, target) => {
    const moves = [];
    for (let i = 0; i < arr.length; i++) {
        moves.push({ index: i, type: 'compare' });
        if (arr[i].value === target) {
            moves.push({ index: i, type: 'found' });
            return moves;
        }
    }
    return moves;
};

const binary_search = (arr, target) => {
    const moves = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        moves.push({ index: mid, type: 'compare' });

        if (arr[mid].value === target) {
            moves.push({ index: mid, type: 'found' });
            return moves;
        } else if (arr[mid].value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return moves;
};

const algorithms = {
    linear_search,
    binary_search
};

export default algorithms;