const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const Client = require('../models/Client');

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
      // const emailSendSuccessfully = await sendMail(); => PROD
      /**
       * here we need to start SMTP SERVER MAILDEV for catch local email
       * @type {Promise<void>}
       */
      const emailSendSuccessfully = sendMail(); // Allow sending all email(valid or not) for dev only
      res.json({ 'dataIsValid': true, 'token': token});
      // console.log(emailSendSuccessfuly)
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
  },

  /**
   *
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  clientHaveCustomer: async (req, res) => {
    // about customer
    const {name, email, tel, message, property} = req.body;
    // build the entire information about property and his owner
    const bodyMessage = `
        <h4 style="color: dodgerblue; font-family: 'Courier New'">Vous avez un client!!!<h4>
        <p style="color: gray; font-family: 'sans-serif'">${name} souhaite vous contacter à propos de votre propriété <span style="color: darkred">${property.name}</span></p>
        <p style="color: gray; font-family: 'sans-serif'">Vous pouvez le contactez par téléphone: <span style="color: dodgerblue">${tel}</span> ou par mail <span style="color: dodgerblue">${email}</span></p>
        <p style="color: gray; font-family: 'sans-serif'">${message !== '' ? 'Message: '+message : null}</p>
    `;
    /**
     * send an email to property's owner
     */
    const transporter = mailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
      tls: {
        rejectUnauthorized: false
      }
    });
    let emailIsSend = false;
    try {
      const success = await transporter.sendMail({
        from: 'test@server',
        to: email,
        object: 'Notification',
        html: bodyMessage
      }, );
      success ? emailIsSend = true : null;
      await Client.updateOne({'property._id': property._id}, {
        $set: {
          'property.sold': true
        }
      });
      res.send({emailIsSend});
    } catch (e) {
      res.status(500).send({errorMsg: 'erreur on server'});
    }
  }
}

module.exports = controller;
