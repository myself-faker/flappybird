import { Sprite } from "../base/sprite.js";
import { Datastore } from "../base/dataStore.js";

//小鸟类

export class Birds extends Sprite{
    constructor(){
        const img=Sprite.getImage('birds');
        super(img,0,0,img.width,img.height,0,0,img.width,img.height);
        //设置三只小鸟的尺寸位置
        // 小鸟的宽是34,高是24,上下边距是10,左右边距是9
        this.clippinX=[9,9+34+18,9+34+18+34+18];//裁剪的x坐标
        this.clippinY=[10,10,10];//裁剪的Y坐标
        this.clippingWidth=[34,34,34]//裁剪的宽度
        this.clippingHeight=[24,24,24]//裁剪的高度
        const canvas=Datastore.getInstance().canvas;
        const birdX=canvas.width/4;//小鸟初始X坐标
        this.birdsX=[birdX,birdX,birdX];
        const land=Sprite.getImage('land');
        const birdY=(canvas.height-land.height)/2;//小鸟初始Y坐标
        this.birdsY=[birdY,birdY,birdY];
        this.birdsWidth=[34,34,34];//小鸟的宽度
        this.birdsHeight=[24,24,24];//小鸟的高度
        this.y=[birdY,birdY,birdY];//小鸟的实时y坐标
        this.index=0;// 切换小鸟,实现动态效果
        this.count=0;// 计数器
        this.time=0;//  计时器    ,自由落时间

    }
    draw(){
        // this.index++;
        // if(this.index>2){
        //     this.index=0;
        // }
        this.count+=0.13;
        if(this.index>=2){
            this.count=0;
        }
        this.index=Math.floor(this.count);
        super.draw(this.img,this.clippinX[this.index],
            this.clippinY[this.index],this.clippingWidth[this.index],this.clippingHeight[this.index],
            this.birdsX[this.index],this.birdsY[this.index],
            this.birdsWidth[this.index],this.birdsHeight[this.index]
            );
    }
}