import Size from '../models/size';

export function getSize(): Size {
    // Get console size
    const size = process.stdout.getWindowSize();
    return {
        width: size[0],
        height: size[1]
    }
}

export function getCursorPos(): Promise<Size> {
    return new Promise((resolve, reject) => {
        process.stdout.write('\x1b[6n');
        process.stdin.on('data', (data) => {
            const pos = data.toString().match(/\d+/g);
            resolve({
                width: parseInt(pos![1]),
                height: parseInt(pos![0])
            });
        });
    });
}

export function clearRange(h: number, w: number, height: number, width: number): void {
    for (let i = 0; i < height; i++) {
        cursorTo(h + i, w);
        process.stdout.write(' '.repeat(width));
    }
}

export function clearScreen(): void {
    process.stdout.write('\x1b[2J');
    cursorTo(0, 0);
}

export function cursorTo(h: number, w: number): void {
    process.stdout.write('\x1b[' + h + ';' + w + 'f');
}

export function clearLine(): void {
    process.stdout.write('\x1b[2K');
}

export function clearCursor(): void {
    process.stdout.write('\x1b[?25l');
}

export function showCursor(): void {
    process.stdout.write('\x1b[?25h');
}

export function hideCursor(): void {
    process.stdout.write('\x1b[?25l');
}
