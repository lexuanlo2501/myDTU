const
    ClassSubscribe = require('./Subscribe Class/class.subscribe');
    UnsubscribeClass = require('./Unsubscribe class/class.unsubscribe');



const registerClass = async (req,res)=>{
    const 
        {signUpCode} = req.body,
        {_id} = req.user;
    
    try{
        const {message}  = await ClassSubscribe(signUpCode,_id);
        res.status(200).json({message:`Bạn ${message}`});
}
    catch(error)
    {
        console.log(error);
        res.status(400).json({errorMessage:`Không thể đăng ký lớp theo yêu cầu vui lòng xem lại thông tin đăng ký !`,errorLog:error});
    }
}





const removeClass = async (req,res)=>{
    const 
        {_id} = req.user, 
        {class_id} = req.body;
    try{
    
        await UnsubscribeClass(class_id,_id);
        res.status(200).json({message:`Bạn đã hủy đăng ký thành công lớp : ${class_id}`});
    }
    catch(error){
        console.log(error);
        res.status(400).json(
        {
            errorMessage:`Không thể hủy đăng ký lớp ${class_id} , vui lòng xem lại thông tin lớp hoặc thử lại sau`,
            errorLog:error
        });
    }
}


module.exports = {registerClass,removeClass};


