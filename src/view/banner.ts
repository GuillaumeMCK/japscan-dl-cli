function banner(paddingLeft: number = 0, paddingTop: number = 0) {
    const pl = ' '.repeat(paddingLeft)
    const pt = '\n'.repeat(paddingTop)
    // Font : Calvin S.
    const J = [[' ', ' ', '┬', ' '], [' ', ' ', '│', ' '], [' ', '└', '┘', ' ']]
    const A = [['┌', '─', '┐', ' '], ['├', '─', '┤', ' '], ['┴', ' ', '┴', ' ']];
    const P = [['┌', '─', '┐', ' '], ['├', '─', '┘', ' '], ['┴', ' ', ' ', ' ']];
    const S = [['┌', '─', '┐', ' '], ['└', '─', '┐', ' '], ['└', '─', '┘', ' ']];
    const C = [['┌', '─', '┐', ' '], ['│', ' ', ' ', ' '], ['└', '─', '┘', ' ']];
    const N = [['┌', '┐', '┌', ' '], ['│', '│', '│', ' '], ['┘', '└', '┘', ' ']];
    const D = [['┌', '┬', '┐', ' '], [' ', '│', '│', ' '], ['─', '┴', '┘', ' ']];
    const L = [['┬', ' ', ' ', ' '], ['│', ' ', ' ', ' '], ['┴', '─', '┘', ' ']];
    const SPACE = [['', ' ', '', ' '], ['', '─', '', ' '], ['', ' ', '', ' ']];
    const banner = [J, A, P, S, C, A, N, SPACE, D, L];
    const finalBanner = [] as string[];
    let cl = 0 
    let init_color = 114;
    let txt_color = init_color
    // add padding
    process.stdout.write(pt);
    banner[0].forEach((row) => row[0] = pl + row[0]);
    // build banner
    for (let charset = 0; charset < 3; charset++) {
        for (let pos = 0; pos < banner.length; pos++) {
            for (let i = 0; i < banner[pos][charset].length; i++) {
                const clr = `\x1b[38;5;${txt_color}m`;
                const char = clr + banner[pos][charset][i];
                finalBanner.push(char);
                cl++;
                txt_color = cl <= 3 ? txt_color + 30 : txt_color;
            }
            cl = 0;
            txt_color = init_color;
        }
        if (charset < 2) finalBanner.push('\n');
        init_color++;
    }
    process.stdout.write(finalBanner.join('') + '\n');
    console.log(`\x1b[90m${pl}                     by Guillaume.MCK\x1b[0m\n`);
}

export default banner;