import { _decorator, Component, Label, Node, director, tween } from 'cc';
import { UIEnding } from './UIEnding'; // Import the Movement class
import { GemItem } from './GemItem'; // Import the Movement class
import { SoundManage } from './SoundManage';
import { Spawner } from './Spawner';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private cacheGem: GemItem  = null;
    


    @property(Node)
    movement: Node;

    @property(UIEnding)
    uiEnding: UIEnding = null; 

    @property(Label)
    scoreLabel: Label = null; // Reference to the score UI label

    @property(Label)
    timerLabel: Label = null; // Reference to the timer UI label

    @property(Node)
    character: Node = null; // Reference to the character Node

    @property(Node)
    gems: Node[] = []; // Array to hold gem Nodes

    @property(Node)
    clocks: Node[] = []; // Array to hold clock Nodes

    @property(Spawner)
    spawners: Spawner[] = []; 

    public score: number = 0;
    public timeRemaining: number = 120; // Total time for the game in seconds
    public isGameOver: boolean = false;

    onLoad() {
        this.restartGame();
    }

    startGame() {
        this.schedule(this.updateTimer, 1); // Schedule the timer to update every second
        this.isGameOver = false;
    }

    updateTimer() {
        if (this.isGameOver) {
            return;
        }

        this.timeRemaining--;
        this.timerLabel.string = `${this.secondsToMMSS(this.timeRemaining)}`;

        if (this.timeRemaining <= 0) {
            this.endGame();
        }
    }

    collideGem(gem : GemItem) {
        this.cacheGem = gem;
    }

    uncollideGame(gem: GemItem){
        this.cacheGem = null;
    }

    earnGem(){
        if(this.cacheGem != null){
            SoundManage.instance.playAudioDiamond();

            this.addScore(5);
            this.cacheGem.node.emit('destroy', this.cacheGem.node);
            this.cacheGem.node.destroy();
            this.cacheGem = null;
        }
    }

    //#region Earning
    addScore(points: number): void {
        if(this.isGameOver)
            return;
        this.score += points;
        this.scoreLabel.string = `${this.score}`;``
    }

    addTime(seconds: number): void {
        if(this.isGameOver)
            return;
        SoundManage.instance.playAudioDiamond();
        this.timeRemaining += seconds;
        this.timerLabel.string = `${this.secondsToMMSS(this.timeRemaining)}`;
    }

    //#endregion

    endGame() {
        SoundManage.instance.playGameOver();
        SoundManage.instance.stopSoundBackgroundGame();

        this.movement.emit('endGame')
        this.isGameOver = true;
        this.unschedule(this.updateTimer); // Stop the timer
        this.showGameOverScreen();
    }

    showGameOverScreen() {
        this.uiEnding.show(this.score);
        // Display game over UI and restart button
        // You can implement the UI as needed
    }

    restartGame() {
        this.resetGame();
        this.startGame();
    }

    resetGame() {
        this.spawners.forEach(spawner => {
            spawner.initialSpawn();
        });
        this.score = 0;
        this.timeRemaining = 30;
        this.scoreLabel.string = `${this.score}`;
        this.timerLabel.string = `${this.secondsToMMSS(this.timeRemaining)}`;
        this.isGameOver = false;
        
        // Reset character position and other necessary game state
        this.character.setPosition(0, 0, 0);
    }

    secondsToMMSS(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // waitForNextFrame() {
    //     return new Promise<void>((resolve) => {
    //         tween(this.node)
    //             .call(() => resolve())
    //             .start();
    //     });
    // }
    
}
