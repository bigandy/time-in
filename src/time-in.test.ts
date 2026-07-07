import "./time-in.js";
import { afterEach, describe, it, expect, vi } from "vitest";

describe("TimeIn", () => {
  const consoleMock = vi
    .spyOn(console, "warn")
    .mockImplementation(() => undefined);

  afterEach(() => {
    document.body.innerHTML = "";
    consoleMock.mockReset();
  });

  const createComponent = () => {
    const siblingCount = document.createElement("time-in");

    document.body.appendChild(siblingCount);
    return siblingCount;
  };

  it("should be in the document", () => {
    const component = createComponent();

    expect(component).toBeDefined();
  });
});
