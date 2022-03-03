const { unmountComponentAtNode } = require("react-dom");

// setup a clean DOM environment before every test, so that the tests don't influence one another

let div = null;
beforeEach(() => {
  div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
});

afterEach(() => {
  div && unmountComponentAtNode(div);
  div && div.remove();
  div = null;
});
