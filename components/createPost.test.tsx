import React from "react";
import { CreatePost } from "./createPost";
import { fireEvent, waitFor } from "@testing-library/react";
import { render } from "react-dom";

describe("Creating new posts", () => {
  it("Form contains required elements", () => {
    const onCreate = jest.fn();
    const root = document.getElementById("root")!;
    render(<CreatePost onCreate={onCreate} />, root);

    expect(root.querySelectorAll("input").length).toBe(1);
    expect(root.querySelectorAll("textarea").length).toBe(1);
    expect(root.querySelectorAll("button").length).toBe(1);
  });

  it("Submitting form creates correct data and sends it to server", async () => {
    const expected = {
      title: "my title",
      content: "my content",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true, // test only the happy path
        json: () => Promise.resolve([expected]),
      })
    ) as jest.Mock;

    const root = document.getElementById("root")!;
    const onCreate = jest.fn();
    render(<CreatePost onCreate={onCreate} />, root);

    const input = root.querySelector("input");
    const textarea = root.querySelector("textarea");
    const form = root.querySelector("form");

    fireEvent.change(input!, {
      target: { value: expected.title },
    });

    fireEvent.change(textarea!, {
      target: { value: expected.content },
    });

    form!.submit();

    // verify contract with the server (e.g. correct data has been sent in correct format)
    const data = JSON.parse((fetch as jest.Mock).mock.calls[0][1].body);
    expect(data).toMatchObject(expected);

    //verify contract with the outer component
    return waitFor(() => expect(onCreate).toHaveBeenCalledWith([expected]));
  });
});
