import { ResourceLoader } from "./js/base/resourcesLoader.js";
import { Datastore } from "./js/base/dataStore.js";

//程序的主类,用于小程序过程中数据的初始化,以及点击事件的绑定


export class Main{
  constructor(){
    console.log('游戏开始了');
    //初始化画布
    this.canvas=document.getElementById('game');
    this.ctx=this.canvas.getContext('2d'); 
    //初始化资源加载器
    this.loader=new ResourceLoader();
    //初始化变量池
    this.datastore=Datastore.getInstance();
    //加载完成后,执行其他的操作
    this.loader.onloaded(map=>this.onResourceLoaded(map));

  }
  // 资源加载完成后执行其他操作的方法
  onResourceLoaded(map){
    // console.log(1);
    console.log(map);
    let bg=map.get('background');//拿背景图
    this.ctx.drawImage(bg,0,0,bg.width,bg.height,0,0,this.canvas.width,this.canvas.height);
    //保存各种资源
    //不适用set方法保存的原因,set方法保存的数据 是在游戏结束时会被销毁,而下面的数据,即使游戏结束也不会销毁,下一句可以继续使用
    this.datastore.canvas=this.canvas;
    this.datastore.ctx=this.ctx;
    this.datastore.res=map;
    this.init();
  }
  //游戏初始化
  init(){
    
  }
}