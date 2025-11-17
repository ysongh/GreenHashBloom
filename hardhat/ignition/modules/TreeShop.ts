import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TreeShopModule", (m) => {
  const treeShop = m.contract("TreeShop");

  return { treeShop };
});
