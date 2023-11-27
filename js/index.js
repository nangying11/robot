(async  ()=>{
    // 有账号才能进来才有信息
    var user = await API.profile()
    if(!user.data){
        alert('未登录或登录已过期，请重新登录');
        location.href = './login.html'
        return;
    }
    console.log(user);
    // 获取信息集合
    const dom = {
        aside:{
            nickname:$('#nickname'),
            loginId:$('#loginId')
        },
        chatcontainer:$('.chat-container'),
        txtMsg:$('#txtMsg'),
        close:$('.close'),
        msgcon:$('.msg-container'),
    }


    // 账户信息绑定  本来放在最开始 但是不严谨
    setUserInfo()


    //  关闭按钮
    dom.close.onclick = function(){
        loginout()
    }



// 获取聊天记录  自己写的加载超级慢
await operationchathistory()
async function operationchathistory(){
    var resp = await API.getHistory()
    for(const item of resp.data){

        getchatsum(item);
    }
    pulley();
}


// 事件
function rechargedate(getdate){
    var date = new Date(getdate);
    var year = date.getFullYear()
    var month = (date.getMonth() + 1).toString().padStart(2,'0')
    var day = (date.getDate() + 1).toString().padStart(2,'0')
    var Hours = (date.getHours()+1).toString().padStart(2,'0')
    var Minut = (date.getMinutes()+1).toString().padStart(2,'0')
    var Second = (date.getSeconds()+1).toString().padStart(2,'0')
    // console.log(Second);
    return `${year}-${month}-${day} ${Hours}:${Minut}:${Second}`
}

// record{
//    form
// }
// 获取数据  加载到聊天窗口
function getchatsum(record){
    var div = $$$("div");
    div.classList.add("chat-item");
    if(record.from){
        div.classList.add("me");
    }
    var img = $$$('img');
    img.classList.add("chat-avatar")
    img.src = record.from ? './asset/avatar.png':'./asset/robot-avatar.jpg';
    var divcontent = $$$("div")
    divcontent.classList.add("chat-content");
    divcontent.innerText = record.content;
    var chatdate = $$$("div");
    chatdate.classList.add("chat-date");
    chatdate.innerText = rechargedate(record.createdAt);

    div.appendChild(img);
    div.appendChild(divcontent);
    div.appendChild(chatdate);

    dom.chatcontainer.appendChild(div);
}




// 发送消息
dom.msgcon.onsubmit = function (e){
    e.preventDefault();
    sendChatsum()
}


async function sendChatsum(){
    var content = txtMsg.value.trim();
    // console.log(chatcontainer.value);
    if(!content){
        return
    }

    getchatsum({                               //  先不发送到服务器 先发送到聊天框 让用户体验感上升              
        from:user.data.loginId,
        to:null,
        content,
        createdAt:new Date(),
    })
    dom.txtMsg.value = '';
    pulley();
    var resp = await API.sendChat(content)     // 发送到服务器
    console.log(resp);
    getchatsum({                    //  把服务器的响应经过处理渲染到聊天界面上
        from: null,
        to: user.data.loginId,
        ...resp.data,
    })
    pulley();
}


window.sendChatsum = sendChatsum;    //   放在window 方便调试





// 账户信息函数
function setUserInfo(){
    dom.aside.nickname.innerText = user.data.nickname;
    dom.aside.loginId.innerText = user.data.loginId;
}

// console.log(dom.chatcontainer.scrollTop);     //  当一个元素的内容没有产生垂直方向的滚动条，那么它的 scrollTop 值为0
// console.log( dom.chatcontainer.scrollHeight);   // 一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
function pulley(){
    dom.chatcontainer.scrollTop = dom.chatcontainer.scrollHeight;
    console.log( dom.chatcontainer.scrollTop);
}



// 关闭函数
function loginout(){
    API.deleteaccount()
    alert('注销成功')
    location.href = './login.html'
}








})()
