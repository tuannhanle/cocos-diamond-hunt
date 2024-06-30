import { _decorator, Component, Node, Prefab, instantiate, Vec3, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Spawner')
export class Spawner extends Component {

    @property({ type: [Node] })
    spawnPoints: Node[] = [];

    @property({ type: Prefab })
    itemPrefab: Prefab = null;

    @property({ type: Node })
    itemsContainer: Node = null;

    private activeItems: Node[] = [];

    protected onLoad(): void {

    }

    initialSpawn() {
        this.activeItems.forEach(e => {
            e.destroy();
        });
        this.activeItems = [];
        // Manually place items initially at each spawn point
        for (let i = 0; i < this.spawnPoints.length-5; i++) {
            const newItem = instantiate(this.itemPrefab);
            newItem.name = newItem.name + i;
            newItem.setPosition(this.spawnPoints[i].getPosition());
            newItem.parent = this.itemsContainer;
            this.activeItems.push(newItem);
            // Listen to the item's destroy event
            newItem.on('destroy', this.onItemDestroyed, this);
        }
    }

    onItemDestroyed(item: Node) {
        console.log("onItemDestroyed: " + item.name);
        // Remove the destroyed item from the active items array
        this.activeItems = this.activeItems.filter(activeItem => {
            return activeItem.uuid !== item.uuid
        });
        // Spawn a new item at a random available spawn point
        this.spawnNewItem(item);
    }

    spawnNewItem(itemRef: Node) {
        if (this.activeItems.length >= this.spawnPoints.length) {
            console.log(this.activeItems.length);
            console.log(this.spawnPoints.length);

            return; // All spawn points are occupied
        }

        const availablePoints = this.spawnPoints.filter(point => 
            !this.activeItems.some(item => item.position.equals(point.position) && 
            point.position !== itemRef.position
            )
        );

        if (availablePoints.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePoints.length);
            const newItem = instantiate(this.itemPrefab);
            newItem.name = newItem.name+randomIndex;
            newItem.setPosition(availablePoints[randomIndex].getPosition());
            newItem.parent = this.itemsContainer;
            this.activeItems.push(newItem);
            // Listen to the item's destroy event
            newItem.on('destroy', this.onItemDestroyed, this);
        }
    }
}
