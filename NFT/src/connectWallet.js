import { ethers } from "ethers";
import NFTMinter from "./Nft-Minter.json";

export async function connectWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    "0xb1C69A6C5178ab2e64195839b390772C813Fc21A", // Paste your Deployed NFT contract address
    NFTMinter.abi,
    signer
  );

  return { signer, contract };
}

export async function connectMetaMask() {
  const { signer } = await connectWallet();
  const address = await signer.getAddress();
  const balance = await signer.getBalance();
  const formattedBalance = ethers.utils.formatEther(balance);
  return { address, formattedBalance };
}
