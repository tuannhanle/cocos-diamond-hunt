import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target: Node = null; // The target node (character) to follow

    @property
    followSpeed: number = 5; // The speed at which the camera follows the target

    private offset: Vec3 = new Vec3();

    onLoad() {
        if (this.target) {
            // Calculate initial offset between camera and target
            this.offset = this.node.position.clone().subtract(this.target.position.clone());
        }
    }

    update(deltaTime: number) {
        if (this.target) {
            // Calculate the desired position based on the target's position and the initial offset
            const desiredPosition = this.target.position.clone().add(this.offset);
            
            // Smoothly move the camera towards the desired position
            const smoothedPosition = this.node.position.clone().lerp(desiredPosition, deltaTime * this.followSpeed);

            // Update the camera's position
            this.node.setPosition(smoothedPosition);
        }
    }
}
