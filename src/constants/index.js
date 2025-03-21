export const algorithmCategories = [
  {
    title: "Data Structures",
  },
  {
    title: "Searching Algorithms",
  },
  {
    title: "Sorting Algorithms",
  },
  {
    title: "Graph Algorithms",
  },
  {
    title: "Pathfinding Algorithms",
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
  graph_algorithms: ["Graph BFS", "Graph DFS", "Graph Dijkstra"],
  data_structures: ["Array", "Linked List", "Stack", "Queue"],
  pathfinding_algorithms: ["A*", "Dijkstra"],
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
  graph_bfs: {
    info: "Breadth-first search (BFS) is a graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.",
    algorithm: [
      "Start at a given source vertex",
      "Explore all neighboring vertices at the current level",
      "Move to the next level of vertices",
      "Repeat until all vertices are visited",
    ],
    complexity: [
      "Time Complexity: O(V + E) where V is vertices and E is edges",
      "Space Complexity: O(V) for the queue",
    ],
    use_cases: [
      "Finding shortest path in unweighted graphs",
      "Social networking applications",
      "GPS Navigation systems",
      "Web crawlers",
    ],
  },
  graph_dfs: {
    info: "Depth-first search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking.",
    algorithm: [
      "Start at a given source vertex",
      "Recursively explore each unvisited neighbor",
      "Backtrack when no unvisited neighbors remain",
      "Repeat until all vertices are visited",
    ],
    complexity: [
      "Time Complexity: O(V + E) where V is vertices and E is edges",
      "Space Complexity: O(V) for the recursion stack",
    ],
    use_cases: [
      "Topological sorting",
      "Finding connected components",
      "Maze generation",
      "Solving puzzles",
    ],
  },
  graph_dijkstra: {
    info: "Dijkstra's algorithm finds the shortest path between nodes in a weighted graph.",
    algorithm: [
      "Start with distance to source vertex as 0 and all others as infinity",
      "Select unvisited vertex with minimum distance",
      "Update distances to all unvisited neighbors",
      "Mark current vertex as visited and repeat",
    ],
    complexity: [
      "Time Complexity: O((V + E) log V) with binary heap",
      "Space Complexity: O(V)",
    ],
    use_cases: [
      "GPS Navigation systems",
      "Network routing protocols",
      "Social networks",
      "Games with pathfinding",
    ],
  },
  array: {
    info: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together in memory, allowing random access of elements using indices.",
    algorithm: [
      "Random Access: Elements can be accessed directly using their index",
      "Insertion: Adding an element at a specific position requires shifting elements",
      "Deletion: Removing an element requires shifting subsequent elements",
      "Search: Linear search can be performed to find elements",
      "Update: Elements can be updated directly using their index",
    ],
    complexity: [
      "Access: O(1) - Constant time to access any element by index",
      "Insertion: O(n) - Worst case when inserting at the beginning requires shifting all elements",
      "Deletion: O(n) - Worst case when deleting at the beginning requires shifting all elements",
      "Search: O(n) - Linear time to find an element in an unsorted array",
      "Space Complexity: O(n) - Linear space proportional to the number of elements",
    ],
    use_cases: [
      "Storing and accessing sequential data",
      "Temporary storage of objects",
      "Used as building blocks for more complex data structures",
      "Implementing matrices and multi-dimensional data",
      "Buffers for I/O operations",
    ],
  },

  linked_list: {
    info: "A linked list is a linear data structure where elements are not stored at contiguous memory locations. Each element (node) contains data and a reference (link) to the next node in the sequence.",
    algorithm: [
      "Node Structure: Each node contains data and a reference to the next node",
      "Traversal: Start from the head node and follow references until the end",
      "Insertion: Create a new node and adjust references to include it in the list",
      "Deletion: Adjust references to exclude a node from the list",
      "Search: Sequentially traverse the list to find elements",
    ],
    complexity: [
      "Access: O(n) - Need to traverse from head to locate an element",
      "Insertion: O(1) - If inserting at known position (like head or tail)",
      "Deletion: O(1) - If deleting from known position (like head)",
      "Search: O(n) - Need to traverse sequentially to find an element",
      "Space Complexity: O(n) - Linear space proportional to the number of elements",
    ],
    use_cases: [
      "Dynamic memory allocation",
      "Implementing stacks and queues",
      "Creating circular lists and doubly linked lists",
      "Undo functionality in applications",
      "Managing songs in a music player",
    ],
  },

  stack: {
    info: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end called the 'top'.",
    algorithm: [
      "Push: Add an element to the top of the stack",
      "Pop: Remove and return the top element from the stack",
      "Peek/Top: Return the top element without removing it",
      "isEmpty: Check if the stack is empty",
    ],
    complexity: [
      "Push: O(1) - Constant time to add an element to the top",
      "Pop: O(1) - Constant time to remove an element from the top",
      "Peek: O(1) - Constant time to view the top element",
      "Search: O(n) - Potentially need to check all elements",
      "Space Complexity: O(n) - Linear space proportional to the number of elements",
    ],
    use_cases: [
      "Function call management (call stack)",
      "Expression evaluation and syntax parsing",
      "Undo mechanisms in text editors and applications",
      "Browser history (back button functionality)",
      "Backtracking algorithms",
    ],
  },

  queue: {
    info: "A queue is a linear data structure that follows the First In First Out (FIFO) principle. Elements are added at the rear and removed from the front.",
    algorithm: [
      "Enqueue: Add an element to the rear of the queue",
      "Dequeue: Remove and return the element from the front",
      "Front: Return the first element without removing it",
      "isEmpty: Check if the queue is empty",
    ],
    complexity: [
      "Enqueue: O(1) - Constant time to add an element to the rear",
      "Dequeue: O(1) - Constant time to remove an element from the front",
      "Front: O(1) - Constant time to view the front element",
      "Search: O(n) - May need to check all elements",
      "Space Complexity: O(n) - Linear space proportional to the number of elements",
    ],
    use_cases: [
      "CPU and Disk Scheduling",
      "Handling service requests on a single shared resource",
      "Asynchronous data transfer",
      "Breadth-First Search algorithm implementation",
      "Print queue management",
    ],
  },

  astar: {
    info: "A* (A-Star) is an informed search algorithm that finds the shortest path from a start node to a goal node in a graph. It uses a heuristic function to guide its search, making it more efficient than algorithms like Dijkstra's for many applications.",
    algorithm: [
      "Start with the initial node and calculate its f-score (f = g + h, where g is the cost from start and h is the heuristic estimate to goal).",
      "While there are nodes to explore, select the node with lowest f-score.",
      "If this node is the goal, reconstruct and return the path.",
      "Otherwise, mark the node as visited and explore all its neighbors.",
      "For each neighbor, calculate a tentative g-score through the current node.",
      "If this path is better than any previous path to this neighbor, update the neighbor's scores and set its parent to the current node.",
    ],
    complexity: [
      "Time Complexity: O(b^d) where b is the branching factor and d is the depth of the solution.",
      "With a good heuristic, performance can approach O(d).",
      "Space Complexity: O(b^d) to store all nodes.",
    ],
    use_cases: [
      "Pathfinding in games and navigation systems.",
      "Robotics motion planning.",
      "Network routing protocols.",
      "Solving puzzles like the 15-puzzle or Rubik's cube.",
    ],
  },

  "a*": {
    info: "A* (pronounced 'A-star') is an informed search algorithm that finds the shortest path from a start node to a goal node in a graph. It uses a heuristic function to guide its search, making it more efficient than algorithms like Dijkstra's for many applications.",
    algorithm: [
      "Start with the initial node and calculate its f-score (f = g + h, where g is the cost from start and h is the heuristic estimate to goal).",
      "While there are nodes to explore, select the node with lowest f-score.",
      "If this node is the goal, reconstruct and return the path.",
      "Otherwise, mark the node as visited and explore all its neighbors.",
      "For each neighbor, calculate a tentative g-score through the current node.",
      "If this path is better than any previous path to this neighbor, update the neighbor's scores and set its parent to the current node.",
    ],
    complexity: [
      "Time Complexity: O(b^d) where b is the branching factor and d is the depth of the solution.",
      "With a good heuristic, performance can approach O(d).",
      "Space Complexity: O(b^d) to store all nodes.",
    ],
    use_cases: [
      "Pathfinding in games and navigation systems.",
      "Robotics motion planning.",
      "Network routing protocols.",
      "Solving puzzles like the 15-puzzle or Rubik's cube.",
    ],
  },
};
