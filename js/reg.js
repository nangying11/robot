var accountlogID = new Fixeduniversal('#txtLoginId',async function(val){
    if(!val){
        return '账号不能为空'
    }
    // console.log('data');
    var resp = await API.exists(val)
    if(resp.data){
    
        return '账号已经被使用'
    }

})


var nicknamestring = new Fixeduniversal('#txtNickname',async function(val){
    if(!val){
        return '账号不能为空'
    }
})

var robotpassword = new Fixeduniversal('#txtLoginPwd',async function(val){
    if(!val){
        return '账号不能为空'
    }
})

var robotpasswordtrue = new Fixeduniversal('#txtLoginPwdConfirm',async function(val){
    if(!val){
        return '账号不能为空'
    }
    console.log(val,robotpassword.input.value);
    if(val !== robotpassword.input.value){
        return '重新确认，密码不一致'
    }
})

var form = $(".user-form")

form.onsubmit = async function(e){
    e.preventDefault();
    var data = await Fixeduniversal.inpect(
        accountlogID,
        nicknamestring,
        robotpassword,
        robotpasswordtrue,
    )
    console.log(data);
    if(!data){
        return
    }
    var price =  new FormData(form)
   var objprice =  Object.fromEntries(price.entries());
   console.log(objprice);
   const resp = await API.reg(objprice)
   console.log(resp);
   if(resp.code === 0){
        alert('登入成功，即将转入登入页面')
        location.href ='./login.html'
        
   }
}