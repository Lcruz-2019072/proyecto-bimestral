import { compare, hash } from 'bcrypt';

export const encrypt = async (password) => {
    try {
        return await hash(password, 10);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch (error) {
        console.error(error)
        return error
    }
}
export const checkUpdate = (data, id)=>{
    if(id){
        if(Object.entries(data).length === 0 ){
            return false
        }
        return true
    }else{
        if(Object.entries(data).length === 0 ||
            data.description ||
            data.description == ''||
            data.trademark ||
            data.trademark ==''){
            return false
        }
        if (Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ) {
            return false
        }
        return true
    }
    
}