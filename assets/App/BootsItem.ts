import { _decorator, Component, Node } from 'cc';
import { ItemBase } from './ItemBase';
import { Movement } from './Movement';

const { ccclass, property } = _decorator;

@ccclass('BootsItem')
export class BootsItem extends ItemBase {

    onCollected(character: Node) {
        character?.getComponent(Movement)?.bootsUp();
    }
}

