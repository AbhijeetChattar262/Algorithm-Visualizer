// Array operations
const array_operations = (initialArray = []) => {
  const animations = [];
  const array = [...initialArray];

  // Insert element
  const insert = (index, value) => {
    animations.push({
      type: "highlight",
      indices: Array.from(
        { length: array.length - index },
        (_, i) => i + index
      ),
      message: `Shifting elements at indices ${index} and beyond to make room`,
    });

    for (let i = array.length; i > index; i--) {
      array[i] = array[i - 1];
      animations.push({
        type: "shift",
        indices: [i - 1, i],
        message: `Moving element ${array[i - 1]} from index ${i - 1} to ${i}`,
      });
    }

    array[index] = value;
    animations.push({
      type: "insert",
      index: index,
      value: value,
      message: `Inserting ${value} at index ${index}`,
    });

    animations.push({
      type: "final",
      array: [...array],
      message: `Array after insertion: [${array.join(", ")}]`,
    });
  };

  // Delete element
  const remove = (index) => {
    if (index < 0 || index >= array.length) {
      animations.push({
        type: "error",
        message: `Index ${index} is out of bounds`,
      });
      return;
    }

    animations.push({
      type: "highlight",
      indices: [index],
      message: `Removing element ${array[index]} at index ${index}`,
    });

    const removedValue = array[index];

    for (let i = index; i < array.length - 1; i++) {
      animations.push({
        type: "shift",
        indices: [i, i + 1],
        message: `Shifting element from index ${i + 1} to ${i}`,
      });
      array[i] = array[i + 1];
    }

    array.length = array.length - 1;

    animations.push({
      type: "final",
      array: [...array],
      message: `Array after deletion: [${array.join(", ")}]`,
    });
  };

  // Search element
  const search = (value) => {
    for (let i = 0; i < array.length; i++) {
      animations.push({
        type: "compare",
        indices: [i],
        message: `Comparing ${array[i]} with ${value}`,
      });

      if (array[i] === value) {
        animations.push({
          type: "found",
          index: i,
          message: `Found ${value} at index ${i}`,
        });
        return;
      }
    }

    animations.push({
      type: "not-found",
      message: `${value} not found in the array`,
    });
  };

  // Update element
  const update = (index, value) => {
    if (index < 0 || index >= array.length) {
      animations.push({
        type: "error",
        message: `Index ${index} is out of bounds`,
      });
      return;
    }

    const oldValue = array[index];
    animations.push({
      type: "highlight",
      indices: [index],
      message: `Updating element at index ${index} from ${oldValue} to ${value}`,
    });

    array[index] = value;

    animations.push({
      type: "update",
      index: index,
      value: value,
      message: `Updated index ${index} to ${value}`,
    });

    animations.push({
      type: "final",
      array: [...array],
      message: `Array after update: [${array.join(", ")}]`,
    });
  };

  return { animations, insert, remove, search, update };
};

// Linked list operations
const linked_list_operations = (initialList = []) => {
  const animations = [];
  const list = [...initialList];

  // Insert node
  const insert = (position, value) => {
    if (position < 0 || position > list.length) {
      animations.push({
        type: "error",
        message: `Position ${position} is out of bounds`,
      });
      return;
    }

    animations.push({
      type: "create-node",
      value: value,
      message: `Creating new node with value ${value}`,
    });

    if (position === 0) {
      animations.push({
        type: "update-head",
        value: value,
        message: `Updating head to point to the new node`,
      });
    } else {
      animations.push({
        type: "traverse",
        indices: Array.from({ length: position }, (_, i) => i),
        message: `Traversing to position ${position - 1}`,
      });

      animations.push({
        type: "update-next",
        index: position - 1,
        message: `Updating next pointer of node at position ${position - 1}`,
      });
    }

    list.splice(position, 0, value);

    animations.push({
      type: "final",
      list: [...list],
      message: `Linked list after insertion: ${list.join(" -> ")}`,
    });
  };

  // Delete node
  const remove = (position) => {
    if (position < 0 || position >= list.length) {
      animations.push({
        type: "error",
        message: `Position ${position} is out of bounds`,
      });
      return;
    }

    if (position === 0) {
      animations.push({
        type: "update-head",
        nextIndex: 1,
        message: `Removing head node, updating head to point to the next node`,
      });
    } else {
      animations.push({
        type: "traverse",
        indices: Array.from({ length: position }, (_, i) => i),
        message: `Traversing to position ${position - 1}`,
      });

      animations.push({
        type: "update-next",
        index: position - 1,
        nextIndex: position + 1,
        message: `Updating next pointer of node at position ${
          position - 1
        } to skip node at position ${position}`,
      });
    }

    const removedValue = list[position];
    list.splice(position, 1);

    animations.push({
      type: "final",
      list: [...list],
      message: `Linked list after removing value ${removedValue}: ${list.join(
        " -> "
      )}`,
    });
  };

  // Search node
  const search = (value) => {
    for (let i = 0; i < list.length; i++) {
      animations.push({
        type: "traverse",
        index: i,
        message: `Checking node at position ${i} with value ${list[i]}`,
      });

      if (list[i] === value) {
        animations.push({
          type: "found",
          index: i,
          message: `Found value ${value} at position ${i}`,
        });
        return;
      }
    }

    animations.push({
      type: "not-found",
      message: `Value ${value} not found in the linked list`,
    });
  };

  return { animations, insert, remove, search };
};

