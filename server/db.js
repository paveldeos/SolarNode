const mongoose = require('mongoose');
const SSHNode = require('./model/SSHNode');

mongoose.connect('mongodb://localhost:27017/sshNodes', { useNewUrlParser: true, useUnifiedTopology: true });

const saveNode = async (nodeData) => {
    const node = new SSHNode(nodeData);
    return await node.save();
};

const getNodesByBlockchainAndEthAddress = async (blockchainName, ethAddress) => {
    return await SSHNode.find({ blockchain: blockchainName, ethAddress: ethAddress });
};

module.exports = {
    saveNode,
    getNodesByBlockchainAndEthAddress,
};
