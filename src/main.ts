import { Token, CurrencyAmount } from "@uniswap/sdk-core";
import { Pool, Route, Trade } from "@uniswap/v3-sdk";
import { ethers } from "ethers";
import {
  getPoolImmutables,
  getPoolState,
  poolContract,
  signer,
  uniswapRouter,
} from "./Pool";

async function main() {
  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  const tokenInAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const tokenOutAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const tokenIn = new Token(1, tokenInAddress, 6, "USDC", "USDC");
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

  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
  const amountIn = CurrencyAmount.fromRawAmount(tokenIn, 500e6);
  const route = new Route([pool], tokenIn, tokenOut);
  // const trade = await Trade.exactIn(route, amountIn);

  console.log(
    `1 USDC can be swapped fro ${route.midPrice.toSignificant(6)} WETH`
  );
  console.log(
    `1 WETH can be swapped fro ${route.midPrice.invert().toSignificant(6)} USDC`
  );
  return;

  const swapParams = {
    path: Buffer.concat([
      Buffer.from(tokenInAddress),
      Buffer.from(tokenOutAddress),
    ]),
    recipient: signer.address,
    deadline,
    // amountIn: ethers.utils.parseUnits(amountIn.toExact(), 6),
    amountOutMinimum: "",
  };

  // Simulate: Swap 500 USDC for ETH
  // const swapTx = uniswapRouter.exactInput(swapParams, {
  //   value,
  //   gasPrice: 20e9,
  // });
}

main();
