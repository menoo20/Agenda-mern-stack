var jwt = require('jsonwebtoken');

const createToken =(id, role)=>{
    const accessToken = jwt.sign({
        id: id,
        isAdmin: role  // i need to know here what is the best way to make roles for users and admin 
    }, 
    process.env.USER_TOKEN_SECRET,
    {expiresIn: "3d"}
    )

    return accessToken

}

module.exports = createToken