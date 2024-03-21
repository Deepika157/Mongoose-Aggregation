
const mongoose = require("mongoose"); 


const URI = "mongodb://localhost:27017/mydatabase5"

const connectionObject = mongoose.createConnection(URI ); 

const studentSchema = new mongoose.Schema({ 
    name: { type: String }, 
    age: { type: Number }, 
    rollNumber: { type: Number }, 
}); 
  
const Student = connectionObject.model('Student', studentSchema); 
  
Student.aggregate().project({ age: 1 }).then(resultSet => { 
    console.log(resultSet); 
}).catch(error => console.log(error));
