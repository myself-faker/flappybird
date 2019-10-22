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
    //判断小鸟与某一个水管是否碰撞(小鸟的模型)
    isStrike(bird,pipe){
        let strike =true;//假设装上了
        if(bird.right<pipe.left     //小鸟的右边小于水管的左边
            || bird.bottom<pipe.top // 小鸟的下边小于水管的上边
            || bird.left>pipe.right //小鸟的左边大于水管的右边
            || bird.top>pipe.bottom //小鸟的上边大于水管的下边
            ){//没撞死
                strike =false
        }
        return strike;
    }
    //判断小鸟的撞击事件(天、地、水管)
    
    check(){
        const birds=this.datastore.get('birds');
        const land=this.datastore.get('land');
        const pipes=this.datastore.get('pipes');
        const score=this.datastore.get('score');
        //判断与天地相撞
        if(birds.birdsY[0] < 0 || birds.birdsHeight[0]+birds.birdsY[0] > land.y){
            //游戏结束
            this.isGameOver =true;
            return;
        }    
        
        //判断与水管相撞
        //构建小鸟的模型数据
        const birdBorder={
            top:birds.birdsY[0],
            right:birds.birdsX[0]+birds.birdsWidth[0],
            bottom:birds.birdsY[0]+birds.birdsHeight[0],
            left:birds.birdsX[0]
        }
        //循环水管遍历构建每一个水管的模型数据
        for(let i=0;i<pipes.length;i++){
            const pipe=pipes[i];
            const pipeBorder ={
                top:pipe.y,
                right:pipe.x+pipe.width,
                bottom:pipe.y+pipe.height,
                left:pipe.x
            }
            //判断小鸟与某个水管是否撞击
            if(this.isStrike(birdBorder,pipeBorder)){
                //撞了
                this.isGameOver=true;
                return ;
            }
            
        }
        //小鸟 越过水管没有 撞上,加分
        //越过的肯定是第一组水管,只需要判断与第一组水管的位置关系
        
        if(pipes.length>0){
            if(birds.birdsX[0]>pipes[0].x+pipes[0].width&&score.canAdd){
                score.score++;
                //改变加分状态为不可嘉文
                score.canAdd=false
            }
        }
        
    }

    //点击 小鸟向上飞一句距离
    birdsUp(){
        const birds = this.datastore.get('birds');//获取变量池中的小鸟对象
        for(let i=0;i<3;i++){
            birds.y[i] = birds.birdsY[i]-60;
        }
        birds.time = 0;
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
        //检查 游戏是否结束
        this.check();
        if(!this.isGameOver){
            //游戏未结束
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
                this.datastore.get('score').canAdd=true;
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
         //画分数
         this.datastore.get('score').draw();
        //循环运行
        // setInterval(()=>this.run(),300);
        requestAnimationFrame(()=>this.run());
        }
        else{
            //游戏结束停止循环渲染
            cancelAnimationFrame(this.id);
            this.datastore.get('startButton').draw();
            //销毁数据
            this.datastore.destroy();
        }
    }
}



