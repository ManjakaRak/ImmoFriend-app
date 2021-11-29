const jwt = require('jsonwebtoken');

const _generateSecretKey = () => {
  const longChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

  const outputSecretKey = [];

  for (let i = 0; i < 6; i++) {
    outputSecretKey.push(longChar[Math.ceil(Math.random() * longChar.length)]);
  }
  return outputSecretKey.join('');

}

const controller = {
  _generatedKey: '',
  _clientData: {},
  /**
   * create a token on first client submit to access on VERIFY-TOKEN section
   */
  addClient: async (req, res) => {
    const { email } = req.body;
    this._clientData = req.body;
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY);
    
    // this key will be send on client email for confirmation
    this._generatedKey = 'secret';
    await res.json({ 'dataIsValid': true, 'token': token});
  },
  /**
   * Auth the user with random uniq key send on front
   */
  verifySecretKey: (req, res) => {
    let isVerified = false;
    req.body.secretKey === this._generatedKey ? isVerified = true : null;

    // build a new token with generatedKey for property-registration form
    const newToken = jwt.sign({key : this._generatedKey }, process.env.JWT_SECRET_KEY);
    res.send({ verified: isVerified, token: newToken, clientData: this._clientData });
    // when auth is done => register the client
  }
}

module.exports = controller;