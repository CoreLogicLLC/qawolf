import {
  deserializeStrokes,
  serializeStrokes,
  stringToStrokes
} from "../../src/keyboard/serializeStrokes";

describe("deserializeStrokes", () => {
  it("converts a string to strokes", () => {
    const strokes = deserializeStrokes("↓Shift↓KeyY↑KeyY");
    expect(strokes.map(s => `${s.type}${s.value}`)).toEqual([
      "↓Shift",
      "↓KeyY",
      "↑KeyY"
    ]);
  });
});

describe("serializeStrokes", () => {
  it("serializes to a plain string if possible", () => {
    expect(serializeStrokes(stringToStrokes("嗨! 嗨!"))).toEqual("嗨! 嗨!");
  });

  it("serializes special keys to prefixed value", () => {
    expect(serializeStrokes(deserializeStrokes("↓Enter↑Enter"))).toEqual(
      "↓Enter↑Enter"
    );

    expect(serializeStrokes(deserializeStrokes("↓Tab↑Tab"))).toEqual(
      "↓Tab↑Tab"
    );
  });
});

describe("stringToStrokes", () => {
  it("handles lower case characters", () => {
    const strokes = stringToStrokes("hey");
    expect(strokes.map(s => `${s.type}${s.value}`)).toEqual([
      "↓KeyH",
      "↑KeyH",
      "↓KeyE",
      "↑KeyE",
      "↓KeyY",
      "↑KeyY"
    ]);
  });

  it("handles shift characters", () => {
    const strokes = stringToStrokes("YO!");
    expect(strokes.map(s => `${s.type}${s.value}`)).toEqual([
      "↓Shift",
      "↓KeyY",
      "↑KeyY",
      "↑Shift",
      "↓Shift",
      "↓KeyO",
      "↑KeyO",
      "↑Shift",
      "↓Shift",
      "↓Digit1",
      "↑Digit1",
      "↑Shift"
    ]);
  });

  it("handles special characters", () => {
    const strokes = stringToStrokes("嗨! 嗨!");
    expect(strokes.map(s => `${s.type}${s.value}`)).toEqual([
      "→嗨",
      "↓Shift",
      "↓Digit1",
      "↑Digit1",
      "↑Shift",
      "↓Space",
      "↑Space",
      "→嗨",
      "↓Shift",
      "↓Digit1",
      "↑Digit1",
      "↑Shift"
    ]);
  });
});