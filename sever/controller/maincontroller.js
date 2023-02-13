const db = require("../config/connection");
// const collection = require("../config/collection");
const addStudent = (req, res) => {
  console.log(req.body);
  db.get()
    .collection(collection.STUDENT_COLLECTION)
    .insertOne(req.body)
    .then(() => {
      res
        .status(201)
        .json({ status: true, message: "Successfully Registered" });
    })
    .catch((err) => {
      res.status(500).json({ status: false, message: err });
    });
};
const addParentDetails = async (req, res) => {
  console.log(req.body);

  let details = {
    rollno: req.body.rollno,
    father: req.body.fatherName,
    mother: req.body.motherName,
  };
  studentDetails = await db
    .get()
    .collection(collection.STUDENT_COLLECTION)
    .findOne(details.rollno);

  details.studentDetails = studentDetails._id;
  db.get()
    .collection(collection.PARENT_COLLECTION)
    .insertOne(details)
    .then(() => {
      res
        .status(201)
        .json({ status: true, message: "Successfully Added" });
    })
    .catch((err) => {
      res.status(500).json({ status: false, message: err });
    });
 
};

module.exports = {
  addStudent,
  addParentDetails,
};
