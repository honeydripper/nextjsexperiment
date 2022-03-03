import React from "react";
import { render } from "react-dom";
import { Paragraph } from "./paragraph";

describe("Post component", () => {
  it("Renders inner children", () => {
    const root = document.getElementById("root")!;
    render(
      <Paragraph>
        <span>boo</span>
      </Paragraph>,
      root
    );
    const spans = root.getElementsByTagName("span");
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe("boo");
  });
});
