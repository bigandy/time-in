import "./time-in.js";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";

import { getAllByRole, getByRole } from "@testing-library/dom";

describe("TimeIn", () => {
  const consoleMock = vi
    .spyOn(console, "warn")
    .mockImplementation(() => undefined);

  afterEach(() => {
    document.body.innerHTML = "";
    consoleMock.mockReset();
  });

  beforeEach(() => {
    vi.useFakeTimers();
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

  it("should match the snapshot", () => {
    const component = createComponent();
    expect(component).toMatchSnapshot();
  });

  it("should show the correct time", () => {
    const component = createComponent();

    const time = document.querySelector('time');

    console.log({ time })

    expect(component).toBeDefined();
  });

  // it("for each of the children: should have a --sibling-count matching the number of siblings that the element has", () => {
  //   const siblingCount = createSiblingCount();

  //   const list = siblingCount.querySelector("ul")!;
  //   const listItems = list.querySelectorAll("li");

  //   for (const listItem of listItems) {
  //     const siblingIndexValue =
  //       getComputedStyle(listItem).getPropertyValue("--sibling-count");

  //     expect(Number(siblingIndexValue)).toBe(listItems.length);
  //   }
  // });

  // it("should match the snapshot", () => {
  //   const siblingCount = createSiblingCount();
  //   expect(siblingCount).toMatchSnapshot();
  // });

  // it("should not return a count if there are no children elements", () => {
  //   const siblingCount = createSiblingCount(`<p>This is cool?</p>`);

  //   const para = siblingCount.querySelector("p")!;
  //   const siblingCountValue =
  //     getComputedStyle(para).getPropertyValue("--sibling-count");
  //   expect(siblingCountValue).not.toBe("0");
  //   expect(siblingCountValue).toBe("");
  // });

  // it("should console.warn if there are no children elements", () => {
  //   createSiblingCount(`<p>This is cool?</p>`);

  //   expect(consoleMock).toHaveBeenCalledOnce();
  //   expect(consoleMock).toHaveBeenLastCalledWith(
  //     "Sibling Count - No children found. Use one parent element and this component will show how many children elements are present.",
  //   );
  // });

  // it("should handle the situation where there are more than one top-level children of <sibling-count>", () => {
  //   const siblingCount = createSiblingCount(
  //     `
  //     <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
  //     <ul><li></li><li></li><li></li><li></li><li></li><li></li></ul>
  //     `,
  //   );

  //   const lists = getAllByRole(siblingCount, "list");

  //   for (const list of lists) {
  //     checkList(list);
  //   }

  //   expect(siblingCount).toMatchSnapshot();
  // });

  // it("should update the styles when the slot changes if keep-track-of-updates attribute set", async () => {
  //   const el = document.createElement("sibling-count");
  //   el.setAttribute("keep-track-of-updates", "true");

  //   el.innerHTML = `<ul>
  //               <li></li>
  //               <li></li>
  //               <li></li>
  //             </ul>
  //   `;

  //   document.body.appendChild(el);

  //   // check the initial list
  //   const list = getByRole(el, "list");
  //   checkList(list);

  //   // Add another three list items
  //   list.innerHTML += `
  //     <li></li>
  //     <li></li>
  //     <li></li>
  //   `;

  //   // This is to wait for the mutation observer to run
  //   await new Promise(process.nextTick);

  //   // Check the updated list
  //   const updatedList = getByRole(el, "list");
  //   checkList(updatedList);
  // });
});
