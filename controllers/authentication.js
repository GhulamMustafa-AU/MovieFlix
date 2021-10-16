const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
JWTSecret = "@(*@&^#UKNOUTV#IU@(*@&^2)(JO..N(*(#MMMpoK,,pok_(I@8ug#&*&(!)(OIMPIYBiunoi@)(*!)(&##^*T@^DFC!V"
module.exports = {

    register: async (req, res) => {

        if(!req.body.username || !req.body.email || !req.body.password){
            res.send({error : "No field can be left empty"})
            return
        }

        if(req.body.password.length < 6){
            res.send({error : "Password too small. Should be atleast 6 characters"})
            return
        }

        if(req.body.password != req.body.confirmPassword){
            res.send({error : "Make sure password field and confirm password are the same"})
            return
        }

        var password = req.body.password
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(password, 10)
        })

        user.save(user)
            .then(data => {
                res.send({success: data.username +" registered to MovieFlix"})
            })
            .catch(error => {
                if (error.code == 11000)
                    res.send({error: "User already exists, please proceed to Login"})
                else
                    res.send(error)
            })

    }, 
    
    login: async (req, res) => {
        const{email, password} = req.body
        user = await User.findOne({email}).lean()
        
        if(!user){
            res.send({error : "Email does not exists, Proceed to Registeration"})
            return
        }

        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({
                id: user._id,
                username: user.username            
            }, JWTSecret)
            
            res.send({success: "Login Successful", token: token})
            return
        }
        else{
            res.send({error : "Invalid Email/Password"})
        }
    },

    userprofile: async (req, res) => {
        user = jwt.verify(req.body.token, JWTSecret)   
        res.send(user)
    }
}