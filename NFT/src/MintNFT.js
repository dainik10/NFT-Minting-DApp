import React, { useState } from "react";
import { connectWallet, connectMetaMask } from "./connectWallet";
import { uploadToIPFS } from "./ipfsUploader";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
  Grid,
  Snackbar,
  Alert,
  LinearProgress,
} from "@mui/material";

function MintNFT() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  const [ipfsLink, setIpfsLink] = useState("");
  const [imageStatus, setImageStatus] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const handleConnectMetaMask = async () => {
    const { address, formattedBalance } = await connectMetaMask();
    setWalletAddress(address);
    setWalletBalance(formattedBalance);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageStatus("Image selected for upload");
    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
  };

  const mint = async () => {
    setStatus("Uploading to IPFS...");
    const imageURI = await uploadToIPFS(image);
    setIpfsLink(imageURI);

    setStatus("Minting NFT...");
    setLoading(true);
    const { signer, contract } = await connectWallet();
    const tokenURI = `data:application/json;base64,${btoa(
      JSON.stringify({
        name,
        description,
        image: imageURI,
      })
    )}`;

    const transaction = await contract.mintNFT(signer.getAddress(), tokenURI);
    await transaction.wait();

    setTransactionHistory((prevHistory) => [...prevHistory, transaction.hash]);

    setStatus("NFT minted!");
    setAlertOpen(true);
    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
         NFT Minting Dapp
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConnectMetaMask}
              size="small"
              disabled={Boolean(walletAddress)}
            >
              {walletAddress
                ? "Wallet Connected"
                : "Connect Wallet to Shardeum Sphinx Dapp"}
            </Button>
          </Box>
          {walletAddress && (
            <Box mt={2}>
              <Typography align="center">
                Wallet Address: {walletAddress}
              </Typography>
              <Typography align="center">
                Wallet Balance: {walletBalance} SHM
              </Typography>
            </Box>
          )}
          <TextField
            fullWidth
            label="NFT Name"
            variant="outlined"
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="NFT Description"
            variant="outlined"
            margin="normal"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            style={{ display: "none" }}
            id="image-upload"
            onChange={handleImageChange}
          />
          <p></p>
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
          </label>
          {imageStatus && (
            <Typography variant="caption" display="block" gutterBottom>
              {imageStatus}
            </Typography>
          )}
          <Box mt={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={mint}
            >
              Mint NFT
            </Button>
          </Box>
          {loading && <LinearProgress />}

          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setAlertOpen(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              NFT minted successfully!
            </Alert>
          </Snackbar>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            mt={2}
            sx={{
              border: "1px dashed #999",
              borderRadius: "12px",
              padding: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              background: imagePreviewUrl
                ? "none"
                : "linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
            }}
          >
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Uploaded preview"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <Typography variant="caption" color="text.secondary">
                Preview image will be displayed here
              </Typography>
            )}
          </Box>
        </Grid>
        <Box mt={2}>
          <Typography align="center" color="textSecondary">
            {status}
          </Typography>
          {ipfsLink && (
            <Typography align="left">
              IPFS Link:{" "}
              <Link href={ipfsLink} target="_blank" rel="noopener noreferrer">
                {ipfsLink}
              </Link>
            </Typography>
          )}
        </Box>
      </Grid>
      <Box mt={4}>
        <Typography variant="h7" align="center">
          Transaction History:
        </Typography>
        {transactionHistory.length > 0 ? (
          transactionHistory.map((hash, index) => (
            <Box key={index} mt={1} textAlign="left">
              <Link
                href={`https://explorer-dapps.shardeum.org/transaction/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`Transaction ${index + 1}: ${hash}`}
              </Link>
            </Box>
          ))
        ) : (
          <Typography align="center" mt={1}>
            No transactions yet.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default MintNFT;
