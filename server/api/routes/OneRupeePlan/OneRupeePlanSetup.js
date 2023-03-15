const User = require("../../../../models/User");
const OneRupeePlanUser = require("../../../../models/OneRupeePlan")


async function OneRupeePlanSetup(req, res){
    
    try {
        const {coverText, userID, subdomain} = req.body;

        const user = await OneRupeePlanUser.create({coverText, user_id:userID, subdomain});
        // console.log(user);
        console.log(userID)

        if(user){
            await User.findByIdAndUpdate(userID, {plan: "1-rs-plan", subdomain: subdomain}).then((coll, err) => {
                if(err){
                    console.log(1111, err)
                    return res.status(200).json(JSON.stringify({sucess: false}))
                }
                console.log(coll)
                return res.status(200).json(JSON.stringify({sucess: true}))
            })
        }else{
            return res.status(200).json(JSON.stringify({sucess: false}))
        }
        
        
    } catch (error) {
        console.log(error)
        // return res.status(200).json(JSON.stringify({sucess: false}))
    }
}

module.exports = OneRupeePlanSetup;