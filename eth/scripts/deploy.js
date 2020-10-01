require('dotenv').config();
const { getEnvVariable } = require("../utils");
const { MerkleTree } = require("../../merkle-tree");

async function main() {
  // Deploy variables
  const network = getEnvVariable('NETWORK');
  const poapContractAddress = getEnvVariable('POAP_ADDRESS');
  const privateKey = getEnvVariable('PK_DEPLOYER');
  const contractName = getEnvVariable('CONTRACT_NAME');
  const addressFilePath = getEnvVariable('ADDRESS_FILE_PATH');

  const tree = new MerkleTree(addressFilePath);
  const rootHash = tree.getRoot();
  console.log("Merkle tree root hash:", rootHash);

  let provider = new ethers.getDefaultProvider(network);
  const deployer = new ethers.Wallet(privateKey, provider);

  console.log("Deploying the contracts with the account:", await deployer.getAddress());

  const poapAirdrop = await ethers.getContractFactory("PoapAirdrop", deployer);
  const contract = await poapAirdrop.deploy(contractName, poapContractAddress, rootHash);
  await contract.deployed();

  console.log("Contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
