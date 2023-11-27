var API = (()=>{
    

    const BASE_URL = 'https://study.duyiedu.com';
    const TOKEN_KEY = 'token';

    async function get(GET){
        headers = {};
        var token = window.localStorage.getItem(TOKEN_KEY);
        if(token){
            headers.authorization = `Bearer ${token}`         //  文档格式就是  `Bearer空格token`
        }
        return await fetch(BASE_URL + GET,{headers})
    }

   async function post(path,aobj){
        var headers = {
            'Content-Type': 'application/json',
        };
        var token = localStorage.getItem(TOKEN_KEY);     // 出错原因  传入了一个字符串'TOKEN_KEY'
        if(token){
            headers.authorization = `Bearer ${token}`
        }
        return await fetch(BASE_URL + path,{
            method:'post',
            headers,
            body : JSON.stringify(aobj)
        })

    }
    //  注册
    async function reg(userInfo){         // 响应头 
       
        var resp = await post('/api/user/reg',userInfo)
        return await resp.json()   // 响应体
    }


    // 登入
    async function login(loginInfo){
       var resp = await post('/api/user/login',loginInfo)
        var body = await resp.json()
       if(body.code === 0){
        var token = resp.headers.get('authorization')                //  出错原因  获取authorization方式错误
        localStorage.setItem(TOKEN_KEY,token);                      //  出错原因   传入了一个字符串'TOKEN_KEY'    
       }  
       return body
    }

    //验证账号
    async function exists(loginId){
        console.log(loginId);
        var resp = await get('/api/user/exists?loginId='+loginId)
        return await resp.json()
    }
    

    
    async function profile(){
        var resp = await get('/api/user/profile')
        return await resp.json()
    }
     // 发送聊天消息
    async function sendChat(content) {
        console.log(content);
        var resp = await post('/api/chat',{
            content,      //  content:content
        })
        return await resp.json()
    }
    async function getHistory(){
        var resp =await get('/api/chat/history')
        return await resp.json()
    }

    async function deleteaccount() {
        localStorage.removeItem(TOKEN_KEY)
    }

    return{
        reg,
        login,
        exists,
        profile,
        sendChat,
        getHistory,
        deleteaccount
    }
})()





