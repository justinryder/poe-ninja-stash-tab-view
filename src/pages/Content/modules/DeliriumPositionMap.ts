import {Position} from "./types";
import {makePosition} from "./position";

const Left = 47;
const Right = 721;
const Top = 34;

const Width = 78;
const Height = 78;

const GapX = 13;
const GapY = 13;

const position = makePosition(Width, Height);

const makeCreateGrid = (deltaX: number, deltaY: number, transformCell = (cell: string) => cell) =>
    (xStart: number, yStart: number) =>
        (rows: string[][]) =>
            Object.fromEntries(
                rows.reduce((result, cells, y) => [
                    ...result,
                    ...cells.map((cell, x) => [
                        transformCell(cell),
                        position(
                            xStart + (deltaX * x),
                            yStart + (deltaY * y),
                        ),
                    ])
                ], [] as any)
            );

const transformName = (name: string) => `${name} Delirium Orb`;

const createLeftGrid = makeCreateGrid(Width + GapX, Height + GapY, transformName);
const createRightGrid = makeCreateGrid((Width + GapX) * -1, Height + GapY, transformName);

export const DeliriumPositionMap: Record<string, Position> = {
    ...createLeftGrid(Left, Top)([
        ['Fine'],
        ['Imperial', 'Skittering'],
        ['Timeless', 'Fossilised', 'Whispering'],
        ['Amorphous', "Diviner's", 'Fragmented'],
        ['Blighted']
    ]),
    ...createRightGrid(Right, Top)([
        [],
        ['Singular', "Cartographer's"],
        ["Thaumaturge's", "Jeweller's", 'Foreboding'],
        ["Blacksmith's", 'Abyssal', 'Obscured'],
        ["Armoursmith's"]
    ]),
};
