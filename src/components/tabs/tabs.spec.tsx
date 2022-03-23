import React from "react";
import { render, screen } from "@testing-library/react";
import Tabs from "./tabs";

describe("<Tabs />", () => {
  it("should render tabs", () => {
    render(<Tabs active={0} onChange={jest.fn} />);
    const element = screen.getByTestId("tabs");
    expect(element).toBeInTheDocument();
  });
});
