import { render } from "react-dom";
import Home from "./index";
import React from "react";
import { getAllByText } from "@testing-library/dom";
import { waitFor } from "@testing-library/react";

describe("Creating new posts", () => {
  it("Contains a form and a list of items", async () => {
    const root = document.getElementById("root")!;

    const posts = [
      {
        title: "post1",
        content: "content1",
      },
      {
        title: "post2",
        content: "content2",
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true, // test only the happy path
        json: () => Promise.resolve(posts),
      })
    ) as jest.Mock;

    render(<Home />, root);

    // wait for the page to populate with mock data then assert all data is present
    await waitFor(() => expect(getAllByText(root, "post1").length).toBe(1));
    expect(getAllByText(root, "post2").length).toBe(1);
    expect(getAllByText(root, "content1").length).toBe(1);
    expect(root.querySelectorAll("form").length).toBe(1);
  });
});
