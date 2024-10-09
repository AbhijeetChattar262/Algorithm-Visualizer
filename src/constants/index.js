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
};
