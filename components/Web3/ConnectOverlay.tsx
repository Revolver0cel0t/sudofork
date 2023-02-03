import { Box, Button, Dialog, Grid, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useThemeContext } from "../../theme/themeContext";
import { ChainIds, connectorsByName } from "stores/connectors/connectors";

export const ConnectOverlay = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const context = useWeb3React();

  const { connector, activate, deactivate, account } = context;

  const { theme } = useThemeContext();

  const [activatingConnector, setActivatingConnector] = useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  async function onConnectionClicked(
    currentConnector: any,
    name: string,
    setActivatingConnector: Dispatch<SetStateAction<string>>,
    activate: any,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) {
    setActivatingConnector(name);
    activate(connectorsByName[name]);
    setOpen(false);
    let hexChain = "0x" + Number(ChainIds.ETHEREUM).toString(16);
    try {
      await window.ethereum?.request?.({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChain }],
      });
      setOpen(false);
    } catch (error: any) {
      if (error?.code !== 4001) {
        try {
          //   await window.ethereum.request("wallet_addEthereumChain", [
          //     ADD[Number(chainId)],
          //     account,
          //   ]);
          await window.ethereum?.request?.({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: hexChain }, account],
          });
          setOpen(false);
        } catch (e) {
          console.error("switch error", e);
        }
      }
    }
  }

  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
      disableScrollLock={true}>
      <Box>
        <Grid
          container
          rowGap="10px"
          paddingY="10px"
          marginTop="10px"
          onClick={(e) => {
            e.stopPropagation();
          }}
          overflow="scroll">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%">
            <Typography variant="body-m-bold" color="primary.20">
              Connect Wallet
            </Typography>
          </Box>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            width="100%"
            sx={{
              paddingRight: "20px",
              "@media only screen and (max-width:899px)": {
                paddingRight: "0",
              },
            }}
            paddingY="40px">
            <Box
              style={{
                width: "899px",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "max-content",
              }}
              color="black"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              rowGap="10px"
              paddingBottom="10px"
              sx={{
                borderRight: `thin ${theme.palette.primary["20"]} solid`,
                paddingRight: "10px",
                "@media only screen and (max-width:899px)": {
                  borderRight: "unset",
                  paddingRight: "0",
                },
              }}>
              <Typography variant="body-m-bold" color="primary.20">
                Recommended
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                rowGap="10px">
                {Object.keys(connectorsByName).map((name, index) => {
                  const currentConnector = connectorsByName[name];
                  const activating = name === activatingConnector;

                  let url;
                  let display = name;
                  let descriptor = "";
                  if (name === "MetaMask") {
                    url = "/connectors/icn-metamask.svg";
                    descriptor = "Metamask";
                  } else if (name === "WalletConnect") {
                    url = "/connectors/walletConnectIcon.svg";
                    descriptor = "WalletConnect";
                  } else if (name === "TrustWallet") {
                    url = "/connectors/trustWallet.png";
                    descriptor = "TrustWallet";
                  } else if (name === "Portis") {
                    url = "/connectors/portisIcon.png";
                    descriptor = "Portis";
                  } else if (name === "Fortmatic") {
                    url = "/connectors/fortmaticIcon.png";
                    descriptor = "Fortmatic";
                  } else if (name === "Ledger") {
                    url = "/connectors/icn-ledger.svg";
                    descriptor = "Ledger";
                  } else if (name === "Squarelink") {
                    url = "/connectors/squarelink.png";
                    descriptor = "Squarelink";
                  } else if (name === "Trezor") {
                    url = "/connectors/trezor.png";
                    descriptor = "Trezor";
                  } else if (name === "Torus") {
                    url = "/connectors/torus.jpg";
                    descriptor = "Torus";
                  } else if (name === "Authereum") {
                    url = "/connectors/icn-aethereum.svg";
                    descriptor = "Authereum";
                  } else if (name === "WalletLink") {
                    display = "Coinbase";
                    url = "/connectors/coinbaseWalletIcon.svg";
                    descriptor = "Coinbase";
                  } else if (name === "Frame") {
                    return "";
                  }

                  return (
                    <Box
                      key={name}
                      sx={{
                        "@media only screen and (max-width:899px)": {
                          margin: "auto",
                        },
                      }}
                      width="100%">
                      <Button
                        onClick={() => {
                          onConnectionClicked(
                            currentConnector,
                            name,
                            setActivatingConnector,
                            activate,
                            setOpen
                          );
                        }}>
                        {descriptor}
                      </Button>
                    </Box>
                  );
                })}
                {account && (
                  <Button
                    onClick={() => {
                      deactivate();
                    }}>
                    Disconnect Wallet
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            alignItems="start"
            width="100%"
            paddingY="40px"
            justifyContent="space-between"
            style={{ color: "white" }}
            rowGap="20px"
            textAlign="left">
            <Box display="flex" flexDirection="column" alignItems="start">
              <Typography variant="body-m-bold" color="primary.20">
                New here?
              </Typography>
              <Typography variant="body-m-bold">Welcome to DeFi!</Typography>
              <Typography variant="body-m-regular">
                Create a crypto wallet to start trading on 3xcalibur.
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="start">
              <Typography variant="body-m-bold" color="primary.20">
                What is a wallet?
              </Typography>
              <Typography variant="body-m-bold">
                A home for your digital assets!
              </Typography>
              <Typography variant="body-m-regular">
                A new way to log in
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
