import {Border, borderProps} from './border';
import Colors from "../utils/colors";
import {cursorTo, hideCursor} from '../services/terminal';
import {CursorPosition} from "../models/cursor_position";


export default class Menu {

    private selectedIdx: number = 0;
    private readonly choiceRange: number;
    private isRunning: boolean = true;

    constructor(
        private readonly choices: string[],
        private readonly messages: string[],
        private position: CursorPosition,
        private readonly choiceFunction: Function[]
    ) {
        this.choiceRange = choices.length - 1;
        this.drawMessages({x: 2, y: this.position.y + 1}, 50);
        this.drawMenu()
        this.start();
        return this;
    }

    private drawMenu() {
        const height = this.choices.length % 2 === 0 ? this.choices.length + 2 : this.choices.length + 3;
        const minWidth = Math.max(...this.choices.map((choice) => choice.length));
        const width = minWidth > 50 ? (minWidth - 50) + 50 : 50;
        // Menu border
        new Border(
            {height, width},
            {top: this.position.y + 3, left: 0},
            borderProps.rounded_border,
            Colors.violet);
        this.choices.forEach((choice, index) => {
            cursorTo(this.position.y + 4 + index, 3);
            process.stdout.write(`${Colors.gray}- ${Colors.reset + choice}`);
        });
        this.drawSelected(this.selectedIdx);
        hideCursor();
    }

    private async userInput() {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', (key: string) => {
            if (key === '\u0003' || key === 'q') {
                console.log('Exiting...');
                process.exit();
            } else if (key === '\u001B\u005B\u0041') {
                this.drawSelected(this.selectedIdx === 0 ? this.choiceRange : this.selectedIdx - 1);
            } else if (key === '\u001B\u005B\u0042') {
                this.drawSelected(this.selectedIdx === this.choiceRange ? 0 : this.selectedIdx + 1);
            } else if (key === '\u000D') {
                try {
                    this.choiceFunction[this.selectedIdx]();
                } catch (e) {
                    console.log(e);
                }
                this.stop();
            }
        });
    }

    private stop() {
        this.isRunning = false;
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeAllListeners('data');
    }

    private drawSelected(newIdx: number) {
        cursorTo(this.position.y + 4 + this.selectedIdx, 3);
        process.stdout.write('- ' + this.choices[this.selectedIdx] + Colors.reset);
        cursorTo(this.position.y + 4 + newIdx, 3);
        process.stdout.write(Colors.pink + '> ' + Colors.white + this.choices[newIdx] + Colors.reset);
        this.selectedIdx = newIdx;
    }

    private async drawMessages(position: CursorPosition, width: number) {
        new Border(
            {height: 3, width},
            {top: this.position.y, left: 0},
            borderProps.rounded_border,
            Colors.violet);
        while (this.isRunning) {
            for (let message of this.messages) {
                message = ' '.repeat(width - 4) + message;
                for (let i = 0; i < message.length; i++) {
                    cursorTo(position.y, position.x);
                    process.stdout.write(message.slice(i, i + width - 4) + " ");
                    if (!this.isRunning) break;
                    await this.delay(100);
                }
            }
        }
    }

    private start() {
        this.userInput();
    }

    private async delay(number: number) {
        return new Promise(resolve => setTimeout(resolve, number));
    }
}

