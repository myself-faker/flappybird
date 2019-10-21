import { Sprite } from "../base/sprite.js";
import { Datastore } from "../base/dataStore.js";

// 底板图

export class Land extends Sprite{
    constructor(){
        const img=Sprite.getImage('land');
        const height =Datastore.getInstance().canvas.height;//canvas的高
        const h=height-img.height;//实际所在的高度
        super(img,0,0,img.width,img.height,0,h,img.width,img.height);
    }
}








