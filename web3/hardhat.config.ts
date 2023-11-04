
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts: ['ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80']
    },
    arbitrumOne: {
      url: 'https://arb1.arbitrum.io/rpc',
      // accounts: [process.env.ARBITRUM_MAINNET_TEMPORARY_PRIVATE_KEY ?? '']
    },
  },
};

export default config;
