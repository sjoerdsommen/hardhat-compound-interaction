import { expect } from "chai";
import { ethers } from "hardhat";
import dai from "../abis/dai.json";

describe("Test unlocking account", function () {
  it("Balance of dai should be > 0", async function () {
    const acc = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549";
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const signer = await ethers.getSigner(acc);
    const daiContract = new ethers.Contract(daiAddress, dai, signer);
    const daiBalance = await daiContract.balanceOf(acc);
    const formattedBalace = parseFloat(ethers.utils.formatEther(daiBalance));
    expect(formattedBalace).to.be.greaterThan(0);
  });
});

describe("Test Compound Interaction", function () {
  it("Balance of cdai should be > 0", async function () {
    const acc = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549";
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const signer = await ethers.getSigner(acc);
    const daiContract = new ethers.Contract(daiAddress, dai, signer);
    const daiBalance = await daiContract.balanceOf(acc);
    const formattedBalace = parseFloat(ethers.utils.formatEther(daiBalance));
    expect(formattedBalace).to.be.greaterThan(0);
  });
});
