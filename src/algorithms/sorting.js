const bubble_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];
    let swapped;
   
    do {
        swapped = false;
        for (let i = 1; i < arrayCopy.length; i++) {
            moves.push({ indices: [i - 1, i], type: 'compare' });
            if (arrayCopy[i - 1].value > arrayCopy[i].value) {
                [arrayCopy[i - 1], arrayCopy[i]] = [arrayCopy[i], arrayCopy[i - 1]];
                swapped = true;
                moves.push({ indices: [i - 1, i], type: 'swap' });
            }
        }
    } while (swapped);
    return moves;
};

const insertion_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];

    for (let i = 1; i < arrayCopy.length; i++) {
        let j = i;
        while (j > 0 && arrayCopy[j - 1].value > arrayCopy[j].value) {
            moves.push({ indices: [j - 1, j], type: 'compare' });
            [arrayCopy[j - 1], arrayCopy[j]] = [arrayCopy[j], arrayCopy[j - 1]];
            moves.push({ indices: [j - 1, j], type: 'swap' });
            j--;
        }
    }

    return moves;
};

const selection_sort = (arr) => {
    const moves = [];
    const arrayCopy = [...arr];

    for (let i = 0; i < arrayCopy.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arrayCopy.length; j++) {
            moves.push({ indices: [j, minIndex], type: 'compare' });
            if (arrayCopy[j].value < arrayCopy[minIndex].value) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
            moves.push({ indices: [i, minIndex], type: 'swap' });
        }
    }

    return moves;
};

const quickSortHelper = (arr, start, end, moves) => {
    if (start >= end) return;

    const pivotIndex = partition(arr, start, end, moves);
    quickSortHelper(arr, start, pivotIndex - 1, moves);
    quickSortHelper(arr, pivotIndex + 1, end, moves);
};

const partition = (arr, start, end, moves) => {
    const pivotValue = arr[end].value;
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        moves.push({ indices: [i, end], type: 'compare' });
        if (arr[i].value < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            moves.push({ indices: [i, pivotIndex], type: 'swap' });
            pivotIndex++;
        }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    moves.push({ indices: [pivotIndex, end], type: 'swap' });

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

    // Sort left half
    mergeSortHelper(arr, start, mid, moves);
    // Sort right half
    mergeSortHelper(arr, mid + 1, end, moves);

    // Merge the sorted halves
    let left = start;
    let right = mid + 1;
    
    while (left <= mid && right <= end) {
        // Compare current elements from both halves
        moves.push({ indices: [left, right], type: 'compare' });
        
        if (arr[left].value <= arr[right].value) {
            left++;
        } else {
            // Save the value to insert
            const temp = arr[right];
            
            // Shift all elements between left and right-1 one position to the right
            for (let i = right; i > left; i--) {
                moves.push({ indices: [i - 1, i], type: 'swap' });
                arr[i] = arr[i - 1];
            }
            
            // Place the saved value at the left position
            arr[left] = temp;
            
            // Update pointers
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