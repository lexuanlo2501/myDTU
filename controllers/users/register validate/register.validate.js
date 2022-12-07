const Users = require('../../../models/users/users.mongo');
module.exports = { 
IsRegisterable : (role)=>{
        return ['Sinh viên','Giảng viên'].some(_role=>role.includes(_role));
},
UserInfoExist : async (newUser)=>{
    const 
        {email,uid} = newUser,
        result = await Users.findOne({email}).lean() || await Users.findOne({uid}).lean();
    if(!result) return {};
    return {emailFound:result.email , uidFound:result.uid}; 

},
IsStudent  : role=> 'Sinh viên'.includes(role),
IsLecturer : role =>'Giảng viên'.includes(role)
}

