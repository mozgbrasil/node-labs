import { Document, model, Schema } from "mongoose";

export interface IPatient extends Document {
  location?: {
    street: {
      number: number;
      name: string;
    };
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
    city: string;
    state: string;
    postcode: string;
  };
  gender?: string;
  name?: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login?: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob?: {
    date: string;
    age: number;
  };
  registered?: {
    date: string;
    age: number;
  };
  phone?: string;
  cell?: string;
  // id: {
  //   name: string;
  //   value: string;
  // };
  picture?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat?: string;
}

const jsonSchema = {
  location: {
    street: {
      number: { type: Number, required: false },
      name: { type: String, required: false },
    },
    coordinates: {
      latitude: { type: String, required: false },
      longitude: { type: String, required: false },
    },
    timezone: {
      offset: { type: String, required: false },
      description: { type: String, required: false },
    },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postcode: { type: String, required: false },
  },
  gender: { type: String, required: false },
  name: {
    title: { type: String, required: false },
    first: { type: String, required: false },
    last: { type: String, required: false },
  },
  email: { type: String, required: false },
  login: {
    uuid: { type: String, required: false },
    username: { type: String, required: false },
    password: { type: String, required: false },
    salt: { type: String, required: false },
    md5: { type: String, required: false },
    sha1: { type: String, required: false },
    sha256: { type: String, required: false },
  },
  dob: {
    date: { type: String, required: false },
    age: { type: Number, required: false },
  },
  registered: {
    date: { type: String, required: false },
    age: { type: Number, required: false },
  },
  phone: { type: String, required: false },
  cell: { type: String, required: false },
  // _id: {
  //   name: { type: String, required: true },
  //   value: { type: String, required: true },
  // },
  picture: {
    large: { type: String, required: false },
    medium: { type: String, required: false },
    thumbnail: { type: String, required: false },
  },
  nat: { type: String, required: false },
};

const PatientSchema = new Schema(jsonSchema);

const PatientModel = model("Patient", PatientSchema);

export default PatientModel;
