import { expect } from "chai";
import { ethers } from "hardhat";
import dai from "../abis/dai.json";
// import cdai from "../abis/cdai.json";

describe("Testing unlocking DAI and lending it into Compound", function () {
  const acc = "0x21a31Ee1afC51d94C2eFcCAa2092aD1028285549";
  const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  // const cdaiAddress = "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643";
  // const batAddress = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";
  // const cbatAddress = "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e";
  // const comptroller = "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B";

  it("Balance of dai should be > 0", async function () {
    const signer = await ethers.getSigner(acc);
    const daiContract = new ethers.Contract(daiAddress, dai, signer);
    const daiBalance = await daiContract.balanceOf(acc);
    const formattedBalance = parseFloat(ethers.utils.formatEther(daiBalance));
    expect(formattedBalance).to.be.greaterThan(0);
  });

  // it("Balance of cdai should be > 0", async function () {
  //   const signer = await ethers.getSigner(acc);
  //   const cdaiContract = new ethers.Contract(cdaiAddress, cdai);

  //   const CompoundInteraction = await ethers.getContractFactory(
  //     "CompoundInteraction"
  //   );

  //   const CI = await CompoundInteraction.deploy(
  //     daiAddress,
  //     cdaiAddress,
  //     batAddress,
  //     cbatAddress,
  //     comptroller
  //   );

  //   await CI.connect(signer).invest();
  //   const cdaiBalance = await cdaiContract.balanceOf(acc);
  //   const formattedBalance = parseFloat(ethers.utils.formatEther(cdaiBalance));
  //   expect(formattedBalance).to.be.greaterThan(0);
  // });
});
