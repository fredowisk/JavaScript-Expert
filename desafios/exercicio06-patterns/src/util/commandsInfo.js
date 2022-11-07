import makeLoginController from "../main/factories/account/loginFactory.js";
import makeSignupController from "../main/factories/account/signupFactory.js";

import makeFindCreditsController from "../main/factories/account/findCreditsFactory.js";
import makeRemoveCreditController from "../main/factories/account/removeCreditFactory.js";

import makeAddEmailController from "../main/factories/email/addEmailFactory.js";
import makeListEmailsByAccountController from "../main/factories/email/listEmailsByAccountFactory.js";

import makeAddSMSController from "../main/factories/sms/addSmsFactory.js";
import makeListSMSByAccountIdController from "../main/factories/sms/listSMSByAccountIdFactory.js";

import makeAddWhatsappMessageController from "../main/factories/whatsapp/addWhatsappMessageFactory.js";
import makeListWhatsappMessagesByAccountIdController from "../main/factories/whatsapp/listWhatsappMessagesByAccountIdFactory.js";

export default {
  account: {
    options: {
      login: {
        maker: makeLoginController,
      },
      signup: {
        maker: makeSignupController,
      },
    },
    helpers: {
      findCredits: {
        maker: makeFindCreditsController,
      },
      removeCredit: {
        maker: makeRemoveCreditController,
      },
    },
  },
  options: {
    email: {
      commands: {
        send: {
          fields: "to subject text",
          maker: makeAddEmailController,
        },
        list: { maker: makeListEmailsByAccountController },
      },
    },
    sms: {
      commands: {
        send: {
          fields: "contactNumber text",
          maker: makeAddSMSController,
        },
        list: { maker: makeListSMSByAccountIdController },
      },
    },
    whatsapp: {
      commands: {
        send: {
          fields: "contactNumber text",
          maker: makeAddWhatsappMessageController,
        },
        list: { maker: makeListWhatsappMessagesByAccountIdController },
      },
    },
  },
};
