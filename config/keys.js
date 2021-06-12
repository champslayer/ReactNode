
//keys to check which set of production keys to use

if(process.env.NODE_ENV === 'production'){
     //in production return prod set of keys
     module.exports = require('./prod');
} 
else{
     //in devlopment return dev set of keys
     module.exports = require('./dev');
}
// node_env tell us wheather we are in production or not