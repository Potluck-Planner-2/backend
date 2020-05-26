const db = require("../database/db-config.js");

module.exports = {
  inviteToPotluck,
  acceptInvitation
};
async function inviteToPotluck(invitation) {
  const invitedUser = await db("users")
    .select("id", "username", "email")
    .where({ id: invitation.user_id });
  db("potluck_users").insert(invitation);
  return invitedUser;
}
async function acceptInvitation(rsvp) {
  const attendedPotluck = await db("potlucks").where({ id: rsvp.potluck_id });
  db("potluck_users")
    .where({ user_id: rsvp.user_id, potluck_id: rsvp.potluck_id })
    .update(rsvp);
  return attendedPotluck;
}
