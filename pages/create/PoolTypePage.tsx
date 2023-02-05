import { Box, Typography } from "@mui/material";
import { INTERACTION_TYPE } from ".";

export const PoolTypePage = ({
  setSelectedPoolType,
  selectedPoolType,
}: {
  setSelectedPoolType: (poolType: number) => void;
  selectedPoolType: number;
}) => {
  const interactionText: { [value: number]: string } = {
    [INTERACTION_TYPE.NFT_FROM_TOKEN]: "Buy NFTs with tokens",
    [INTERACTION_TYPE.NFT_FOR_TOKEN]: "Sell NFTs for tokens",
    [INTERACTION_TYPE.NFT_AND_TOKEN]: "Do both and earn trading fees",
  };

  return (
    <Box padding="10px" display="flex" flexDirection="column" rowGap="20px">
      {Object.keys(INTERACTION_TYPE).map((value, index) => (
        <Box
          key={value + index}
          border={
            selectedPoolType === INTERACTION_TYPE[value]
              ? "thin green solid"
              : "thin red solid"
          }
          onClick={() => setSelectedPoolType(INTERACTION_TYPE[value])}
          sx={{
            ["&:hover"]: {
              cursor: "pointer",
            },
          }}>
          <Typography>{interactionText[INTERACTION_TYPE[value]]}</Typography>
        </Box>
      ))}
    </Box>
  );
};
