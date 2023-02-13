const express=require('express');
const { addStudent ,addParentDetails,sendOTP,verifyOTP} = require('../controller/maincontroller');

const routs=express.Router();

routs.post('/addStudent',addStudent)
routs.post('/addParentDetails',addParentDetails)
routs.post('/sendOTP',sendOTP)
routs.post('/verifiyOTP',verifyOTP)

module.exports=routs;