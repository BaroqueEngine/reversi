import { atom } from "jotai";
import { Size } from "./Data";

export const turnAtom = atom<number>(1);
export const boardAtom = atom<number[]>([...Array(Size * Size).fill(0)]);
export const isPlayingAtom = atom<boolean>(false);
