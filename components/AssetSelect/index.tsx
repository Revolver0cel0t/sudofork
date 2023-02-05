import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import Logo from "components/Logo/Logo";
import { useState } from "react";
import { AssetPicker } from "./AssetPicker";

export type BaseItem = {
  address: string;
  imageURI: string;
  name: string;
  symbol: string;
};

export const AssetSelect = ({
  header,
  selectItem,
  selectedItem,
  items,
  paginationDetails,
}: {
  header: string;
  selectItem: (item: BaseItem) => void;
  items: BaseItem[];
  selectedItem?: BaseItem;
  paginationDetails?: {
    isAllDataLoaded: boolean;
    getNextPage: () => void;
  };
}) => {
  const [isModalOpened, toggleModal] = useState(false);

  return (
    <>
      <AssetPicker toggleModal={toggleModal} item={selectedItem} />
      <Dialog open={isModalOpened} onClose={() => toggleModal(false)}>
        <DialogTitle>{header}</DialogTitle>
        <List sx={{ pt: 0 }}>
          {items.map((item) => (
            <ListItem>
              <ListItemButton
                onClick={() => selectItem(item)}
                key={item.address}>
                <Box display="flex" flexDirection="row">
                  <Logo width={20} height={20} src={item.imageURI} />
                  <Box display="flex" flexDirection="column">
                    <Typography>{item.name}</Typography>
                    <Typography>{item.symbol}</Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
          {paginationDetails && !paginationDetails.isAllDataLoaded && (
            <Button onClick={paginationDetails.getNextPage}>Load more</Button>
          )}
        </List>
      </Dialog>
    </>
  );
};
