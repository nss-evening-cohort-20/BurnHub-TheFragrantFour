import { googleAuth } from "./googleAuth";
import { emailAuth } from "./emailAuth";

// Checks for which log out we should do... maybe don't need this.
// other methods may work for both.

export const logout = {
  logout: function(setUserState) {
    const userRecord = JSON.parse(localStorage.getItem("user"));
    if (userRecord.type === "google") {
      googleAuth.signOut(setUserState)
    } else if (userRecord.type === "email") {
      emailAuth.signOut(setUserState)
    }
  },
};