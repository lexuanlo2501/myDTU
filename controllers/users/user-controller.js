const bcrypt = require('bcrypt');
const Users = require('../../models/users.mongo');
const getAllUsers = async(req,res)=>{
    try{
        const results = await Users.find();
        const data = results.map(result=>{
            result.password = undefined;
            result.__v = undefined;
            return result;
        })
        res.status(200).json({content:data});
    }
    catch(error){
        res.status(404).json({errorMessage:error.message});
    }
}

const getUserById = async(req,res)=>{
    try{
        const result = await Users.findById(req.params.id);
        const {_doc} = result;
        delete _doc.password;
        delete _doc.__v;
        res.status(200).json({content:_doc});
    }
    catch {
        res.status(404).json({errorMessage:`Không tìm thấy người dùng`});
    }
}

const findUsers = async(req,res)=>{
    try{
        const results = await Users.find({...req.body});
        const data = results.map(result=>{
            result.password = undefined;
            result.__v = undefined;
            return result;
        })
        res.status(200).json({content:data});
    }
    catch {
 
        res.status(404).json({errorMessage:`Không tìm thấy thông tin người dùng theo yêu cầu`});
    }
}

const modifyUser = async(req,res)=>{
    const {id} = req.params;
    try{
       
        const result = await Users.findById(id);
        const newPassword = req.body.password? await bcrypt.hash(req.body.password,10):result._doc.password;
        result.overwrite({...result._doc,...req.body,password:newPassword});
        await result.save();
        res.status(200).json({message:`Bạn đã sửa thành công thông tin của người dùng : ${result.full_name}`});
     
    }
    catch (error){
        res.status(400).json({errorMessage:`Có vấn đề với việc sửa đổi thông tin , vui lòng xem lại biểu mẫu ${error.message}`})
    }
}

const patchManyUsers = async (req,res)=>{
    try {
        const result = await Users.updateMany({...req.body.conditions},{...req.body.updated});
        res.status(200).json({message:`Bạn đã sửa đổi thành công thông tin của ${result.nModified} người dùng`})
    } catch (error){
        res.status(400).json({errorMessage:`Không thể sửa đổi thông tin người dùng theo yêu cầu : ${error.message}`});
    }
}

const deleteUser = async(req,res)=>{
    try{
    const {id}= req.params;
    await Users.findByIdAndRemove(id);
    res.status(200).json({message:`Bạn đã xóa thành công người dùng với id: ${id}`});
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

module.exports = {getAllUsers,findUsers,getUserById,modifyUser,patchManyUsers,deleteUser,deleteManyUsers}