import { Datastore } from "./base/dataStore.js";
import { UpPipe } from "./runtime/uppipe.js";
import { DownPipe } from "./runtime/downpipe.js";

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
    //创建水管
    createPipes(){
        const minTop=this.datastore.canvas.height/8;//最小值
        const maxTop=this.datastore.canvas.height/2;//最大值
        const top=Math.random()*(maxTop-minTop)+minTop;//top 值
        this.datastore.get('pipes').push(new UpPipe(top));
        this.datastore.get('pipes').push(new DownPipe(top))
    }

    //运行 
    run(){ 
        //画背景图 
        this.datastore.get('background').draw(); 
        // console.log(1);
       
        //获取水管数组
        const pipes=this.datastore.get('pipes');
       //调用创建水管的方法
        //创建水管之前的先判断
        //有没有出界的,出界就将其从数组中删除
        if(pipes.length>0){
            if(pipes[0].x<-pipes[0].width&&pipes.length==4){
                pipes.shift();
                pipes.shift();
            }
            //创建水管:前面一组水管有没有越过屏幕中央,如果越过,则开始创建下一组水管
            const  Canvaswidth=this.datastore.canvas.width;
            if(pipes[0].x<Canvaswidth/2-pipes[0].width/2 && pipes.length==2){
                this.createPipes();
            }
        }else{
            this.createPipes();     
        }
        

        //遍历数组,画水管
        pipes.forEach(pipe=>{
            pipe.draw()
        })
        //画小鸟
        this.datastore.get('birds').draw();
         // 画底板图
         this.datastore.get('land').draw();
        //循环运行
        // setInterval(()=>this.run(),300);
        requestAnimationFrame(()=>this.run());
        
    }
}



