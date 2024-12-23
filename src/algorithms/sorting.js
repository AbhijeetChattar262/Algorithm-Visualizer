const bubble_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];
    let swapped;
    let n = arrayCopy.length;
   
    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            moves.push({ indices: [i - 1, i], type: 'compare', message: `Checking if ${arrayCopy[i - 1].value} needs to bubble up by comparing with ${arrayCopy[i].value}` });
            if (arrayCopy[i - 1].value > arrayCopy[i].value) {
                [arrayCopy[i - 1], arrayCopy[i]] = [arrayCopy[i], arrayCopy[i - 1]];
                swapped = true;
                moves.push({ indices: [i - 1, i], type: 'swap', message: `Bubbling up ${arrayCopy[i - 1].value} as it's smaller than ${arrayCopy[i].value}` });
            }
        }
        n--;
    } while (swapped);
    return moves;
};

const insertion_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];

    for (let i = 1; i < arrayCopy.length; i++) {
        let j = i;
        while (j > 0 && arrayCopy[j - 1].value > arrayCopy[j].value) {
            moves.push({ indices: [j - 1, j], type: 'compare', message: `Looking for insertion position: is ${arrayCopy[j].value} smaller than ${arrayCopy[j - 1].value}?` });
            [arrayCopy[j - 1], arrayCopy[j]] = [arrayCopy[j], arrayCopy[j - 1]];
            moves.push({ indices: [j - 1, j], type: 'swap', message: `Inserting ${arrayCopy[j - 1].value} into its correct position` });
            j--;
        }
    }

    return moves;
};

const selection_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
        // Indicate the current sorted/unsorted boundary
        moves.push({ 
            indices: Array.from({ length: i }, (_, idx) => idx),
            type: 'sorted',
            message: `Elements before index ${i} are in their final sorted positions`
        });

        let minIndex = i;
        for (let j = i + 1; j < arrayCopy.length; j++) {
            moves.push({ indices: [j, minIndex], type: 'compare', message: `Finding minimum: comparing current minimum ${arrayCopy[minIndex].value} with ${arrayCopy[j].value}` });
            if (arrayCopy[j].value < arrayCopy[minIndex].value) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
            moves.push({ indices: [i, minIndex], type: 'swap', message: `Placing minimum value ${arrayCopy[i].value} at position ${i}` });
        }
    }

    return moves;
};

const quickSortHelper = (arr, start, end, moves) => {
    if (start >= end) return;

    // Visualize the current partition
    moves.push({ 
        indices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
        type: 'partition',
        message: `Working on partition from index ${start} to ${end}`
    });

    const pivotIndex = partition(arr, start, end, moves);

    // Add sorted indication when a single element is in its final position
    moves.push({ 
        indices: [pivotIndex], 
        type: 'sorted',
        message: `${arr[pivotIndex].value} is now in its final sorted position`
    });

    quickSortHelper(arr, start, pivotIndex - 1, moves);
    quickSortHelper(arr, pivotIndex + 1, end, moves);
};

const partition = (arr, start, end, moves) => {
    const pivotValue = arr[end].value;
    moves.push({ indices: [end], type: 'pivot', message: `Choosing ${pivotValue} as pivot - elements smaller will go left, larger will go right` });
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        moves.push({ indices: [i, end], type: 'compare', message: `Is ${arr[i].value} smaller than pivot ${pivotValue}?` });
        if (arr[i].value < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            moves.push({ indices: [i, pivotIndex], type: 'swap', message: `Moving ${arr[i].value} to left partition` });
            pivotIndex++;
        }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    moves.push({ indices: [pivotIndex, end], type: 'swap', message: `Swapping ${arr[pivotIndex].value} and ${arr[end].value}` });

    return pivotIndex;
};

const quick_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];
    quickSortHelper(arrayCopy, 0, arrayCopy.length - 1, moves);
    return moves;
};

const mergeSortHelper = (arr, start, end, moves) => {
    if (start >= end) return;

    let mid = Math.floor((start + end) / 2);
    
    // Visualize division of array
    moves.push({ 
        indices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
        type: 'subarray',
        message: `Dividing array from index ${start} to ${end} into two subarrays`
    });

    mergeSortHelper(arr, start, mid, moves);
    mergeSortHelper(arr, mid + 1, end, moves);

    let left = start;
    let right = mid + 1;
    
    while (left <= mid && right <= end) {
        moves.push({ 
            indices: [left, right], 
            type: 'compare',
            message: `Comparing elements: ${arr[left].value} (left) and ${arr[right].value} (right)`
        });

        if (arr[left].value <= arr[right].value) {
            moves.push({ 
                indices: [left], 
                type: 'sorted',
                message: `${arr[left].value} is in correct position`
            });
            left++;
        } else {
            const temp = arr[right];
            
            for (let i = right; i > left; i--) {
                moves.push({ indices: [i - 1, i], type: 'swap', message: `Moving elements right to make space for ${temp.value}` });
                arr[i] = arr[i - 1];
            }
            
            arr[left] = temp;
            
            left++;
            mid++;
            right++;
        }
    }
};

const merge_sort = (arr) => {
    const moves = [];
    const arrayCopy = arr.map(item => ({ ...item }));
    mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, moves);
    return moves;
};

const algorithms = {
    bubble_sort,
    insertion_sort,
    selection_sort,
    quick_sort,
    merge_sort
};

export default algorithms;