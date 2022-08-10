
import {v4 as uuidv4} from 'uuid';
// 生成一个随机字符串，且每次执行不能发生变化，游客身份持续存储
export const getUUID=()=>{
    // 先看一下本地是否有，没有在生成，有就直接用
    let uuid_token=localStorage.getItem('UUIDTOKEN');
    if(!uuid_token){
        // 生成临时身份
        uuid_token=uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}
