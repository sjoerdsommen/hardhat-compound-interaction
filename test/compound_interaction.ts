import { expect } from "chai";
import { ethers, network } from "hardhat";
import dai from "../abis/dai.json";

describe("Testing unlocking DAI and trying to send it", function () {
  const acc = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549"; // whale account
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  it("Balance of dai should be > 0", async function () {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [acc],
    });
    const signer = await ethers.getSigner(acc);
    const [ownAcc] = await ethers.getSigners();
    const daiContract = new ethers.Contract(daiAddress, dai);
    await daiContract.connect(signer).transfer(ownAcc.address, 1);
    const daiBalance = await daiContract
      .connect(signer)
      .balanceOf(ownAcc.address);
    const formattedBalance = parseFloat(ethers.utils.formatEther(daiBalance));
    expect(formattedBalance).to.be.greaterThan(0);
  });
});
