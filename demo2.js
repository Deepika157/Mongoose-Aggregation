
const mongoose = require("mongoose"); 
const { Types } = require('mongoose');


const URI = "mongodb://localhost:27017/mydatabase6"; 

const connectionObject = mongoose.createConnection(URI); 

const Customer = connectionObject.model( 
	"customers", 
	new mongoose.Schema({ 
		name: String, 
		address: String, 
		orderNumber: Number, 
        age: Number,
	}) 
); 
const orders = connectionObject.model( 
	"orders", 
	new mongoose.Schema({ 
		amount: Number, 
		cust_id: Types.ObjectId,
	}) 
); 
orders.aggregate([
    {   $lookup: {
        from: 'customers',           // Target collection
        localField: 'cust_id',        // Field from current collection 
        foreignField: '_id',     // Field from target collection
        as: 'customerDetails' 
      }
    }, {
          $unwind: "$customerDetails"
      },
      {
        $project: { address: "$customerDetails.address", _id: "$customerDetails._id", name:"$customerDetails.name", amount:1 }
      }
  ])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });


Customer.aggregate().project( 
	{ name: 1, _id: 0, orderNumber: 1 } 
).then(resultSet => { 
    console.log(resultSet); 
}).catch(error => console.log(error));



Customer.aggregate([ 
    { $sort: { orderNumber: 1 } },   //sorting according to 
    { $project: { name: 1, _id: 0, orderNumber: 1 } } 
])
.then(result => { 
    console.log(result); 
})
.catch(err => { 
    console.log(err); 
})



Customer.aggregate([ 
    { $skip:  1  },   //skip according to 
    { $project: { name: 1, _id: 0, orderNumber: 1 } } 
])
.then(result => { 
    console.log(result); 
})
.catch(err => { 
    console.log(err); 
})


Customer.aggregate([
    {
      $match: { name: { $gte: "deepika" } } //filter
    }
  ])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });



  Customer.aggregate([
    {
      $limit: 2 // Limit the number of results to 2
    }
  ])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });

  
  Customer.aggregate([
    {
      $age: 21 // Limit the number of results to 2
    }
  ])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });


  Customer.aggregate([
    {
      $group: {
        _id: null,
        averageAge: { $avg: "$age" } // Calculate the average age
      }
    }
  ])
  .then(results => {
    console.log(results);
  })
  .catch(error => {
    console.error(error);
  });


 
