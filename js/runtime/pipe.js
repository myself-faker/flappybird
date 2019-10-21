import { Sprite } from '../base/sprite.js'
import { Datastore } from '../base/dataStore.js';
//上下水管的父类
//继承sprite

export class Pipe extends Sprite{
    constructor(img,top){
       const w=Datastore.getInstance().canvas.width;
       super(img,0,0,img.width,img.height,w,0,img.width,img.height);
        this.top=top;
    }

    draw(){
        this.x-=2;
        super.draw();
    }
}