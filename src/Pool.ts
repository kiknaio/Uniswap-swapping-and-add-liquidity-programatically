import dotenv from "dotenv";
import { ethers } from "ethers";
import { JsonRpcProvider } from "ethers";
import UniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
const UniswapV3Router = require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json");

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY;

/**
 * @dev The Uniswap V3 deployed contract addresses:
 * https://github.com/Uniswap/v3-periphery/blob/main/deploys.md
 */

// WBTC/ETH pool
const poolAddress = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
const provider = new JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
);

// Create a signer
export const signer = ethers.Wallet.createRandom();
export const account = signer.connect(provider);

// Create a pool instance
export const poolContract = new ethers.Contract(
  poolAddress,
  UniswapV3Pool.abi,
  provider
);

// Create a router instance
const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const routerContract = new ethers.Contract(
  routerAddress,
  UniswapV3Router.abi,
  provider
);

// Connect the router to the account
export const uniswapRouter = routerContract.connect(account);

// Get the pool immutables
export const getPoolImmutables = async function () {
  const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
    await Promise.all([
      poolContract.factory(),
      poolContract.token0(),
      poolContract.token1(),
      poolContract.fee(),
      poolContract.tickSpacing(),
      poolContract.maxLiquidityPerTick(),
    ]);

  return {
    factory: factory,
    token0: token0,
    token1: token1,
    fee: fee,
    tickSpacing: tickSpacing,
    maxLiquidityPerTick: maxLiquidityPerTick,
  };
};

// Get the pool state
export const getPoolState = async function () {
  const [liquidity, slot] = await Promise.all([
    poolContract.liquidity(),
    poolContract.slot0(),
  ]);

  return {
    liquidity: liquidity,
    sqrtPriceX96: slot[0],
    tick: slot[1],
    observationIndex: slot[2],
    observationCardinality: slot[3],
    observationCardinalityNext: slot[4],
    feeProtocol: slot[5],
    unlocked: slot[6],
  };
};
