import { Request, Response } from "express";

import Patient from "../models/Patient"; // Pattern: mongo collection = patients
export async function index(req: Request, res: Response): Promise<any> {
  try {
    //

    const results = await Patient.find({});

    //
    const page = +req.query.page;
    const pageSize = +req.query.pageSize;

    const patients = await Patient.find({})
      // .select({
      //   _id: 1,
      //   name: 1,
      //   gender: 1,
      //   email: 1,
      //   phone: 1,
      //   cell: 1,
      //   nat: 1,
      // })
      .sort({ _id: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);

    const options = {
      results: patients,
      info: {
        seed: "2f10116f1799d353",
        results: results.length,
        page: Math.round(results.length / pageSize),
        version: "1.0.0",
      },
    };

    return res.status(200).json(options);
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const patient = await Patient.findOne({ _id: req.params._id });

    return res.status(200).json(patient);
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}

export async function create_record(req: Request, res: Response): Promise<any> {
  try {
    const patient = await Patient.create(req.body);

    return res.status(200).json(patient);
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}

export async function update(req: Request, res: Response): Promise<any> {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params._id },
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json(patient);
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}

export async function destroy(req: Request, res: Response): Promise<any> {
  try {
    await Patient.findOneAndDelete({ _id: req.params._id });

    return res.status(204).send();
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}
