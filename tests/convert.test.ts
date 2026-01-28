import { describe, expect, it } from "vitest";
import {
  getColumnName,
  getColumnNameFromId,
  getIdFromColumnName,
} from "../src/lib/convert";
import { clearSelection } from "../src/lib/utilities";

describe("convert helpers", () => {
  it("maps column indexes to names", () => {
    expect(getColumnName(0)).toBe("A");
    expect(getColumnName(25)).toBe("Z");
    expect(getColumnName(26)).toBe("AA");
  });

  it("maps id arrays to excel cell names", () => {
    expect(getColumnNameFromId([0, 0])).toBe("A1");
    expect(getColumnNameFromId([1, 4])).toBe("B5");
  });

  it("maps excel cell names to ids", () => {
    expect(getIdFromColumnName("B2", true)).toEqual([1, 1]);
  });
});

describe("utilities", () => {
  it("clears a selection range", () => {
    const data = [
      ["a", "b", "c"],
      ["d", "e", "f"],
    ];
    const cleared = clearSelection(data, ["A1", "B2"]);
    expect(cleared[0][0]).toBe("");
    expect(cleared[0][1]).toBe("");
    expect(cleared[1][0]).toBe("");
    expect(cleared[1][1]).toBe("");
    expect(cleared[0][2]).toBe("c");
    expect(cleared[1][2]).toBe("f");
  });
});
