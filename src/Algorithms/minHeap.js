export class NodesMinHeap {
  constructor() {
    this.heap = [];
  }

  // get the index of the parent node
  parent(index) {
    return Math.floor((index - 1) / 2);
  }

  // get the index of the left child
  leftChild(index) {
    return 2 * index + 1;
  }

  // get the index of the right child
  rightChild(index) {
    return 2 * index + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value); // add at the end
    this.heapifyUp(this.heap.length - 1); // restore heap property
  }

  heapifyUp(index) {
    while (
      index > 0 &&
      this.heap[this.parent(index)].distance > this.heap[index].distance // distance is the prop. to be compared
    ) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  // remove and return the min element from the heap
  extractMin() {
    if (this.heap.length === 0) return null;

    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1]; // move the last element to the root
    this.heap.pop(); // remove the last element
    this.heapifyDown(0); // restore heap property
    return min;
  }

  heapifyDown(index) {
    let smallest = index;
    const left = this.leftChild(index);
    const right = this.rightChild(index);

    // checking if left child exists and is smaller than the current smallest
    if (
      left < this.heap.length &&
      this.heap[left].distance < this.heap[smallest].distance
    ) {
      smallest = left;
    }

    // checking if right child exists and is smaller than the current smallest
    if (
      right < this.heap.length &&
      this.heap[right].distance < this.heap[smallest].distance
    ) {
      smallest = right;
    }

    // if the smallest is not the current index, swap and continue heapifying down
    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  // get the min element without removing
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // get size of the heap
  size() {
    return this.heap.length;
  }
}
