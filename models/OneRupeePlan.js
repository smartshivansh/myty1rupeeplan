const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OneRupeePlanSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    coverText: {
      type: Schema.Types.String
    },
    subdomain: {
        type: Schema.Types.String
    }
  }
);

module.exports = OneRupeePlan = mongoose.model("OneRupeePlan", OneRupeePlanSchema);
