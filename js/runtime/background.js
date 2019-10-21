// 背景图,继承图片父类
import {Sprite} from '../base/sprite.js'
import { Datastore } from '../base/dataStore.js';

export class Background extends Sprite{
    constructor(){
        // 获取图片
        const img=Sprite.getImage('background');
        // 获取画布的宽高
        const width=Datastore.getInstance().canvas.width;
        const height=Datastore.getInstance().canvas.height;
        // 重写父类的构造方法,初始化其中的数据
        super(img,0,0,img.width,img.height,0,0,width,height);
        
    }
}








