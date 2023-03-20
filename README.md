# Uniswap-swapping-and-add-liquidity-programatically
Swap &amp; Add liquidity on 🦄 Uniswap programatically

## How swaps work on Uniswap
<img width="1264" alt="Screenshot 2023-03-20 at 12 37 14" src="https://user-images.githubusercontent.com/10699135/226287267-d50c5473-370a-4e75-a1c8-32110fc4886d.png">


## Vocabulary

### A Quoter contract
A Quoter contract in Uniswap V3 is a smart contract that provides price quotes for token trades on the Uniswap decentralized exchange. When a user wants to trade tokens on Uniswap V3, the Quoter contract calculates the expected price of the trade based on the current reserves of the tokens in the relevant liquidity pool.

The Quoter contract takes into account the amount of tokens being traded, the prices of the tokens, and the liquidity of the pool, among other factors. The result is an estimated price for the trade that takes into account the slippage that may occur due to the trade's impact on the pool's liquidity.

The Quoter contract is used in conjunction with the Uniswap V3 Swap contract, which executes the actual trade between the tokens. By providing accurate price quotes, the Quoter helps ensure that users receive fair and transparent pricing for their trades on the Uniswap V3 exchange.