const User = require("../../../../models/User");


async function FindById(req, res){
    
    try {
        const user = await User.findById(req.params.id);
        console.log(user)

        if(user){
            return res.status(200).json(JSON.stringify({sucess: true, user}))
        }
        else{
            return res.status(200).json(JSON.stringify({sucess: false, msg: "No user Found"}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = FindById;