// this module contain maths functions
function add(a,b){
 return a+b;
}
function sub(a,b){
    return a-b;
}
// module.exports = {addFn : add,subFn : sub};
exports.addFn = (a,b) =>{ return a+b;}
exports.subFn = (a,b) =>{ return a-b;}
