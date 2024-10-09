export const algorithmCategories = [
  {
    title: "Sorting Algorithms",
    image: "https://placehold.co/200",
  },
  {
    title: "Searching Algorithms",
    image: "https://placehold.co/200",
  },
  {
    title: "Graph Algorithms",
    image: "https://placehold.co/200",
  },
  {
    title: "Dynamic Programming",
    image: "https://placehold.co/200",
  },
  {
    title: "Backtracking Algorithms",
    image: "https://placehold.co/200",
  },
];

export const subCategories = {
  sorting_algorithms: [
    "Bubble Sort",
    "Insertion Sort",
    "Selection Sort",
    "Merge Sort",
    "Quick Sort",
  ],
  searching_algorithms: ["Linear Search", "Binary Search"],
  graph_algorithms: ["DFS", "BFS"],
  dynamic_programming: ["Knapsack"],
  backtracking_algorithms: ["Depth First Search", "Breadth First Search"],
};

export const infoSection = {
  bubble_sort: {
    info: "Bubble Sort is a simple sorting algorithm that repeatedly steps through a list of elements, compares adjacent pairs, and swaps them if they are in the wrong order. This process is repeated until no swaps are needed, indicating that the list is sorted.",
    algorithm: [
      "Start at the beginning of the list.",
      "Compare the first two elements: If the first is greater than the second, swap them. Otherwise, do nothing.",
      "Move to the next pair of elements and repeat the comparison and swapping process.",
      'Continue this for the entire list. The largest element "bubbles up" to its correct position at the end of the list.',
      "Repeat the entire process for the remaining unsorted part of the list (excluding the last sorted elements).",
      "The algorithm finishes when no more swaps are needed.",
    ],
    complexity: [
      "Time Complexity: Best Case: O(n) (when the array is already sorted).",
      "Worst Case: O(n^2) (when the array is sorted in reverse order).",
      "Average Case: O(n^2).",
      "Space Complexity: O(1) (in-place sorting, no extra memory used).",
      "Stable Sort: Bubble sort maintains the relative order of equal elements.",
      "Adaptive: It can detect if the list is already sorted and stop early.",
    ],
    use_cases: [
      "For educational purposes, as it demonstrates basic sorting techniques.",
      "When the input list is nearly sorted, Bubble Sort may perform well since its best-case complexity is O(n).",
      "However, due to its inefficiency in handling large data sets, it is rarely used in practice for performance-critical applications.",
    ],
  },

  insertion_sort: {
    info: "Insertion Sort builds the sorted array one item at a time by picking elements from the unsorted array and inserting them into the correct position in the sorted part.",
    algorithm: [
      "Start with the second element in the array (since the first is trivially sorted).",
      "Compare the current element with the elements in the sorted portion of the array (to its left).",
      "If the current element is smaller than the compared element, shift the larger element to the right.",
      "Continue shifting until the correct position is found for the current element.",
      "Insert the current element into its correct position.",
      "Repeat the process for all elements in the unsorted portion of the array.",
    ],
    complexity: [
      "Time Complexity: Best Case: O(n) (when the array is already sorted).",
      "Worst Case: O(n^2) (when the array is sorted in reverse order).",
      "Average Case: O(n^2).",
      "Space Complexity: O(1) (in-place sorting, no extra memory used).",
      "Stable Sort: Insertion Sort maintains the relative order of equal elements.",
    ],
    use_cases: [
      "Efficient for small data sets or arrays that are already partially sorted.",
      "Used in hybrid sorting algorithms like Timsort for its efficiency with smaller data sets.",
    ],
  },

  selection_sort: {
    info: "Selection Sort is a simple algorithm that repeatedly selects the smallest (or largest) element from the unsorted portion and swaps it with the first unsorted element.",
    algorithm: [
      "Start with the entire array unsorted.",
      "Find the smallest element in the unsorted portion of the array.",
      "Swap this smallest element with the first unsorted element.",
      "Move the boundary between sorted and unsorted portions one element to the right.",
      "Repeat the process for all elements until the entire array is sorted.",
    ],
    complexity: [
      "Time Complexity: O(n^2) for all cases (best, worst, and average).",
      "Space Complexity: O(1) (in-place sorting, no extra memory used).",
      "Not Stable: Selection Sort may change the relative order of equal elements.",
    ],
    use_cases: [
      "Useful when memory writes are expensive, as it makes O(n) writes.",
      "Selection Sort is generally not used for large datasets due to its O(n^2) time complexity.",
    ],
  },

  merge_sort: {
    info: "Merge Sort is a divide-and-conquer algorithm that recursively divides the array into halves, sorts each half, and merges them back together in sorted order.",
    algorithm: [
      "Divide the array into two halves.",
      "Recursively sort the left half and the right half.",
      "Merge the two sorted halves into one sorted array.",
      "Repeat the process until the array is fully sorted.",
    ],
    complexity: [
      "Time Complexity: Best, Worst, and Average Case: O(n log n).",
      "Space Complexity: O(n) due to the additional array used for merging.",
      "Stable Sort: Merge Sort maintains the relative order of equal elements.",
    ],
    use_cases: [
      "Efficient for large datasets due to its O(n log n) time complexity.",
      "Used in external sorting (large datasets that don’t fit into memory).",
      "Merge Sort is a good choice for sorting linked lists as it requires minimal random access.",
    ],
  },

  quick_sort: {
    info: "Quick Sort is a divide-and-conquer algorithm that selects a pivot element and partitions the array into two halves: elements smaller than the pivot on one side and elements larger on the other. The process is recursively applied to each half.",
    algorithm: [
      "Choose a pivot element from the array (commonly the last element, but this can vary).",
      "Partition the array so that elements smaller than the pivot are on the left and elements larger than the pivot are on the right.",
      "Recursively apply Quick Sort to the left and right partitions.",
      "Repeat the process until the array is fully sorted.",
    ],
    complexity: [
      "Time Complexity: Best and Average Case: O(n log n).",
      "Worst Case: O(n^2) (when the pivot selection is poor and results in unbalanced partitions).",
      "Space Complexity: O(log n) (due to recursion).",
      "Not Stable: Quick Sort may change the relative order of equal elements.",
    ],
    use_cases: [
      "Efficient for large datasets due to its average time complexity of O(n log n).",
      "Commonly used in practice, especially when memory is a concern, because of its in-place sorting.",
      "Quick Sort’s worst-case performance can be mitigated with good pivot selection (e.g., using a random or median-of-three pivot).",
    ],
  },

  binary_search: {
    info: "Binary Search is an efficient algorithm for finding a target value in a sorted list. It repeatedly divides the search space in half, comparing the target to the middle element, and discards the half of the list that cannot contain the target.",
    algorithm: [
      "Start with the sorted list and identify the middle element.",
      "If the middle element is the target, return the index.",
      "If the target is smaller than the middle element, narrow the search to the left half of the list.",
      "If the target is larger than the middle element, narrow the search to the right half of the list.",
      "Repeat the process on the narrowed half until the target is found or the search space is reduced to zero.",
      "If the search space becomes zero, return -1 indicating the target is not present.",
    ],
    complexity: [
      "Time Complexity: Best Case: O(1) (target is at the middle).",
      "Worst Case: O(log n) (each step halves the search space).",
      "Average Case: O(log n).",
      "Space Complexity: O(1) (iterative implementation), O(log n) (recursive implementation due to call stack).",
    ],
    use_cases: [
      "Used when the list is sorted.",
      "Highly efficient for large datasets due to logarithmic time complexity.",
      "Not suitable for unsorted lists unless they are sorted first.",
    ],
  },
  linear_search: {
    info: "Linear Search is a simple searching algorithm that checks each element in a list one by one until the target value is found or the list ends. It doesn't require the list to be sorted and works on any data structure like arrays or linked lists.",
    algorithm: [
      "Start at the first element of the list.",
      "Compare the current element with the target value.",
      "If the current element is the target value, return the index of the element.",
      "If the current element is not the target value, move to the next element.",
      "Repeat the process until the target is found or the list ends.",
      "If the list ends and the target value is not found, return -1 indicating the target is not present.",
    ],
    complexity: [
      "Time Complexity: Best Case: O(1) (target is at the first position).",
      "Worst Case: O(n) (target is at the last position or not present).",
      "Average Case: O(n).",
      "Space Complexity: O(1) (no extra space needed).",
    ],
    use_cases: [
      "Useful when the list is unsorted or small.",
      "Can be used with any data structure (arrays, linked lists, etc.).",
      "Since it checks each element sequentially, it's inefficient for large datasets.",
    ],
  },
};
