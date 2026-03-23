const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  generalInfo: {
    name: String,
    age: { type: Number, default: null },
    birthdate: String,
    sex: String,
    insurance: String,
    tobacco: String,
    alcohol: String,
    allergies: String,
    vaccine: String,
  },

  examination: {
    bp: String,
    temp: String,
    height: String,
    weight: String,
    bmi: String,
  },

  obstetricHistory: {
    contraception: { type: Boolean, default: false },
    type: { type: String, default: "" },
    gpfpal: { type: String, default: "" },
    bf: { type: String, default: "" },
    birthHistory: { type: String, default: "" },
    deliverySite: { type: String, default: "" },
    lmp: { type: String, default: "" },
  },

  perinatalHistory: {
    bw: { type: String, default: "" },
    bf: { type: String, default: "" },
    birthHistory: { type: String, default: "" },
    deliverySite: { type: String, default: "" },
  },

  medicalHistory: [String],
  familyHistory: [String],

  doctorSheet: {
    examination: {
      generalAppearance: String,
      heent: String,
      pulmonary: String,
      cardiovascular: String,
      gastrointestinal: String,
      musculoskeletal: String,
      genitourinary: String,
      neuroPsych: String,
      checkupPanel: String,
    },
    diagnosis: String,
    treatment: String,
    medication: String,
  },

  status: {
    type: String,
    enum: ["waiting", "beingSeen", "released"],
    default: "waiting",
  },
  needsFurtherTreatment: {
    type: Boolean,
    default: false,
  },

  initComplaint: {
    type: String,
    default: "",
  },

  department: {
    type: String,
    enum: ["Pediatrics", "Ortho", "Opta", "Dental", "Cardio", "General"],
  },

  referral: {
    department: String,
    reason: String,
    referredBy: String,
    date: Date,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
