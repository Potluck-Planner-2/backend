module.exports = {
  isValid,
};

function isValid(user) {
  return (user.username && user.first_name && user.last_name && user.password);
}
