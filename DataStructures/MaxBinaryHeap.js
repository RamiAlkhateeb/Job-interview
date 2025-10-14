class MaxBinaryHeap {
    constructor() {
        this.values = []
    }

    insert(value) {
        this.values.push(value)

        this.bubbleUp()

    }

    extractMax(){
        
        var last = this.values.pop()
        var max= this.values[0]
        if(this.values.length > 0){
            this.values[0] = last
            this.sinkdown()
        }
        
        return max
    }

    bubbleUp() {
        var data = this.values
        //var len = data.length
        var index = data.length - 1
        
        while (index > 0) {
            var parentidx = Math.floor((index - 1) / 2)
            if (data[index] > data[parentidx]) {
                this.swap(data, index , parentidx)
                index = parentidx
            } else
                break
        }

    }

    // [55,41,39,33,18,27,12]
    sinkdown(){
        var data = this.values
        var len = data.length - 1
        var parentIdx = 0
        
        while (parentIdx < len -2) {
            var leftChildIdx = 2 * parentIdx + 1 
            var rightChildIdx = 2 * parentIdx + 2 
            if (data[parentIdx] < data[leftChildIdx] && data[parentIdx] < data[rightChildIdx] ) {
                
                index = parentIdx
            } else
                break
        }
    }

    swap(data , first , second){
        var temp = data[first]
        data[first] = data[second]
        data[second] = temp
    }

}



var heap = new MaxBinaryHeap()
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
console.log(heap)
