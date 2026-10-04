
class Node{
    constructor(val){
        this.val = val
        this.next = null
    }
}

class SinglyLinkedList{
    constructor(){
        this.head = null
        this.tail = null
        this.length = 0
    }
    
    push(val){
        var newNode = new Node(val);
        
        if (this.head === null){
            this.head = this.tail = newNode
        }else{
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length ++;
        return this
    }

    pop(){
        
        if (!this.head ) return undefined
        
        let current = this.head
        let newLast = current
        
        while(current.next){
            newLast = current
            current = current.next
        }
        this.tail = newLast
        this.tail.next = null
        
        this.length --;
        if(this.length === 0){
            this.head = null;
            this.tail = null;
        }
        return current
    }

    shift(){
        if(!this.head ) return undefined
        var current = this.head
        this.head = this.head.next

        this.length --
        if(this.length === 0){
           
            this.tail = null;
        }
        return current
    }

    unShift(val){
        var newHead = new Node(val)
        if(!this.head ) {
            this.head = this.tail = newHead
        }else{
            newHead.next = this.head
            this.head = newHead
        }
        this.length ++
        
        return this
    }

    get(index){

        if (index < 0 || index >= this.length)
            return null
        var current = this.head
        for(var i= 0 ; i< index ; i++){
            current = current.next
        }

        return current
    }
    
    set(index, val){

        var node = this.get(index)
        if(!node) return false
        node.val = val
        
        return true
    }

    insert(index , val){
        if (index < 0 || index >= this.length) return false
        if(index === 0) this.unShift(val)
        else if(index === this.length) this.push(val)
        else {
            var previousNode = this.get(index-1)
            var nextNode = this.get(index)
            if(!previousNode || !nextNode) return false
            var newNode = new Node(val)
            previousNode.next = newNode
            newNode.next = nextNode
            this.length++
        }
        
       
        return true
    }

    remove(index){
        if (index < 0 || index >= this.length) return false
        if(index === 0) this.shift()
        else if(index === this.length) this.pop()
        else{
            var nextNode = this.get(index+1)
            var previousNode = this.get(index-1)
            previousNode.next = nextNode
            this.length--
        }
        
        return true
    }

    reverse(){
        var node = this.head
        this.head = this.tail
        this.tail = node
        var prev = null
        var next;
        for(var i= 0 ; i< this.length ; i++){
            next = node.next
            node.next = prev
            prev = node
            node = next
        }
        return this
    }

    print(){
        var arr = []
        var current = this.head
        while(current){
            arr.push(current.val)
            current= current.next
        }
        console.log(arr)
    }
}


var list = new SinglyLinkedList()
list.push(100)
list.push(201)
list.push(250)
list.push(350)
list.push(999)

list.pop()
list.unShift(55)
list.remove(2)
list.push(44)
list.insert(1 , 666)
list.set(3 , 112)
list.reverse()
list.shift()
list.print()
