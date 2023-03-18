import dotenv from "dotenv";
import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;

// WBTC/ETH pool
const poolAddress = "0xcbcdf9626bc03e24f779434178a73a0b4bad62ed";
const provider = new JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_API_KEY}}`
);

// Create a pool instance
const poolContract = new ethers.Contract(
  poolAddress,
  UniswapV3Pool.abi,
  provider
);
