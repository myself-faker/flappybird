import { Datastore } from "./base/dataStore.js";

// 导演类,控制游戏的主流程,逻辑

export class Director{
    constructor(){
        //获取变量池
        this.datastore=Datastore.getInstance();
    }
    //导演只能有一个
    static getInstance(){
        if(!Director.Instance){
            Director.Instance=new Director()
        }
        return Director.Instance;
    }
    //运行 
    run(){ 
        //画背景图 
        this.datastore.get('background').draw(); 
        // console.log(1);
    }
}



