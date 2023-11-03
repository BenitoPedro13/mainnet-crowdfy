
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
      // accounts: ['UZ5X99QSXB35FEXM9DNPY2H1RDD6SE65MY']
    },
    arbitrumOne: {
      url: 'https://arb1.arbitrum.io/rpc',
      // accounts: [process.env.ARBITRUM_MAINNET_TEMPORARY_PRIVATE_KEY ?? '']
    },
  },
};

export default config;
