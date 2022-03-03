import React from "react";
import { Post } from "./post";
import { render } from "react-dom";

describe("Post component", () => {
  it("Renders title and children correctly", () => {
    const root = document.getElementById("root")!;
    render(
      <Post title="my title">
        <span>boo</span>
      </Post>,
      root
    );

    const titles = root.getElementsByTagName("h1");

    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toBe("my title");

    const spans = root.getElementsByTagName("span");

    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe("boo");
  });
});
