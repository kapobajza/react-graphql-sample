const DELAY_MS = 300;

module.exports = async (req, res, next) => {
  await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
  next();
};
