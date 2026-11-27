const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    assetName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Circuit Breaker",
        "Power Cable",
        "Transformer",
        "Rotating Machine",
        "Switchgear",
      ],
    },

    manufacturer: String,

    model: String,

    serialNumber: String,

    installationDate: {
      type: Date,
    },

    // Optional override when a verified service-life value is available
    expectedServiceLifeYears: {
      type: Number,
      min: 0.1,
    },

    criticality: {
      type: String,
      enum: ["Low", "Medium", "High", "Very High"],
      required: true,
    },

    lastMaintenanceDate: {
      type: Date,
    },

    nextMaintenanceDate: {
      type: Date,
    },

    // Maintenance interval for this particular asset
    maintenanceIntervalDays: {
      type: Number,
      min: 1,
    },

    readings: [
      {
        parameter: {
          type: String,
          required: true,
        },
        value: mongoose.Schema.Types.Mixed,
        unit: String,
        recordedAt: {
          type: Date,
          default: Date.now,
        },
        condition: {
          type: String,
          enum: ["Normal", "Caution", "Warning", "Critical", "Not Assessed"],
          default: "Not Assessed",
        },

        assessmentType: {
          type: String,
          enum: ["automatic", "manual", "not-assessed"],
          default: "not-assessed",
        },
      },
    ],
    healthScore: {
      type: Number,
      default: 0,
    },

    healthStatus: {
      type: String,
      enum: ["Normal", "Caution", "Warning", "Critical", "Not Assessed"],
      default: "Not Assessed",
    },

    maintenancePriorityScore: {
  type: Number,
  default: null
},

maintenancePriority: {
  type: String,
  enum: ["Low", "Medium", "High", "Critical", "Not Assessed"],
  default: "Not Assessed"
},

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
