import {Position} from "./types";
import {makePosition} from "./position";

const Left = 104;
const Row1Y = 60;
const Row2Y = 150;
const Row3Y = 240;
const Row4Y = 620;

const Width = 78;
const Height = 78;

const Gap0 = 9;
const Gap1 = 34;
const Gap2 = 70;

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

const createSmallGrid = makeCreateGrid(Width + Gap0, Height + Gap0);

const createMediumGrid = makeCreateGrid(Width + Gap1, Height + Gap1);

const LegionFactions = [
    'Eternal',
    'Karui',
    'Vaal',
    'Templar',
    'Maraketh',
];

export const FragmentPositionMap: Record<string, Position> = {
    ...createSmallGrid(Left, Row1Y)([
        ['Sacrifice at Dusk', 'Sacrifice at Midnight'],
        ['Sacrifice at Noon', 'Sacrifice at Dawn'],
    ]),
    ...createSmallGrid(Left + (Width * 2) + Gap0 + Gap2, Row1Y)([
        ["Veritania's Crest", "Al-Hezmin's Crest"],
        ["Drox's Crest", "Baran's Crest"],
    ]),
    ...createSmallGrid(Left + (Width * 4) + ((Gap0 + Gap2) * 2), Row1Y)([
        ['Mortal Grief', 'Mortal Rage'],
        ['Mortal Ignorance', 'Mortal Hope'],
    ]),
    ...createSmallGrid(208, 245)([
        LegionFactions.map((faction, index) => index === 0 ? 'Eternal Empire' : faction).map(faction => `Timeless ${faction} Splinter`),
        LegionFactions.map(faction => `Timeless ${faction} Emblem`),
        LegionFactions.map(faction => `Unrelenting Timeless ${faction} Emblem`),
    ]),
    ...createSmallGrid(Left, 286)([
        // Not on /fragments page
        ['Ritual Splinter'],
        ['Blood Vessel'],
    ]),
    ...createSmallGrid(Left + (Width * 5) + ((Gap0 + Gap2) * 2) + Gap0, 286)([
        ['Crescent Splinter'],
        ["The Maven's Writ"],
    ]),
    ...createMediumGrid(Left, 519)([
        ['Divine Vessel', 'Offering to the Goddess', 'Gift to the Goddess', 'Dedication to the Goddess', 'Tribute to the Goddess', '?'],
    ]),
    ...createSmallGrid(Left, Row4Y)([
        ['Fragment of Purification', 'Fragment of Enslavement'],
        ['Fragment of Constriction', 'Fragment of Eradication'],
    ]),
    ...createSmallGrid(Left + (Width * 2) + Gap0 + Gap2, Row4Y)([
        ['Fragment of the Hydra', 'Fragment of the Phoenix'],
        ['Fragment of the Chimera', 'Fragment of the Minotaur'],
    ]),
    ...createSmallGrid(Left + (Width * 4) + ((Gap0 + Gap2) * 2), Row4Y)([
        ['Fragment of Knowledge', 'Fragment of Terror'],
        ['Fragment of Shape', 'Fragment of Emptiness'],
    ]),
};
