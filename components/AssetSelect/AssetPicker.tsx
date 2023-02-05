import { Box, Typography } from "@mui/material";
import Logo from "components/Logo/Logo";
import { BaseItem } from ".";

export const AssetPicker = ({
  item,
  toggleModal,
}: {
  item?: BaseItem;
  toggleModal: (val: boolean) => void;
}) => {
  return (
    <Box
      width="100px"
      height="30px"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      columnGap="5px"
      onClick={() => toggleModal(true)}>
      {!item ? (
        <Typography>Select</Typography>
      ) : (
        <>
          <Logo width={20} height={20} src={item.imageURI} />
          <Typography>{item.symbol}</Typography>
        </>
      )}
    </Box>
  );
};
