import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TreeShopModule", (m) => {
  const token20 = m.contract("CarbonOffset", []);
  const treeShop = m.contract("TreeShop", [token20]);

  const setNewOwner = m.call(
    token20,
    "setNewOwner",
    [treeShop]
  );

  return { token20, treeShop, setNewOwner };
});
