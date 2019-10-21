import {Pipe} from "./Pipe.js";
import { Sprite } from "../base/sprite.js";
export class UpPipe extends Pipe{
    constructor(top){
        //获取上水管的图片
        const img=Sprite.getImage('pieUp');
        super(img,top);
    }
    draw(){
        this.y=this.top-this.height;
        super.draw();
    }
}