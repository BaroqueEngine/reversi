import { expect, it } from "vitest";
import { oppColor } from "../Rule";

it("Rule", () => {
  expect(oppColor("white")).toBe("black");
  expect(oppColor("black")).toBe("white");
});
