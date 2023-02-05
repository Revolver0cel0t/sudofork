import { Box, Typography } from "@mui/material";
import { AssetSelect, BaseItem } from "components/AssetSelect";
import { useUserCollections } from "hooks/user/useUserCollections";
import { tokens } from "stores/constants/tokens";
import { POOL_CONFIGURATION } from "..";

export const SelectAssetsForLP = ({
  selectedPoolType,
  assetA,
  assetB,
  setAssetA,
  setAssetB,
}: {
  selectedPoolType: number;
  assetA: BaseItem | undefined;
  assetB: BaseItem | undefined;
  setAssetA: (item: BaseItem) => void;
  setAssetB: (item: BaseItem) => void;
}) => {
  const { contracts, isAllDataLoaded, getNextPage } = useUserCollections();
  const currentConfiguration = POOL_CONFIGURATION[selectedPoolType];

  return (
    <Box>
      <Box display="flex" flexDirection="column">
        <Typography>I want to...</Typography>
        <Box display="flex" flexDirection="row">
          <Typography>{currentConfiguration.assetAAction}</Typography>
          <AssetSelect
            selectItem={setAssetA}
            selectedItem={assetA}
            header={`Select ${currentConfiguration.assetASelect}`}
            items={
              currentConfiguration.assetASelect === "nft"
                ? (contracts as BaseItem[])
                : tokens
            }
            paginationDetails={{ isAllDataLoaded, getNextPage }}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Typography>I want to...</Typography>
        <Box display="flex" flexDirection="row">
          <Typography>{currentConfiguration.assetBAction}</Typography>
          <AssetSelect
            selectItem={setAssetB}
            selectedItem={assetB}
            header={`Select ${currentConfiguration.assetBSelect}`}
            items={
              currentConfiguration.assetBSelect === "nft"
                ? (contracts as BaseItem[])
                : tokens
            }
            paginationDetails={{ isAllDataLoaded, getNextPage }}
          />
        </Box>
      </Box>
    </Box>
  );
};
