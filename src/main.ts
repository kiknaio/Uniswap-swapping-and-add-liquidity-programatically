import { Token } from "@uniswap/sdk-core";
import { Pool, Tick, TickListDataProvider } from "@uniswap/v3-sdk";
import BigNumber from "bignumber.js";
import { poolContract } from "./Pool";

async function main() {
  const wbtcAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  const token0 = new Token(1, wbtcAddress, 8, "WBTC", "Wrapped Bitcoin");
  const token1 = new Token(1, wethAddress, 18, "WETH", "Wrapped Ether");

  const poolFee = await poolContract.fee();

  const slot0 = await poolContract.slot0();
  const poolPrice = slot0.sqrtPrice;
  const poolLiquidity = await poolContract.liquidity();

  const tickSpacing = await poolContract.tickSpacing();

  console.log("tickSpacing", tickSpacing);

  const nearestTick = Math.floor(
    BigNumber((slot0[1] / tickSpacing) * tickSpacing).toNumber()
  );

  const tickLowerIndex = nearestTick - 60 * 100;
  const tickUpperIndex = nearestTick + 60 * 100;

  const tickLowerData = await poolContract.ticks(tickLowerIndex);

  console.log(tickLowerIndex);

  const tickLower = new Tick({
    index: tickLowerIndex,
    liquidityGross: tickLowerData.liquidityGross,
    liquidityNet: tickLowerData.liquidityNet,
  });

  const tickUpperData = await poolContract.ticks(tickUpperIndex);
  const tickUpper = new Tick({
    index: tickUpperIndex,
    liquidityGross: tickUpperData.liquidityGross,
    liquidityNet: tickUpperData.liquidityNet,
  });

  const tickList = new TickListDataProvider(
    [tickLower, tickUpper],
    tickSpacing
  );

  const pool = new Pool(
    token0,
    token1,
    poolFee,
    poolPrice,
    poolLiquidity,
    slot0[1],
    tickList
  );

  console.log(pool);
}

main();
