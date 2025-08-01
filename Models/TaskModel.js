const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
      minlenght: [5, "description should be more than 5 characters"],
      maxlenght: 100,
    },

    assignedTo: {
      type: String,
      required: [true, "input field required"],
      unique: true,
    },

    projectlink: {
      type: String,
      required: false,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed", "pending"],
      default: "pending",
    },
    //  profilePix:{
    //     type:String,
    //     required:false,
    //     default:"http://avata/img/djdj"
    // },
  },

  {
    timestamp: true,
  }
);
module.exports = mongoose.model("Task", TaskSchema);
