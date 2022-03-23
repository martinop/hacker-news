import React from "react";
import Nav from "./nav";

import { render, screen } from "@testing-library/react";

describe("<Nav />", () => {
  it("should render nav", async () => {
    render(<Nav />);
    const title = await screen.findByText(/hacker news/gi);
    expect(title).toBeInTheDocument();
  });
});
