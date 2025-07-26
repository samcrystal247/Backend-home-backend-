const mongoose = require("mongoose");
const Taskschema = mongoose.Schema(
  {
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

module.exports = ("Task", Taskschema);
