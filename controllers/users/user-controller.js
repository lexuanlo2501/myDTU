const bcrypt = require('bcrypt');
const Users = require('../../models/users/users.mongo');
const getAllUsers = async(req,res)=>{
    try{
        const results = await Users.find({},{password:0,__v:0});
        res.status(200).json({content:results});
    }
    catch(error){
        res.status(404).json({errorMessage:error.message});
    }
}



const findUsers = async(req,res)=>{
    try{
        const results = await Users.find({...req.body},{password:0,__v:0});
        res.status(200).json({content:results});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy thông tin người dùng theo yêu cầu`});
    }
}

const modifyUser = async(req,res)=>{
    try{
        const result = await Users.findOne({uid:req.body.uid});
        const newPassword = req.body.password? await bcrypt.hash(req.body.password,10):result._doc.password;
        await  Users.findOneAndUpdate({uid},{...result._doc,...req.body,password:newPassword});
        res.status(200).json({message:`Bạn đã sửa thành công thông tin của người dùng : ${result.full_name}`});
     
    }
    catch (error){
        res.status(400).json({errorMessage:`Có vấn đề với việc sửa đổi thông tin , vui lòng xem lại biểu mẫu ${error.message}`})
    }
}

const patchManyUsers = async (req,res)=>{
    try {
        const result = await Users.updateMany({...req.body.conditions},{...req.body.updated});
        res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.modifiedCount} người dùng`})
    } catch (error){
        res.status(400).json({errorMessage:`Không thể sửa đổi thông tin người dùng theo yêu cầu : ${error.message}`});
    }
}

const deleteUser = async(req,res)=>{
    try{
    await Users.findOneAndDelete({...req.body});
    res.status(200).json({message:`Bạn đã xóa thành công người dùng `,payload:{...req.body}});
    } catch{
        res.status(404).json({errorMessage:`Không tìm thấy thông tin người dùng cần xóa`});
    }

}

const deleteManyUsers = async(req,res)=>{
    try{
        const result = await Users.deleteMany({...req.body});
        res.status(200).json({message:`Bạn đã xóa thành công ${result.deletedCount} người dùng`});
    }
    catch(error){
        res.status(400).json({errorMessage:`Không thể xóa người dùng theo yêu cầu : ${error.message}`});
    }
}

module.exports = {getAllUsers,findUsers,modifyUser,patchManyUsers,deleteUser,deleteManyUsers}