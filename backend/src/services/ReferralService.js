import {Referral} from "../models/user";

class ReferralService {

  static create(body) {
    return Referral.create(body);
  }
}

export default ReferralService;