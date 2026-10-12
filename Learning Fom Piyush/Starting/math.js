//when we make a function we need to export that function . Now the function in this module is a private funcction.Now we have to make it export by making it public so that it can be used by anyone

function add(a,b){
    return a+b;
}


function sub(a,b){
    return a-b;
}


// module.exports="Ankit";


// module.exports= add;
// module.exports= sub;  //if you run now the run in hello.js then sub will be called which will overide the add . Now we can use js object to return multiple things

module.exports ={
   addFn: add,
    subFn: sub,
}


//exporting by using export object

//this add1 and add2 are anynomious function
// exports.add1= (a,b) => a+b;
// exports.sub2= (a,b) => a-b;
