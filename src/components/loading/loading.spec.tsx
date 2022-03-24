import Loading from "./loading";

import { render, screen } from "@testing-library/react";

describe("<Loading />", () => {
  it("should render loading", () => {
    render(<Loading />);
    const text = screen.getByText(/loading.../i);
    expect(text).toBeInTheDocument();

    const icon = screen.getByTestId("loading-icon");
    expect(icon).toBeInTheDocument();
  });
});
