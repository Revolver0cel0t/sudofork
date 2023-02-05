import { Box, Button } from "@mui/material";
import { BaseItem } from "components/AssetSelect";
import { useUserCollections } from "hooks/user/useUserCollections";
import { useEffect, useState } from "react";
import { PoolParams } from "./PoolParams";
import { PoolTypePage } from "./PoolTypePage";
import { SelectAssetsForLP } from "./SelectAssetsForLp";

export const INTERACTION_TYPE: { [value: string]: number } = {
  NFT_FROM_TOKEN: 0,
  NFT_FOR_TOKEN: 1,
  NFT_AND_TOKEN: 2,
};

export const POOL_CONFIGURATION = {
  [INTERACTION_TYPE.NFT_FROM_TOKEN]: {
    assetASelect: "token",
    assetBSelect: "nft",
    assetAAction: "deposit",
    assetBAction: "receive",
  },
  [INTERACTION_TYPE.NFT_FOR_TOKEN]: {
    assetBSelect: "token",
    assetASelect: "nft",
    assetAAction: "deposit",
    assetBAction: "receive",
  },
  [INTERACTION_TYPE.NFT_AND_TOKEN]: {
    assetASelect: "token",
    assetBSelect: "nft",
    assetAAction: "deposit",
    assetBAction: "deposit",
  },
};

function CreatePool() {
  const [selectedPoolType, setSelectedPoolType] = useState(0);

  const [page, setSelectedPage] = useState(1);

  const [assetA, setAssetA] = useState<BaseItem | undefined>(undefined);
  const [assetB, setAssetB] = useState<BaseItem | undefined>(undefined);

  useEffect(() => {
    setAssetA(undefined);
    setAssetB(undefined);
  }, [selectedPoolType]);

  const checkIfPossibleToProceed = () => {
    switch (page) {
      case 1: {
        return assetA && assetB;
      }
      default: {
        return true;
      }
    }
  };

  return (
    <Box>
      {page === 0 && (
        <PoolTypePage
          selectedPoolType={selectedPoolType}
          setSelectedPoolType={setSelectedPoolType}
        />
      )}
      {page === 1 && (
        <SelectAssetsForLP
          selectedPoolType={selectedPoolType}
          assetA={assetA}
          setAssetA={setAssetA}
          assetB={assetB}
          setAssetB={setAssetB}
        />
      )}
      {page === 2 && <PoolParams />}
      <Box>
        <Button disabled={page == 0} onClick={() => setSelectedPage(page - 1)}>
          Previous Page
        </Button>
        <Button
          disabled={page == 3 || !checkIfPossibleToProceed()}
          onClick={() => setSelectedPage(page + 1)}>
          Next Page
        </Button>
      </Box>
    </Box>
  );
}

export default CreatePool;
