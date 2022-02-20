import {Position} from "./types";
import {makePosition} from "./position";

const Width = 82;
const Height = 82;

const GapX = 9;
const GapY = 24;

const position = makePosition(Width, Height);

const makeCreateGrid = (deltaX: number, deltaY: number) =>
    (xStart: number, yStart: number) =>
        (rows: string[][]) =>
            Object.fromEntries(
                rows.reduce((result, cells, y) => [
                    ...result,
                    ...cells.map((cell, x) => [
                        cell,
                        position(
                            xStart + (deltaX * x),
                            yStart + (deltaY * y),
                        ),
                    ])
                ], [] as any)
            );

const createSmallGrid = makeCreateGrid(Width + GapX, Height + GapY);

const Breachlords = [
    'Xoph',
    'Tul',
    'Esh',
    'Uul-Netol',
    'Chayula',
];

export const BreachPositionMap: Record<string, Position> = {
    ...createSmallGrid(198, 63)([
        // blessings are on currency page
        Breachlords.map(breachlord => `Blessing of ${breachlord}`),
        Breachlords.map(breachlord => `Splinter of ${breachlord}`),
        Breachlords.map(breachlord => `${breachlord}'s Breachstone`),
        Breachlords.map(breachlord => `${breachlord}'s Charged Breachstone`),
        Breachlords.map(breachlord => `${breachlord}'s Enriched Breachstone`),
        Breachlords.map(breachlord => `${breachlord}'s Pure Breachstone`),
        Breachlords.map(breachlord => `${breachlord}'s Flawless Breachstone`),
    ]),
};
