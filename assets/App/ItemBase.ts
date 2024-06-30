import { _decorator, Node, Component, BoxCollider2D,RigidBody2D, Contact2DType, IPhysics2DContact, Collider2D } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('ItemBase')
export abstract class ItemBase extends Component {
    protected collider: BoxCollider2D | null = null;
    protected rigidBody: RigidBody2D | null = null;

    onLoad() {
        // Ensure this item has a collider
        this.rigidBody = this.getComponent(RigidBody2D);
        this.collider = this.getComponent(BoxCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);

    }
    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        const otherNode = otherCollider.node;
        // console.log("other: "+otherNode.name +", self: " + selfCollider.name + ", this: " + this.node.name);

        // Check if the other node is the character (you may need to adjust this based on your game logic)
        if (otherNode.name === 'Character') {
            this.onCollected(otherCollider.node);

         // Hide the node after collision
         this.scheduleOnce(() => {

            // if (this.collider) {
            //     this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            //     this.collider.enabled = false;
            // }
            // if (this.rigidBody) {
            //     this.rigidBody.enabledContactListener = false;
            //     this.rigidBody.enabled = false;
            // }
            // this.node.active = false;
            this.node.emit("destroy", this);
            this.node.active = false;
            }, 0);
        }


    }

    // Method to be overridden by subclasses
    abstract onCollected(character: Node | null): void;
}
