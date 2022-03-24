import Loading from "./loading";

import { render, screen } from "@testing-library/react";

describe("<Loading />", () => {
  it("should render loading", async () => {
    render(<Loading />);
    const text = await screen.findByText(/loading.../gi);
    expect(text).toBeInTheDocument();

    const icon = await screen.findByTestId("loading-icon");
    expect(icon).toBeInTheDocument();
  });
});
