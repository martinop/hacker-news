import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import { fireEvent, screen, render } from "@testing-library/react";

import useOnClickOutside from "./useOnClickOutside";

describe("useOnClickOutside hook", () => {
  it("should call trigger on click outside", async () => {
    const mockedOnTrigger = jest.fn();
    const ref = React.createRef<HTMLDivElement>();

    render(
      <div>
        <div ref={ref} />
        <div data-testid="test" />
      </div>
    );
    renderHook(() => useOnClickOutside(ref, mockedOnTrigger));
    fireEvent.mouseDown(screen.getByTestId("test"));

    expect(mockedOnTrigger).toBeCalledTimes(1);
  });
  it("should not call trigger on click inside", async () => {
    const mockedOnTrigger = jest.fn();
    const ref = React.createRef<HTMLDivElement>();

    render(<div ref={ref} data-testid="test" />);
    renderHook(() => useOnClickOutside(ref, mockedOnTrigger));
    fireEvent.mouseDown(screen.getByTestId("test"));

    expect(mockedOnTrigger).toBeCalledTimes(0);
  });
});
