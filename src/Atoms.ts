import { atom } from "jotai";
import { Size } from "./Data";

export const turnAtom = atom(1);
export const boardAtom = atom([...Array(Size * Size).fill(0)]);
export const isPlayingAtom = atom(false);
