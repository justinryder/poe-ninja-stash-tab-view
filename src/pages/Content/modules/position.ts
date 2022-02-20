import {Position} from "./types";

export const makePosition = (width: number, height: number) => (x: number, y: number): Position => ({
    x,
    y,
    width,
    height,
});
