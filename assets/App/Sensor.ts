import { _decorator, Node,IPhysics2DContact, Component,BoxCollider2D,Vec2,RigidBody2D, Contact2DType} from 'cc';
import { GemItem } from './GemItem';
const { ccclass, property } = _decorator;


@ccclass('Sensor')
export class Sensor extends Component {



    // onLoad() {

    //     var box2d = this.getComponent(BoxCollider2D);
    //     box2d.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    //     box2d.on(Contact2DType.END_CONTACT, this.onEndContact, this);


    // }




    // onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D){
    //     // console.log("gem");
        
    //     const otherNode = otherCollider.node;
    //     if (otherNode.getComponent(GemItem)) {
    //         // console.log("Enter");
            
    //     }

    // }

    // onEndContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D){
    //     const otherNode = otherCollider.node;
    //     if (otherNode.getComponent(GemItem)) {
    //         // console.log("Leave");

    //     }

    // }

}