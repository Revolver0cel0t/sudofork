import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { NFTItem } from "hooks/user/useUserInventory";
import { GridItem } from "./Item/GridItem";

export type ViewType = "list" | "grid" | "packedGrid";

export type NFTListProps = {
  items: NFTItem[];
  isAllDataLoaded: boolean;
  getNextPage: () => void;
  isLoading: boolean;
  viewType: ViewType;
};

const getSXForViewType = (viewType: string) => {
  switch (viewType) {
    case "grid": {
      return { display: "flex", flexWrap: "wrap" };
    }
  }
};

export const NFTList = ({
  items,
  isAllDataLoaded,
  getNextPage,
  isLoading,
  viewType = "grid",
}: NFTListProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      border="thin red solid"
      sx={getSXForViewType(viewType)}>
      {items && items.map((item: NFTItem) => <GridItem nftItem={item} />)}
      {!isAllDataLoaded && <Button onClick={getNextPage}>Load more</Button>}
    </Box>
  );
};
