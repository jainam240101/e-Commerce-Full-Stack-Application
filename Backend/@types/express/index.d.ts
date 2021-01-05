/** @format */

import { Retailer } from "../../src/entity/Reatilers";
import { User } from "../../src/entity/User";

declare global {
  namespace Express {
    interface Request {
      currentUser: User | undefined;
      currentRetailer: Retailer;
    }
  }
}
