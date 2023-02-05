import BigNumber from "bignumber.js";

export enum CurveError {
  OK, // No error
  INVALID_NUMITEMS, // The numItem value is 0
  SPOT_PRICE_OVERFLOW, // The updated spot price doesn't fit into 128 bits
}

export type NewBuyParams = {
  error: CurveError;
  newSpotPrice: BigNumber;
  newDelta: BigNumber;
  inputValue: BigNumber;
  protocolFee: BigNumber;
};

export type NewSellParams = {
  error: CurveError;
  newSpotPrice: BigNumber;
  newDelta: BigNumber;
  outputValue: BigNumber;
  protocolFee: BigNumber;
};

export interface IBaseCurve {
  validateSpotPrice(spotPrice: BigNumber): boolean;
  validateDelta(delta: BigNumber): boolean;
  getBuyInfo(
    spotPrice: BigNumber,
    delta: BigNumber,
    numItems: BigNumber,
    feeMultiplier: BigNumber,
    protocolFeeMultiplier: BigNumber
  ): NewBuyParams;
  getSellInfo(
    spotPrice: BigNumber,
    delta: BigNumber,
    numItems: BigNumber,
    feeMultiplier: BigNumber,
    protocolFeeMultiplier: BigNumber
  ): NewSellParams;
}
