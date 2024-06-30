import { _decorator, Component, tween, Tween, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FadeLoop')
export class FadeLoop extends Component {
    @property(UIOpacity)
    uiOpacity: UIOpacity = null;

    onLoad() {
        // Ensure the UIOpacity component is present
        if (!this.uiOpacity) {
            this.uiOpacity = this.node.addComponent(UIOpacity);
        }

        // Create a tween to fade out and fade in the sprite
        const fadeTween: Tween<UIOpacity> = tween(this.uiOpacity)
            .to(1, { opacity: 0 })  // Fade out over 1 second
            .to(1, { opacity: 255 }) // Fade in over 1 second
            .union() // Union the tweens to ensure they run sequentially
            .repeatForever() // Repeat the sequence indefinitely
            .start(); // Start the tween
    }
}
