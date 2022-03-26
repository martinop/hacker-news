import handleIntersectionElement from "./intersection-observer";

const mockDisconnect = jest.fn();
const mockObserve = jest.fn();

describe("intersection", () => {
  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation(() => ({
      disconnect: mockDisconnect,
      observe: mockObserve,
    }));
  });

  it("should return undefined", async () => {
    const res = handleIntersectionElement({
      observer: { current: undefined },
      isLoading: true,
      hasMore: false,
      onIntersect: jest.fn,
      node: null,
    });
    expect(res).toBeUndefined();
  });

  it("should disconnect current observer", () => {
    handleIntersectionElement({
      observer: { current: new IntersectionObserver(jest.fn) },
      isLoading: false,
      hasMore: false,
      onIntersect: jest.fn,
      node: null,
    });
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should observe node", () => {
    handleIntersectionElement({
      observer: { current: undefined },
      isLoading: false,
      hasMore: false,
      onIntersect: jest.fn,
      node: document.createElement("div"),
    });
    expect(mockObserve).toHaveBeenCalled();
  });
});
