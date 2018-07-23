module.exports = {
  //Get Index
  getIndex: function(req, res) {
    res.status(200).json({
      message: "Welcome to the backend!"
    });
  }
}
