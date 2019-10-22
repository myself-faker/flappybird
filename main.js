import { ResourceLoader } from "./js/base/resourcesLoader.js";
import { Datastore } from "./js/base/dataStore.js";
import { Background } from "./js/runtime/background.js";
import { Land } from "./js/runtime/land.js";
import { Director } from "./js/director.js";
import { UpPipe } from "./js/runtime/uppipe.js";
import { Birds } from "./js/player/birds.js";
import { StartButton } from "./js/player/startButton.js";
import { Score } from "./js/player/score.js";

//程序的主类,用于小程序过程中数据的初始化,以及点击事件的绑定

export class Main{
  constructor(){
    console.log('游戏开始了');
    //初始化画布
    ///1111111111111111
    this.canvas=document.getElementById('game');
    // this.canvas=wx.createCanvas();
    this.ctx=this.canvas.getContext('2d'); 
    //初始化资源加载器
    this.loader=new ResourceLoader();
    //初始化变量池
    this.datastore=Datastore.getInstance();
    //初始化一个导演
    this.director=Director.getInstance();
    //加载完成后,执行其他的操作
    this.loader.onloaded(map=>this.onResourceLoaded(map));

  }
  // 资源加载完成后执行其他操作的方法
  onResourceLoaded(map){
    // console.log(1);
    console.log(map);
    // let bg=map.get('background');//拿背景图
    // this.ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this.canvas.width,this.canvas.height);
    //保存各种资源
    //不适用set方法保存的原因,set方法保存的数据 是在游戏结束时会被销毁,而下面的数据,即使游戏结束也不会销毁,下一句可以继续使用
    this.datastore.canvas=this.canvas;
    this.datastore.ctx=this.ctx;
    this.datastore.res=map;
    this.init();
  }
  //游戏初始化 初始化游戏中的数据,将其保存在变量池中
  init(){
    //奖游戏结束改为false
    this.director.isGameOver=false;
    //模拟画背景图
    // new Background().draw();
    // new Land().draw()
    this.datastore.set('background',new Background()).set('land',new Land())
                  .set('pipes',[])
                  .set('birds',new Birds())
                  .set('startButton',new StartButton())
                  .set('score',new Score());
    //调用单击事件方法
    this.gameEvent();

    //开始运行
    this.director.run();
  }
    //绑定单击事件
    gameEvent(){
      
      this.canvas.addEventListener('touchstart',e=>{
        // console.log(1);
        if(this.director.isGameOver){
          //游戏结束,点击重新开始,
          this.init();
        }else{
          //游戏未结束  
          //点击触发 小鸟向上飞一段的距离 
          this.director.birdsUp();
          // console.log(1);
        }
      })
    }




}