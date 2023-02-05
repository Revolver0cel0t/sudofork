import BigNumber from "bignumber.js";
import { MAX_UINT256, ZERO } from "stores/constants";
import {
  CurveError,
  IBaseCurve,
  NewBuyParams,
  NewSellParams,
} from "./baseCurve";

export class LinearCurve implements IBaseCurve {
  validateSpotPrice(): boolean {
    return true;
  }

  validateDelta(): boolean {
    return true;
  }

  getBuyInfo(
    spotPrice: BigNumber,
    delta: BigNumber,
    numItems: BigNumber,
    feeMultiplier: BigNumber,
    protocolFeeMultiplier: BigNumber
  ): NewBuyParams {
    if (numItems.eq(0)) {
      return {
        error: CurveError.INVALID_NUMITEMS,
        newSpotPrice: ZERO,
        newDelta: ZERO,
        inputValue: ZERO,
        protocolFee: ZERO,
      };
    }

    // For a linear curve, the spot price increases by delta for each item bought
    const newSpotPrice_ = spotPrice.plus(delta.times(numItems));
    if (newSpotPrice_.gt(MAX_UINT256)) {
      return {
        error: CurveError.SPOT_PRICE_OVERFLOW,
        newSpotPrice: ZERO,
        newDelta: ZERO,
        inputValue: ZERO,
        protocolFee: ZERO,
      };
    }
    let newSpotPrice = newSpotPrice_;

    const buySpotPrice = spotPrice.plus(delta);

    // If we buy n items, then the total cost is equal to:
    // (buy spot price) + (buy spot price + 1*delta) + (buy spot price + 2*delta) + ... + (buy spot price + (n-1)*delta)
    // This is equal to n*(buy spot price) + (delta)*(n*(n-1))/2
    // because we have n instances of buy spot price, and then we sum up from delta to (n-1)*delta
    let inputValue = numItems
      .times(buySpotPrice)
      .plus(numItems.times(numItems.minus(1)).times(delta).div(2));

    // Account for the protocol fee, a flat percentage of the buy amount
    const protocolFee = inputValue.times(protocolFeeMultiplier).div(1e18);

    // Account for the trade fee, only for Trade pools
    inputValue = inputValue.plus(inputValue.times(feeMultiplier).div(1e18));

    // Add the protocol fee to the required input amount
    inputValue = inputValue.plus(protocolFee);

    // Keep delta the same
    const newDelta = delta;

    // If we got all the way here, no math error happened
    const error = CurveError.OK;

    return {
      error,
      newSpotPrice,
      newDelta,
      inputValue,
      protocolFee,
    };
  }

  getSellInfo(
    spotPrice: BigNumber,
    delta: BigNumber,
    numItems: BigNumber,
    feeMultiplier: BigNumber,
    protocolFeeMultiplier: BigNumber
  ): NewSellParams {
    if (numItems.eq(0)) {
      return {
        error: CurveError.INVALID_NUMITEMS,
        newSpotPrice: ZERO,
        newDelta: ZERO,
        outputValue: ZERO,
        protocolFee: ZERO,
      };
    }

    // We first calculate the change in spot price after selling all of the items
    const totalPriceDecrease = delta.times(numItems);

    let newSpotPrice;

    // If the current spot price is less than the total amount that the spot price should change by...
    if (spotPrice < totalPriceDecrease) {
      // Then we set the new spot price to be 0. (Spot price is never negative)
      newSpotPrice = new BigNumber(0);

      // We calculate how many items we can sell into the linear curve until the spot price reaches 0, rounding up
      const numItemsTillZeroPrice = spotPrice.div(delta).plus(1);
      numItems = numItemsTillZeroPrice;
    }
    // Otherwise, the current spot price is greater than or equal to the total amount that the spot price changes
    // Thus we don't need to calculate the maximum number of items until we reach zero spot price, so we don't modify numItems
    else {
      // The new spot price is just the change between spot price and the total price change
      newSpotPrice = spotPrice.minus(totalPriceDecrease);
    }

    let outputValue = numItems
      .times(spotPrice)
      .minus(numItems.times(numItems.minus(1)).times(delta).div(2));

    // Account for the protocol fee, a flat percentage of the sell amount
    let protocolFee = outputValue.times(protocolFeeMultiplier).div(1e18);

    // Account for the trade fee, only for Trade pools
    outputValue = outputValue.minus(outputValue.times(feeMultiplier).div(1e18));

    // Subtract the protocol fee from the output amount to the seller
    outputValue = outputValue.minus(protocolFee);

    // Keep delta the same
    const newDelta = delta;

    // If we reached here, no math errors
    const error = CurveError.OK;

    return {
      error,
      newSpotPrice,
      newDelta,
      outputValue,
      protocolFee,
    };
  }
}
