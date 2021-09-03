import { Request, Response } from "express";

import Patient from "../models/Patient"; // Pattern: mongo collection = patients
export async function select_records(req: Request, res: Response): Promise<any> {
  try {

    const page:any = req.query.page;
    const pageSize: any = req.query.pageSize;

    const patients = await Patient.find()
      .sort({ _id: -1 })
      .skip(page > 0 ? (page - 1) * pageSize : 0)
      .limit(pageSize);
      // .forEach((item) => {
      //   print(item.name);
      // })


    return res.status(200).json(patients);
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}

export async function select_record(req: Request, res: Response) {
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

export async function update_record(req: Request, res: Response): Promise<any> {
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

export async function delete_record(req: Request, res: Response): Promise<any> {
  try {
    await Patient.findOneAndDelete({ _id: req.params._id });

    return res.status(204).send();
  } catch (e) {
    return res.status(500).send({ error: `Ocorreu um erro: ${e.message}` });
  }
}
