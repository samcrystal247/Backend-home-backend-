const mongoose = require("mongoose");
const Sampleschema = mongoose.Schema(
  {
    ////project title is an example of data field
    // and you can add other data fields
    projectTitle: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: false,
      default: "gi",
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    order: {
      type: [
        {
          productId: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = ("Sample", Sampleschema);
