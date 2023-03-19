import { Token } from "@uniswap/sdk-core";
import { Pool, Tick, TickListDataProvider } from "@uniswap/v3-sdk";
import BigNumber from "bignumber.js";
import { getPoolImmutables, getPoolState, poolContract } from "./Pool";

async function main() {
  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  const tokenInAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const tokenOutAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const tokenIn = new Token(1, tokenInAddress, 8, "USDC", "USDC");
  const tokenOut = new Token(1, tokenOutAddress, 18, "WETH", "Wrapped Ether");

  const pool = new Pool(
    tokenIn,
    tokenOut,
    Number(immutables.fee),
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    Number(state.tick)
  );

  console.log(
    `1 ${pool.token0.symbol} = ${pool.token0Price.toSignificant()} ${
      pool.token1.symbol
    }`
  );
  console.log(
    `1 ${pool.token1.symbol} = ${pool.token1Price.toSignificant()} ${
      pool.token0.symbol
    }`
  );
}

main();
