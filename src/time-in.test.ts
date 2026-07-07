import "./time-in.js";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";

import { getAllByRole, getByRole } from "@testing-library/dom";

describe("TimeIn", () => {

  // afterEach(() => {
  //   document.body.innerHTML = "";
  // });

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubEnv("TZ", 'UTC');
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("should be able to show the correct time - after updating the computer time...?", () => {
    const component = createComponent();
    vi.useFakeTimers();
    vi.setSystemTime(1234);
    console.log({ component: component.shadowRoot?.querySelector('time')?.textContent });

  });
});
