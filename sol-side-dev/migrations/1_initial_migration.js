const XFW7Bridge = artifacts.require("XFW7Bridge");
const XFW7Token = artifacts.require("XFW7Token");

module.exports = function (deployer) {
  deployer.deploy(XFW7Token).then(async function () {
    await deployer.deploy(XFW7Bridge, XFW7Token.address);
    const xfw7Token = await XFW7Token.deployed();
    return xfw7Token.gatewayUpdate(XFW7Bridge.address);
  }).then(() => {
    console.log("XFW7Token deployed to:", XFW7Token.address);
    console.log("XFW7Bridge deployed to:", XFW7Bridge.address);
  });
};
