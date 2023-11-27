var accountlogID = new Fixeduniversal('#txtLoginId',async function(val){
    if(!val){
        return '账号不能为空'
    }
    // console.log('data');
    var resp = await API.exists(val)
    // if(resp.data){
    
    //     return '账号已被使用'
    // }

})

var robotpassword = new Fixeduniversal('#txtLoginPwd',async function(val){
    if(!val){
        return '账号不能为空'
    }
})

var form = $('.user-form');

form.onsubmit = async function(e){
    e.preventDefault();
    var data = await Fixeduniversal.inpect(
        accountlogID,
        robotpassword,
    )
    console.log(data);
    if(!data){
        return
    }
    var formdata = new FormData(form)
    var resp = Object.fromEntries(formdata.entries());
    var data = await API.login(resp)
    console.log(data);
    if(data.code === 0){
        alert('登入成功，即将跳转首页');
        location.href ='./index.html'
    }else{
        accountlogID.p.innerText = '账号或密码错误'
    }

}