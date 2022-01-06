const showMessage = (req, res) => {
  res.status(300).send(req.params.message);
};

module.exports = { showMessage };
