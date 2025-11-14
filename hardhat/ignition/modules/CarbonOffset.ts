import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CarbonOffsetModule", (m) => {
  const carbonOffset = m.contract("CarbonOffset");

  return { carbonOffset };
});