// Stack operations
const stack_operations = (initialStack = []) => {
  const animations = [];
  const stack = [...initialStack];

  // Push operation
  const push = (value) => {
    animations.push({
      type: "push",
      value: value,
      message: `Pushing ${value} onto the stack`,
    });

    stack.push(value);

    animations.push({
      type: "final",
      stack: [...stack],
      message: `Stack after push: [${stack.join(", ")}] (top is on right)`,
    });
  };

  // Pop operation
  const pop = () => {
    if (stack.length === 0) {
      animations.push({
        type: "error",
        message: `Cannot pop from an empty stack`,
      });
      return;
    }

    animations.push({
      type: "highlight",
      index: stack.length - 1,
      message: `Popping top element ${stack[stack.length - 1]} from stack`,
    });

    const poppedValue = stack.pop();

    animations.push({
      type: "pop",
      value: poppedValue,
      message: `Popped value: ${poppedValue}`,
    });

    animations.push({
      type: "final",
      stack: [...stack],
      message: `Stack after pop: [${stack.join(", ")}] (top is on right)`,
    });
  };

  // Peek operation
  const peek = () => {
    if (stack.length === 0) {
      animations.push({
        type: "error",
        message: `Cannot peek an empty stack`,
      });
      return;
    }

    animations.push({
      type: "peek",
      index: stack.length - 1,
      message: `Top element is ${stack[stack.length - 1]}`,
    });
  };

  return { animations, push, pop, peek };
};

// Queue operations
const queue_operations = (initialQueue = []) => {
  const animations = [];
  const queue = [...initialQueue];

  // Enqueue operation
  const enqueue = (value) => {
    animations.push({
      type: "enqueue",
      value: value,
      message: `Enqueueing ${value} to the rear of the queue`,
    });

    queue.push(value);

    animations.push({
      type: "final",
      queue: [...queue],
      message: `Queue after enqueue: [${queue.join(", ")}] (front is on left)`,
    });
  };

  // Dequeue operation
  const dequeue = () => {
    if (queue.length === 0) {
      animations.push({
        type: "error",
        message: `Cannot dequeue from an empty queue`,
      });
      return;
    }

    animations.push({
      type: "highlight",
      index: 0,
      message: `Dequeuing front element ${queue[0]} from queue`,
    });

    const dequeuedValue = queue.shift();

    animations.push({
      type: "dequeue",
      value: dequeuedValue,
      message: `Dequeued value: ${dequeuedValue}`,
    });

    animations.push({
      type: "final",
      queue: [...queue],
      message: `Queue after dequeue: [${queue.join(", ")}] (front is on left)`,
    });
  };

  // Front operation
  const front = () => {
    if (queue.length === 0) {
      animations.push({
        type: "error",
        message: `Cannot get front of an empty queue`,
      });
      return;
    }

    animations.push({
      type: "front",
      index: 0,
      message: `Front element is ${queue[0]}`,
    });
  };

  return { animations, enqueue, dequeue, front };
};

const dataStructures = {
  array: array_operations,
  linked_list: linked_list_operations,
  stack: stack_operations,
  queue: queue_operations,
};

export default dataStructures;
