class Queue{
    constructor(){
        this.items = [];
    }

    enqueue(item){
        this.items.push(item);
    }

    dequeue(){
        if(this.isEmpty()) return "Queue is empty."
        this.items.shift();
    }

    front(){
        if(this.isEmpty()){
            return "Queue is empty."
        }
        return this.items[0]
    }

    isEmpty(){
        return this.items.length === 0 
    }

    getSize(){
        return this.items.length
    }
}

export default Queue;