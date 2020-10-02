const mongoose = require("mongoose");
const rushingJSON = require("../sampleData/rushing.json");
const Player = require("../models/Player");

const transformPlayers = () => {
  return rushingJSON.map((player) => {
    return {
      name: player.Player,
      team: player.Team,
      position: player.Pos,
      attempts: player.Att,
      attemptsPerGame: player["Att/G"],
      yards: player.Yds.toString(),
      averagePerCarry: player.Avg,
      yardsPerGame: player["Yds/G"],
      td: player.TD,
      longRush: player.Lng.toString(),
      firstDowns: player["1st"],
      firstDownPercentage: player["1st%"],
      twentyPlus: player["20+"],
      fortyPlus: player["40+"],
      fumbles: player.FUM,
    };
  });
};

const seedData = async () => {
  await Player.deleteMany({});
  const playersToInsert = transformPlayers();
  await Player.insertMany(playersToInsert);
};

module.exports = seedData;
