class Search_Student {

    constructor(grid, config) {
        
        this.config = config;       // search configuration object
                                    //   config.actions = array of legal [x, y] actions
                                    //   config.actionCosts[i] = cost of config.actions[i]
                                    //   config.strategy = 'bfs' or 'dfs'

        this.grid = grid;           // the grid we are using to search
        this.sx = -1;               // x location of the start state
        this.sy = -1;               // y location of the start state
        this.gx = -1;               // x location of the goal state
        this.gy = -1;               // y location of the goal state
        this.cost = 0;

        this.maxDepth = 0;
        this.cutoff_occurred;

        this.inProgress = false;     // whether the search is in progress
        this.name = 'Student';

        this.path = [];             // the path, if the search found one
        this.open = [];             // the current open list of the search (stores Nodes)
        this.closed = [];           // the current closed list of the search
    }
    
    // Student TODO: Implement this function
    //
    // This function should set up all the necessary data structures to begin a new search
    // This includes, but is not limited to: setting the start and goal locations, resetting
    // the open and closed lists, and resetting the path. I have provided a starting point,
    // but it is not complete.
    //
    // Args:
    //    sx, sy (int,int) : (x,y) position of the start state
    //    gx, gy (int,int) : (x,y) position of the goal state
    //
    // Returns:
    //    none             : this function does not return anything
    //
    startSearch(sx, sy, gx, gy) {
                                               
        this.inProgress = true;     // the search is now considered started
        this.sx = sx;               // set the x,y location of the start state
        this.sy = sy;
        this.gx = gx;               // set the x,y location of the goal state
        this.gy = gy;
        this.path = [];             // set an empty path

        this.open =[new Node(sx, sy, null, null)];
        this.cutoff_occurred=false;
        this.closed=[];
        console.log(this.open);
        // TODO: everything else necessary to start a new search
        // reset open and closed lists
        // create root node and add it to the open list
        //   use null for the parent of the root node (see Node class below)
    }

    // Student TODO: Implement this function
    //
    // This function should compute and return whether or not the given action is able
    // to be performed from the given (x,y) location
    //
    // Args:
    //    x, y   (int,int) : (x,y) location of the given position
    //    action [int,int] : the action to be performed, representing the [x,y] movement
    //                       from this position. for example: [1,0] is move 1 in the x
    //                       direction and 0 in the y direction (move right). For this
    //                       assignment, the only action possibilities should be:
    //                       [1,0], [0,1], [-1,0], [0,-1] 
    //
    // Returns:
    //    bool : whether or not the given action is legal at the given location
    isLegalAction(x, y, action) {

        // 1. create nx, ny (new location after action perform)
        // 2. if this.grid.isOOB(nx,ny) then return false
        // 3. if this.grid.get(x,y) not same as this.grid.get(nx,ny) return false
        let nx = x+action[0];
        let ny = y+action[1];
        if(this.grid.isOOB(nx, ny)){
            return false;
        }                
        else if(this.grid.get(x, y) != this.grid.get(nx, ny)){
            return false;
        }                
        return true;
    }
                                               
    // Student TODO: Implement this function
    //
    // This function performs one iteration of search, which is equivalent to everything
    // inside the while (true) part of the algorithm pseudocode in the class nodes. The
    // only difference being that when a path is found, we set the internal path variable
    // rather than return it from the function. When expanding the current node, you must 
    // use the this.isLegalAction function above.
    //
    // If the search has been completed (path found, or open list empty) then this function
    // should do nothing until the startSearch function has been called again. This function
    // should correctly set the this.inProgress variable to false once the search has been
    // completed, which is required for the GUI to function correctly.
    //
    // This function should perform one iteration of breadth-first search (BFS) if the
    // this.config.strategy variable == 'bfs', or one iteration of depth-first search (DFS) if
    // the this.config.strategy variable == 'dfs'. 
    //
    // Tip: You can use a JavaScript array to represent a queue or a stack
    //      Array.push(e) - pushes an element onto the end of the array
    //      Array.pop()   - return and remove the last element, simulating a stack
    //      Array.shift() - to return and remove the first element, simulating a queue
    //      You may also use your own custom data structure(s) if you wish
    //
    // Args:
    //    none
    //
    // Returns:
    //    none
    //
    searchIteration() {

        if(this.grid.get(this.gx, this.gy)!=this.grid.get(this.sx, this.sy)){this.inProgress=false;}
                                               
        // if the search strategy is iddfs, call its own function
        if (this.config.strategy == 'iddfs') { this.searchIterationIDDFS(); return; }

        // if we've already finished the search, do nothing
        if (!this.inProgress) { return; }

        // Example: For simple demonstration, compute an L-shaped path to the goal
        // This is just so the GUI shows something when Student code is initially selected
        // Completely delete all of this example code to write your solution
        var dx = (this.gx - this.sx) > 0 ? 1 : -1;
        var dy = (this.gy - this.sy) > 0 ? 1 : -1;
        for (var x=0; x < Math.abs(this.gx-this.sx); x++) { this.path.push([dx, 0]); }
        for (var y=0; y < Math.abs(this.gy-this.sy); y++) { this.path.push([0, dy]); }
        
        // check to see which algorithm you should be implementing
        if (this.config.strategy == 'bfs') {
            // do breadth-first-search
        } else if (this.config.strategy == 'dfs') {
            // do depth-first-search
        }
                                               
        // the cost of the path for this assignment is the path length * 100
        // since all action costs are equal to 100 (4-directional movement)
        this.cost = this.path.length * 100;

        // we found a path, so set inProgress to false
        this.inProgress = false;
    }

