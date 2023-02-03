import { Box } from "@mui/material";
import { NFTList } from "components/NFTList";
import { useUserInventory } from "hooks/user/useUserInventory";

function User() {
  const { assets, getNextPage, isAllDataLoaded, isLoading } =
    useUserInventory();

  return (
    <Box>
      <NFTList
        items={assets}
        getNextPage={getNextPage}
        isAllDataLoaded={isAllDataLoaded}
        isLoading={isLoading}
        viewType="grid"
      />
    </Box>
  );
}

export default User;
