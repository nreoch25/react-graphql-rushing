const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String, required: true },
  attempts: { type: Number, required: true },
  attemptsPerGame: { type: Number, required: true },
  yards: { type: String, required: true },
  averagePerCarry: { type: Number, required: true },
  yardsPerGame: { type: Number, required: true },
  td: { type: Number, required: true },
  longRush: { type: String, required: true },
  firstDowns: { type: Number, required: true },
  firstDownPercentage: { type: Number, required: true },
  twentyPlus: { type: Number, required: true },
  fortyPlus: { type: Number, required: true },
  fumbles: { type: Number, required: true },
});

module.exports = mongoose.model("Player", PlayerSchema);
