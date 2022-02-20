import {Position} from "./types";
import {makePosition} from "./position";

const Top = 72;
const Left = 56;
const Right = 435;

const GapX = 9;
const GapY = 7;

const Width = 81;
const Height = 81;

const position = makePosition(Width, Height);

const tiers = [
    'Rusted',
    'Polished',
    'Gilded',
    'Winged',
];

const leftTypes = [
    'Bestiary',
    'Reliquary',
    'Torment',
    'Sulphite',
    'Metamorph',
    'Legion',
    'Ambush',
    'Blight',
];

const rightTypes = [
    'Shaper',
    'Expedition',
    'Cartography',
    'Harbinger',
    'Elder',
    'Divination',
    'Breach',
    'Abyss',
];

const generateEssencePositions = (name: string, x: number, y: number) =>
    Object.fromEntries(tiers.map((tier, index) => [
        `${tier} ${name} Scarab`,
        position(x + (index * (Width + GapX)), y),
    ]));

export const ScarabPositionMap: Record<string, Position> = {
    // Left side
    ...leftTypes.reduce(
        (result, type, index) => ({
            ...result,
            ...generateEssencePositions(type, Left, Top + (index * (Height + GapY))),
        }),
        {}
    ),
    // Right side
    ...rightTypes.reduce(
        (result, type, index) => ({
            ...result,
            ...generateEssencePositions(type, Right, Top + (index * (Height + GapY))),
        }),
        {}
    ),
};
