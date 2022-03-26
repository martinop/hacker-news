type Params = {
  isLoading: boolean;
  hasMore: boolean;
  onIntersect: () => void;
  node: HTMLDivElement | null;
  observer: React.MutableRefObject<IntersectionObserver | undefined>;
};

export default function handleIntersectionElement({
  isLoading,
  hasMore,
  observer,
  onIntersect,
  node,
}: Params) {
  if (isLoading) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver((e) => {
    if (e[0].isIntersecting && hasMore) {
      onIntersect();
    }
  });
  if (node) observer.current.observe(node);
}
