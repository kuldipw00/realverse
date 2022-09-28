const Land = artifacts.require("Land")

module.exports = async function (deployer) {
    const NAME = 'IIITH Land'
    const SYMBOL = 'IB'
    const COST = web3.utils.toWei('1', 'ether')

    await deployer.deploy(Land, NAME, SYMBOL, COST)
}
