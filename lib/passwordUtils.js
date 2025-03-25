const bcrypt = require("bcryptjs");

async function genPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return {
    salt,
    hash,
  };
}

function checkPassword(password, hash) {
    return bcrypt.compare(password, hash, function(err, result){});
}

module.exports = {
  genPassword,
  checkPassword,
};
