import React from "react";
import Nav from "./nav";

import { render, screen } from "@testing-library/react";

describe("<Nav />", () => {
  it("should render nav", () => {
    render(<Nav />);
    const title = screen.getByText(/hacker news/gi);
    expect(title).toBeInTheDocument();
  });
});
