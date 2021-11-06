const TEXT_STYLES = {
    fontFamily: 'Consolas, Courier, Monaco',
    fontSize: '36px'
}
const TITLE_OFFSET_X = 25;
const TITLE_OFFSET_Y = 25;
const TYPING_DELAY = 100;

export class Text {
    constructor(scene) {
        this.scene = scene;
    }

    add(x, y, text) {
        return this.scene.add.text(x, y, text, TEXT_STYLES)
    }

    setTitle(text) {
        return this.add(TITLE_OFFSET_X, TITLE_OFFSET_Y, text)
    }

    type(text, i = 1) {
        const writtenText = this.setTitle(text.slice(0, i));

        if (i < text.length) {
            setTimeout(() => {
                writtenText.destroy();
                this.type(text, i + 1);
            }, TYPING_DELAY)
        }
    }
}