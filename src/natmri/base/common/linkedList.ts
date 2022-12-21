// 链表节点
class Node<E> {
  static readonly Undefined = new Node<any>(undefined)

  element: E
  prev: Node<E>
  next: Node<E>

  constructor(element: E) {
    this.element = element
    this.prev = Node.Undefined
    this.next = Node.Undefined
  }
}

interface ILinkedList<E> {
  size: number

  // methor
  isEmpty(): boolean
  clear(): void
  unshift(element: E): () => void
  push(element: E): () => void

  shift(): E | undefined
  pop(): E | undefined

  [Symbol.iterator](): Iterator<E>
}

export class LinkedList<E> implements ILinkedList<E> {
  private _first: Node<E> = Node.Undefined
  private _last: Node<E> = Node.Undefined
  private _size = 0

  get size() { return this._size }

  // empty linkedlist check
  isEmpty(): boolean {
    return this._first === Node.Undefined
  }

  // clear linkedlist
  clear(): void {
    this._first = Node.Undefined
    this._last = Node.Undefined
    this._size = 0
  }

  // insert an element for linkedlist head
  unshift(element: E): () => void {
    return this._insert(element, false)
  }

  // insert an element for linkedlist ended
  push(element: E): () => void {
    return this._insert(element, true)
  }

  // get an element for linkedlist for ended
  pop(): E | undefined {
    if (this._last === Node.Undefined)
      return undefined

    return this._remove(this._first)
  }

  // get an element for linkedlist for head
  shift(): E | undefined {
    if (this._first === Node.Undefined)
      return undefined

    return this._remove(this._last)
  }

  // insert an element
  private _insert(element: E, atTheLast = false) {
    const node = new Node(element)
    if (!atTheLast) {
      // unshift
      this._first.prev = node
      node.next = this._first
      this._first = node
    }
    else {
      // push
      this._last.next = node
      node.prev = this._last
      this._last = node
    }

    // done insert element
    this._size += 1

    let didRemove = false

    return () => {
      if (!didRemove) {
        this._remove(node)
        didRemove = true
      }
    }
  }

  // remove an element
  private _remove(node: Node<E>) {
    // no first, no last
    if (node.prev !== Node.Undefined && node.next !== Node.Undefined) {
      // find form the middle
    }
    else if (node.prev === Node.Undefined && node.next === Node.Undefined) {
      // only one node
      this._first = Node.Undefined
      this._last = Node.Undefined
    }
    else if (node.next === Node.Undefined) {
      // last node
      this._last = this._last.prev
      this._last.next = Node.Undefined
    }
    else if (node.prev === Node.Undefined) {
      // first node
      this._first = this._first.next
      this._first.prev = Node.Undefined
    }

    // done remove element
    this._size -= 1

    return node.element
  }

  *[Symbol.iterator]() {
    let node = this._first
    while (node !== Node.Undefined) {
      yield node.element
      node = node.next
    }
  }
}
