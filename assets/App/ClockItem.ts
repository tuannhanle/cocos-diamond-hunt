import { _decorator, Component } from 'cc';
import { ItemBase } from './ItemBase';
import { GameManager } from './GameManager';

const { ccclass, property } = _decorator;

@ccclass('ClockItem')
export class ClockItem extends ItemBase {

    @property
    timeAmount: number = 30; // Add 30 seconds to the timer

    onCollected() {
        console.log('Clock item collected!');
        // Implement the logic for adding time to the game timer
        const gameManager = this.node.scene.getChildByName('GameManager');
        if (gameManager) {
            const gameManagerScript = gameManager.getComponent(GameManager);
            if (gameManagerScript) {
                console.log('addTime');

                gameManagerScript.addTime(this.timeAmount);

            }
        }
   
    }


}
