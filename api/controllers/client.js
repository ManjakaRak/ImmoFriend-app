const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');

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
    this._generatedKey = _generateSecretKey();

    /**
     * send email on client email account
     * we use configuration for dev env => sending email on local smtp server (maildev)
     *
     * @prod_env
     * const transporter = mailer.createTransport({
     *   host: 'HOST',
     *   port: 'PORT',
     *   secure: false,
     *   auth: {
     *     user: 'USER',
     *     pass: 'PASSWORD'
     *   }
     * });
     *
     */

    // transporter for nodemailer
    const transporter = mailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      // unable all securisation for dev
      tls: {
        rejectUnauthorized: false
      }
    });

    // sending mail with OBJECT inside
    /**
     * we will use Async func not callback for handling error or success on process
     */
    const sendMail = async () => {
      const options = {
        /**
         * @on_prod replace with email'admin
         */
        from: "test@server.com",

        /**
         * @on_prod replace with {email} client variable
         */
        to: "test@client.com",

        object: "Clè secrète",
        text: this._generatedKey
      }
      await transporter.sendMail(options)
    }

    // check if email is successfuly send
    try {
      const emailSendSuccessfuly = sendMail();
      res.json({ 'dataIsValid': true, 'token': token});
    } catch (e) {
      res.status(400).json({'msg': 'Error on finding email'});
    }
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