    // Student TODO: Implement this function
    //
    // This is where the IDDFS algorithm should be performed
    searchIterationIDDFS() {

        if (!this.inProgress) { return; }
                                               
        // Tips for ID-DFS:
        //
        //this.open = [new Node(this.sx, this.sy, null, null)];
        console.log(this.open);
        let result;
        // 1) Check if open list is empty
        if(this.open.length == 0){
            console.log("Check if open list is empty");
            console.log(this.cutoff_occurred);
            if(this.cutoff_occurred){
                console.log("empty and caused by a depth cutoff");
                this.maxDepth+=1;
                this.L=0;
                console.log(this.maxDepth);
                this.startSearch(this.sx, this.sy, this.gx, this.gy);
            }
            else{ this.inProgress=false;}
        }
        //    If empty and caused by a depth cutoff
        //      Increase the maximum depth and start searching again
        //      May require resetting various data structures (open/closed)
        //    If empty and NOT caused by a depth cutoff
        //      This is a search failure, do the appropriate things
        //
        let node1 = this.open.pop(); console.log(node1);
        // for(let d=1; d<=this.maxDepth; d++){
        //     result = this.DLS1(node1, d);
        //     console.log(this.maxDepth, d, result, this.open);
        // }
        result =this.DLS1(node1); console.log(this.maxDepth, result, this.open);
        // 2) Implement ID-DFS with open-list only before adding closed list
        //    This will mean that only very short paths (< 10 actions) are possible
        // 
        // 3) Implement the closed list, which may be a little tricky
        //    hint: you cannot use a simple binary check for closed list membership
        //          it will depend on the depth the state was added to the closed list

        // we found a path, so set inProgress to false
        if(result=="failure"){
            this.inProgress = false;
        }
    }

    DLS(node, L){
        this.cutoff_occurred=false;
        if(node.depth>=L){
            this.cutoff_occurred = true;
            return "cutoff";
        }
        for(let s=0; s<this.config.actions.length; s++){
            let node1 = new Node(node.x + this.config.actions[s][0], node.y + this.config.actions[s][1], this.config.actions[s], node);
            this.open.push(node1); console.log("pushed"); console.log(this.open);
            let result = this.DLS(node1, L);
            
            if(result!="failure" && result!="cutoff"){
                return result;
            }
        }
        return this.cutoff_occurred? "cutoff":"failure";
    }
    DLS1(node){
        if(node.depth>=this.maxDepth){
            this.cutoff_occurred =true;
            return "cutoff";
        }
        if(node.x == this.gx && node.y == this.gy){
            let current = node;
            while(current.parent!=null){
                this.path.push(current.action);
                current=current.parent;
            }
            this.path.reverse();
            this.path.cost = this.path.length*100;
            this.inProgress = false;
            return this.path;
        }
        loop1: for(let s=0; s<this.config.actions.length; s++){
            let node1 = new Node(node.x + this.config.actions[s][0], node.y + this.config.actions[s][1], this.config.actions[s], node);
            if(!this.isLegalAction(node.x, node.y, node1.action)){
                //if(this.open.length==0 && s==this.config.actions.length-1){this.cutoff_occurred = true;}
                continue loop1;
            }
            for(let c=0; c<this.closed.length; c++){
                if(this.closed[c].x == node1.x && this.closed[c].y == node1.y && node1.depth>=this.closed[c].depth){
                    //if(this.open.length==0 && s==this.config.actions.length-1){this.cutoff_occurred = true;}
                    continue loop1;
                }
            }
            for(let c=0; c<this.open.length; c++){
                if(this.open[c].x == node1.x && this.open[c].y == node1.y){
                    //if(this.open.length==0 && s==this.config.actions.length-1){this.cutoff_occurred = true;}
                    continue loop1;
                }
            }
            if(node1.depth>=this.maxDepth){
                this.cutoff_occurred = true;
                return "cutoff";
            }
            else if(node1.depth<this.maxDepth){
                this.open.push(node1); console.log("pushed to open"); console.log(this.open);
            }
            
        }
        
        this.closed.push(node); console.log("pushed to closed"); console.log(this.closed);
    }
    // Student TODO: Implement this function
    //
    // This function returns the current open list states in a given format. This exists as
    // a separate function because your open list used in search will store nodes
    // instead of states, and may have a custom data structure that is not an array.
    //
    // Args:
    //    none
    //
    // Returns:
    //    openList : an array of unique [x, y] states that are currently on the open list
    //
    getOpen() {
        let openList=[];
        for(let s=0; s<this.open.length;s++){
            openList.push([this.open[s].x, this.open[s].y]);
        }
        return openList;
    }

    // Student TODO: Implement this function
    //
    // This function returns the current closed list in a given format. This exists as
    // a separate function, since your closed list used in search may have a custom 
    // data structure that is not an array.
    //
    // Args:
    //    none
    //
    // Returns:
    //    closedList : an array of unique [x, y] states that are currently on the closed list
    //
    getClosed() {
        let closedList = []
        for(let s=0; s<this.closed.length; s++){
            closedList.push([this.closed[s].x, this.closed[s].y]);
        }
        return closedList;
    }
}

// The Node class to be used in your search algorithm.
// This should not need to be modified to complete the assignment
class Node {
    constructor(x, y, action, parent) {
        this.x = x;
        this.y = y;
        this.action = action;
        this.parent = parent;
        this.depth = (parent == null) ? 0 : parent.depth + 1;
    }
}