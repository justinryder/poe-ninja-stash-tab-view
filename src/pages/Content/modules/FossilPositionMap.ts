import {Position} from "./types";
import {makePosition} from "./position";

const Row1Y = 62;
const Row2Y = 150;
const Row3Y = 240;
const Row4Y = 328;

const position = makePosition(75, 75);

export const FossilPositionMap: Record<string, Position> = {
    // 1st row
    'Jagged Fossil': position(118, Row1Y),
    'Dense Fossil': position(206, Row1Y),
    'Frigid Fossil': position(296, Row1Y),
    'Aberrant Fossil': position(384, Row1Y),
    'Scorched Fossil': position(473, Row1Y),
    'Metallic Fossil': position(562, Row1Y),
    'Pristine Fossil': position(650, Row1Y),

    // 2nd row
    'Bound Fossil': position(27, Row2Y),
    'Corroded Fossil': position(118, Row2Y),
    'Perfect Fossil': position(206, Row2Y),
    'Prismatic Fossil': position(296, Row2Y),
    'Deft Fossil': position(384, Row2Y),
    'Aetheric Fossil': position(473, Row2Y),
    'Lucent Fossil': position(562, Row2Y),
    'Serrated Fossil': position(650, Row2Y),
    'Shuddering Fossil': position(737, Row2Y),

    // 3rd row
    'Tangled Fossil': position(72, Row3Y),
    'Bloodstained Fossil': position(161, Row3Y),
    'Gilded Fossil': position(296, Row3Y),
    'Fundamental Fossil': position(384, Row3Y),
    'Sanctified Fossil': position(473, Row3Y),
    'Hollow Fossil': position(605, Row3Y),
    'Fractured Fossil': position(693, Row3Y),

    // 4th row
    'Glyphic Fossil': position(118, Row4Y),
    'Faceted Fossil': position(650, Row4Y),
};