import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "components/Image";
import { NFTItem } from "hooks/user/useUserInventory";

export const GridItem = ({
  nftItem,
  offer,
}: {
  nftItem: NFTItem;
  offer?: any;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="10px"
      border="thin red solid"
      width="100px"
      overflow="hidden"
      textOverflow="ellipsis"
      alignItems="center">
      {nftItem.symbol}
      <Image
        src={
          nftItem.imgURI ??
          "https://i.pcmag.com/imagery/reviews/03aizylUVApdyLAIku1AvRV-39.fit_scale.size_1028x578.v1605559903.png"
        }
        width={50}
        height={70}
      />
      <Typography>#{nftItem.id}</Typography>
      <Typography>{nftItem.name}</Typography>
      {/*show offer details for NFT*/}
      {offer && <></>}
    </Box>
  );
};
