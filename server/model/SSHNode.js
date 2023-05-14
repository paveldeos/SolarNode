const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sshNodeSchema = new Schema({
  ethAddress: String,
  ipAddress: String,
  port: String,
  blockchain: String,
}, { timestamps: true });

const SSHNode = mongoose.model('SSHNode', sshNodeSchema);

module.exports = SSHNode;
