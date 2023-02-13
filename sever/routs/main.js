const express=require('express');
const { addStudent } = require('../controller/maincontroller');

const routs=express.Router();

routs.post('/addStudent',addStudent)
// routs.post('/test',((req,res)=>{
//     console.log(req.body);
// }))

module.exports=routs;