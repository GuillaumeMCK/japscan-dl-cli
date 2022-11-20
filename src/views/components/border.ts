import BorderStl from '../models/border_stl';
import Size from '../models/size';
import Padding from '../models/padding';
import {cursorTo} from "../services/terminal";

export const borderProps: { [key: string]: BorderStl } = {
    rounded_border: {
        tl: '╭',
        tr: '╮',
        bl: '╰',
        br: '╯',
        hor: '─',
        ver: '│'
    },
    single_border: {
        tl: '┌',
        tr: '┐',
        bl: '└',
        br: '┘',
        hor: '─',
        ver: '│'
    },
    double_border: {
        tl: '╔',
        tr: '╗',
        bl: '╚',
        br: '╝',
        hor: '═',
        ver: '║'
    },
    none: {
        tl: ' ',
        tr: ' ',
        bl: ' ',
        br: ' ',
        hor: ' ',
        ver: ' '
    }
}


export class Border {
    size: Size;
    padding: Padding;
    border: BorderStl;

    constructor(size: Size, padding: Padding, border?: BorderStl, color?: String) {
        this.size = size;
        this.padding = padding;
        this.border = border ? border : borderProps.single_border;
        this.draw(color);
    }

    private draw(color: String = '') {
        const reset = '\x1b[0m';
        const {height, width} = this.size;
        const {top, left} = this.padding;
        const {tl, tr, bl, br, hor, ver} = this.border;
        cursorTo(top!, left!);
        process.stdout.write(color + tl + hor.repeat(width - 3) + tr + reset);
        for (let i = 1; i < height - 1; i++) {
            cursorTo(top! + i, left!);
            process.stdout.write(color + ver + reset);
            cursorTo(top! + i, left! + width - 1);
            process.stdout.write(color + ver + reset);
        }
        cursorTo(top! + height - 1, left!);
        process.stdout.write(color + bl + hor.repeat(width - 3) + br + reset);


    }
}

