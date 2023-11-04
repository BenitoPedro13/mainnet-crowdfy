import { useNetworkMismatch } from "@thirdweb-dev/react";

export const Detector = () => {
  const isMismatched = useNetworkMismatch();

  return (<div><p>OI</p>{isMismatched}</div>);
};