class Fixeduniversal{
    constructor(loginID,wronginform){
        this.input = $(loginID)  ;
        this.p = this.input.nextElementSibling;
        this.wronginform = wronginform ;
        this.input.onblur = () => {                      //   function  以及 箭头函数 的this的指向不同   箭头函数没有this指向 所以使用的是外面的this指向
            this.inpect();
        }
    }

   async inpect(params) {
    // console.log(this);
        const err = await this.wronginform(this.input.value);
        if(err){
            this.p.innerText = err;
            return false;
        }else{
            this.p.innerText = '';
            return true;
        }
    }

    static async inpect(...wronginform){
        // console.log(wronginform);
        let data = wronginform.map((m)=>m.inpect())
        var result = await Promise.all(data)
        return result.every((r)=>r)

    }

}









    


