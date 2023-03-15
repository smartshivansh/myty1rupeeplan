const User = require("../../../../models/User");


async function BookSubDomain(req, res){

    const {userID, subdomain} = req.body;
    
    try {
        User.findByIdAndUpdate(userID, {subdomain: subdomain})
        .then((coll, err) => {
            if(err){
                return res.status(200).json(JSON.stringify({sucess: false}))
            }
            return res.status(200).json(JSON.stringify({sucess: true}))
        })
    } catch (error) {
        console.log(error)
        return res.status(200).json(JSON.stringify({sucess: false}))
    }
}

module.exports = BookSubDomain;