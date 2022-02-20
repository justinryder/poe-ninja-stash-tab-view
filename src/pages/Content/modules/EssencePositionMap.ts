import {Position} from "./types";
import {makePosition} from "./position";

const Top = 28;
const Left = 34;
const Right = 745;

const Width = 66;
const Height = 66;

const position = makePosition(Width, Height);

const tiers = [
    'Deafening',
    'Shrieking',
    'Screaming',
    'Wailing',
    'Weeping',
    'Muttering',
    'Whispering',
];

const leftTypes = [
    'Greed',
    'Contempt',
    'Hatred',
    'Woe',
    'Fear',
    'Anger',
    'Torment',
    'Sorrow',
    'Rage',
    'Suffering',
    'Wrath',
    'Doubt',
];

const rightTypes = [
    'Loathing',
    'Zeal',
    'Anguish',
    'Spite',
    'Scorn',
    'Envy',
    'Misery',
    'Dread',
];

const generateEssencePositions = (name: string, x: number, y: number, xDir = 1) =>
    Object.fromEntries(tiers.map((tier, index) => [
        `${tier} Essence of ${name}`,
        position(x + (index * Width * xDir), y),
    ]));

const BottomOfRightTypes = Top + ((rightTypes.length - 1) * Height);

export const EssencePositionMap: Record<string, Position> = {
    // Left side
    ...leftTypes.reduce(
        (result, type, index) => ({
            ...result,
            ...generateEssencePositions(type, Left, Top + (index * Height)),
        }),
        {}
    ),
    // Right side
    ...rightTypes.reduce(
        (result, type, index) => ({
            ...result,
            ...generateEssencePositions(type, Right, Top + (index * Height), -1),
        }),
        {}
    ),
    'Remnant of Corruption': position(Right - Width, BottomOfRightTypes + Height),
    'Essence of Insanity': position(Right, BottomOfRightTypes + Height),
    'Essence of Horror': position(Right, BottomOfRightTypes + (Height * 2)),
    'Essence of Delirium': position(Right, BottomOfRightTypes + (Height * 3)),
    'Essence of Hysteria': position(Right, BottomOfRightTypes + (Height * 4)),
};
