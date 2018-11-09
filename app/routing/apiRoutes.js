
var friendsData = require("../data/friends");

module.exports = function (app) {

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function (req, res) {
    // TODO
    // compatability logic
    // find the total difference between each users answers and save the results in a parallel array?
    var userScores = req.body.scores
    var totalDiffs = [];

    for (i = 0; i < friendsData.length; i++) {
      var totalDiff = 0;
      for (j = 0; j < userScores.length; j++) {
        totalDiff += Math.abs(userScores[j] - friendsData[i].scores[j])
      }
      totalDiffs.push(totalDiff)
    }

    // finds the min difference and saves the friend as match
    var match = friendsData[totalDiffs.indexOf(Math.min.apply(null, totalDiffs))]


    res.json(match)
    // push to api
    friendsData.push(req.body);
  });
};
