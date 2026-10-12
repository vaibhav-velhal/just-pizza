const joi = require("joi");
const md5 = require("md5");
const userDb = require("./user.db.js");

const userService = {};


// // Insert user
// userService.addUser = function(req, res, next) {
//     try {
//         const db = req.app.locals.db;
//         const reqBody = req.body;

//         // console.log(reqBody);
//         // res.status(200).json(reqBody).end();

//         const schema = joi.object({
//             firstName : joi.string().alphanum().min(2).max(20).required(),
//             lastName : joi.string().alphanum().min(2).max(20).required(),
//             age : joi.number().min(18).max(65).required(),
//             email : joi.string().email().required(),
//             password : joi.string().min(8).max(12).required(),
//             country : joi.string().min(3).max(28).required()
//         });

//         var { value, error } = schema.validate(reqBody);

//         if (error) {
//             res.status(400).send("Invalid request").end();
//             return;
//         }

//         value.password = md5(value.password);

//         userDb
//             .addUser(db, value)
//             .then(function (output) {
//                 res.status(201).send("User has inserted successfully!").end();
//             })
//             .catch(function (error) {
//                 next(error);
//             });
//     } catch(error) {
//         next(error);
//     }
// };


// Get all users
// userService.getAllUsers = function(req, res, next) {
//     try {
//         const db = req.app.locals.db;

//         userDb.getAllUsers(db)
//             .then(function(output){
//                 res.status(200).send(output);
//             })
//             .catch(function(error){
//                 next(error);
//             });
//     } catch(error) {
//         next(error);
//     }
// };


// Get a single user
userService.getUserById = function(req, res, next) {
    try {
        const db = req.app.locals.db;
        // const params = req.params.userId;
        const userId = req.headers.userId;
        
        userDb.getUserById(db, userId)
            .then(function(user){
                if(!user){
                    return res.status(404).send("User not found.");
                }
                res.status(200).json(
                    {
                        _id : user.id,
                        firstName: user.firstName, 
                        lastName: user.lastName, 
                        phone: user.phone, 
                        email: user.email
                    }
                );
            })
            .catch(function(error){
                next(error);
            });
    } catch(error) {
        next(error);
    }
};


// Delete user
userService.deleteUser = function(req, res, next) {
    try {
        const db = req.app.locals.db;
        // const params = req.params.userId;
        const userId = req.headers.userId;

        userDb.deleteUser(db, userId)
            .then(function(output){
                if (output.deletedCount === 0) {
                    return res.status(404).json({msg: "User not found."});
                }
                res.status(200).json({msg : "User deleted successfully!"});
            })
            .catch(function(error){
                next(error);
            });
    } catch(error) {
        next(error);
    }
};


// Update user
userService.updateUser = function(req, res, next) {
    try {
        const reqBody = req.body;

        if(reqBody.password === '') {
            delete reqBody.password
        }

        const db = req.app.locals.db;
        // const params = req.params.userId;
        const userId = req.headers.userId;

        const updateSchema = joi.object({
            firstName: joi.string().pattern(/^[A-Za-z ]+$/).min(2).max(20).required(),
            lastName: joi.string().pattern(/^[A-Za-z ]+$/).min(2).max(20).required(),
            phone: joi.string().pattern(/^[0-9]{10}$/).required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).max(12)
        }).min(1);

        const { value, error } = updateSchema.validate(reqBody);
        
        if (value.password) {
            value.password = md5(value.password);
        }

        if(error){
            console.log(error);
            res.status(400).json({msg : "Invalid Request"}).end();
            return;
        }

        userDb.updateUser(db, userId, value)
            .then(function(output){
                res.status(200).json({msg: "User has updated successfully!"})
            })
            .catch(function(error){
                next(error);
            })
    } catch(error) {
        next(error);
    }
};

module.exports = userService;