const db = require("../config/connection");
const collection = require("../config/collection");
const authToken = process.env.AUTH_TOKEN;
const accountSID = process.env.ACCOUNTS_ID;
const serviceID = process.env.SERVICE_ID;

const client = require("twilio")(accountSID, authToken);
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
    father: req.body.father,
    mother: req.body.mother,
  };
  db.get()
    .collection(collection.STUDENT_COLLECTION)
    .findOne({ rollno: details.rollno })
    .then((student) => {
      if (student) {
        details.studentDetails = student._id;
        db.get()
          .collection(collection.PARENT_COLLECTION)
          .insertOne(details)
          .then((details) => {
            console.log(details.insertedId);
            db.get()
              .collection(collection.STUDENT_COLLECTION)
              .updateOne(
                { _id: details.studentDetails },
                { $set: { parentDetails: details.insertedId } }
              )
              .then(() => {
                res
                  .status(201)
                  .json({ status: true, message: "Successfully Added" });
              });
          })
          .catch((err) => res.status(500).json({ status: false, message: err }))
          .catch((err) =>
            res.status(500).json({ status: false, message: err })
          );
      } else {
        res.status(500).json({ status: false, message: "student notfound.." });
      }
    })
    .catch(() =>
      res.status(500).json({ status: false, message: "student notfound.." })
    );

  // details.studentDetails = studentDetails._id;
};
sendOTP = (req, res) => {
  phone = "+91" + req.body.phone;

  client.verify
    .services(serviceID)
    .verifications.create({
      to: phone,
      channel: "sms",
    })
    .then((data) => {
      res.status(201).json({ status: true, message: `OTP SEND TO ${phone}` });
    })
    .catch((error) => {
      res.status(500).json({ status: false, message: error.message });
    });
};
verifyOTP =  (req, res) => {
 let phone = "+91" + req.body.phone;
  // chcking the otp
  let OTP = req.OTP;
  
     client.verify
      .services(serviceID)
      .verificationChecks.create({
        to: phone,
        code: OTP,
      })
      .then((data) => {
        console.log(data);
        if (data.status == "approved") {
          res
            .status(201)
            .json({ status: true, message: "OTP verification sucessfull..." });
        } else {
          res.status(500).json({ status: false, message: "invalid OTP..." });
        }
      }).catch((err)=>{ console.log(err);
        res.status(500).json({ status: false, message: err.message })});
 
};
module.exports = {
  addStudent,
  addParentDetails,
  sendOTP,
  verifyOTP,
};
