import { expect } from "chai";
import { ethers } from "hardhat";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
import dai from "../abis/dai.json";
// import cdai from "../abis/cdai.json";

describe("Testing unlocking DAI and trying to send it", function () {
  const acc = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549";
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  it("Balance of dai should be > 0", async function () {
    const signer = await ethers.getSigner(acc);
    const [ownAcc] = await ethers.getSigners();
    const daiContract = new ethers.Contract(daiAddress, dai);
    const daiBalanceSigner = await daiContract.balanceOf(signer);
    console.log(daiBalanceSigner);
    await daiContract.connect(signer).transfer(ownAcc, 1);
    const daiBalance = await daiContract.balanceOf(ownAcc);
    const formattedBalance = parseFloat(ethers.utils.formatEther(daiBalance));
    expect(formattedBalance).to.be.greaterThan(0);
  });
});
