import dotenv from "dotenv";
import mongoose from "mongoose";

// cd <root>
// npx ts-node scripts/PatientSeeder.ts

import Patient from "../src/models/Patient";
import patients from "../views/tests/findup/scope/users.json";

dotenv.config();

mongoose.connect(`${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// const is

async function seedPatients() {
  try {
    console.log("Clearing Patients Document");
    await Patient.deleteMany({});
    console.log("Seeding Patients Document with 500 items");
    await Patient.insertMany(patients.results);
    console.log("Databse Seeded successfully");
    console.log("Disconnecting");
    mongoose.disconnect();
  } catch (e) {
    console.log(`Ocorreu um erro: ${e.message}`);
  }
}

seedPatients();
