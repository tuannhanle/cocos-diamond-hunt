import { _decorator, Component, Node ,Contact2DType,BoxCollider2D,IPhysics2DContact} from 'cc';
import { ItemBase } from './ItemBase';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('GemItem')
export class GemItem extends ItemBase {
    @property
    scoreAmount: number = 5; 

    onLoad(): void {
        this.collider = this.getComponent(BoxCollider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        const otherNode = otherCollider.node;
        // console.log("other: "+otherNode.name +", self: " + selfCollider.name + ", this: " + this.node.name);

        // Check if the other node is the character (you may need to adjust this based on your game logic)
        if (otherNode.name === 'Character') {
            this.onCollected(otherCollider.node);

        }
    }

    onEndContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        const otherNode = otherCollider.node;
        if (otherNode.name === 'Character') {
            const gameManager = this.node.scene.getChildByName('GameManager');
            if (gameManager) {
                const gameManagerScript = gameManager.getComponent(GameManager);
                if (gameManagerScript) {
                    gameManagerScript.uncollideGame(this);
                }
            }
        }
    }

    onCollected(character: Node) {
        // Implement the logic for adding time to the game timer
        const gameManager = this.node.scene.getChildByName('GameManager');
        if (gameManager) {
            const gameManagerScript = gameManager.getComponent(GameManager);
            if (gameManagerScript) {
                gameManagerScript.collideGem(this);
            }
        }
    }
}

