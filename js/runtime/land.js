import { Sprite } from "../base/sprite.js";
import { Datastore } from "../base/dataStore.js";

// 底板图

export class Land extends Sprite{
    constructor(){
        const img=Sprite.getImage('land');
        const height =Datastore.getInstance().canvas.height;//canvas的高
        const h=height-img.height;//实际所在的高度
        super(img,0,0,img.width,img.height,0,h,img.width,img.height);
        this.landX=0;//地板实际x坐标
    }
    //重写父类Sprite的draw方法,实现地板的移动
    draw(){
        this.landX-=2;
        //图片出界 ,重置
        const width=Datastore.getInstance().canvas.width;
        if(this.landX<width-this.srcW){
            this.landX=0;
        }
        //重写父类draw
        super.draw(this.img,this.srcX,
            this.srcY,this.srcW,
            this.srcH,this.landX,
            this.y,this.width,this.height);
    }
    
}








