import { Datastore } from "../base/dataStore.js";

//得分,计分器
//分数不需要画图,所以不用继承 Sprite
export class Score {
    constructor(){
        this.score=0;//得分
        this.ctx=Datastore.getInstance().ctx;
        this.canvas=Datastore.getInstance().canvas;
       this.canAdd=true
    }
    draw(){
        // console.log(1);
        this.ctx.font='25px 黑体';
        this.ctx.fillStyle='#777';
        this.ctx.fillText(this.score,this.canvas.width/2,30);
    }
}