class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        var newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode
            return this
        }

        var current = this.root

        while (current) {
            if (current.value === value) return this
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return this
                }
                current = current.left

            } else {
                if (current.right === null) {
                    current.right = newNode
                    return this
                }
                current = current.right
            }
        }
        return this
    }



    contains(value) {
        if (this.root === null) return false

        var current = this.root
        while (current) {
            if (current.value === value) return true
            if (value < current.value) {
                if (current.left === null) return false

                current = current.left
            } else {
                if (current.right === null) return false

                current = current.right
            }
        }
    }

    BFS() {
        if (this.root === null) return undefined

        var queue = []
        var visited = []

        queue.push(this.root)

        while (queue.length > 0) {
            var current = queue.shift()
            if (current.left != null) queue.push(current.left)
            if (current.right != null) queue.push(current.right)

            visited.push(current.value)

        }

        return visited

    }

    DFSPreOrder() {
        if (this.root === null) return null

       
        var visited = []
        
        function traverse(current) {
            visited.push(current.value)
            if (current.left != null) traverse(current.left)
            if (current.right != null) traverse(current.right)
        }

        traverse(this.root )
        return visited
    }






    print() {
        var arr = []
        var current = this.root
        // while(current){
        //     arr.push(current.val)
        //     current= current.next
        // }
        console.log(arr)
    }

}


var tree = new BinarySearchTree()
tree.root = new Node(10)
tree.root.right = new Node(14)
tree.root.left = new Node(7)
tree.root.left.right = new Node(8)
tree.insert(5)
console.log(tree.contains(7))
console.log(tree.contains(3))
console.log(tree.contains(55))
console.log(tree.contains(12))
console.log(tree.contains(14))
console.log(tree.DFSPreOrder())

