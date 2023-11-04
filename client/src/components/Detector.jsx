import { useEffect } from "react";
import {
    ChainId,
    useNetworkMismatch,
    useNetwork,
    useChainId,
    ConnectWallet,
    useAddress
  } from "@thirdweb-dev/react";
  
export const AutoConnect = () => {
    const address = useAddress(); // Get connected wallet address
    const [, switchNetwork] = useNetwork(); // Switch to desired chain
    const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  
    useEffect(() => {
      // Check if the user is connected to the wrong network
      if (isMismatched) {
        // Prompt their wallet to switch networks
        switchNetwork(ChainId.ArbitrumGoerli); // the chain you want here
      }
    }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)
  
    return <ConnectWallet/>
  };


//   <CustomButton 
// btnType="button"
// title={address ? 'Create a campaign' : 'Connect'}
// styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
// handleClick={() => {
//   if(address) navigate('create-campaign')
//   else connect()
// }}
// />