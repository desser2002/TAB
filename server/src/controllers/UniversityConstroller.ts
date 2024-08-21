import { University } from "../models/University";
import { Request, Response } from 'express';

export const createUniversity = async (req:Request, res:Response)=>{
try {
    const { name, location } = req.body;
const newUniversity = new University({name,location});

const savedUniversity = await newUniversity.save()
res.status(201).send({ message: "University created successfully", company: savedUniversity });
}
catch (error)
{
    res.status(500).send({message: "Error adding university"})
}
}