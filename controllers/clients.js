import mongoose from "mongoose";
import ClientMessage from "../models/clientMessage.js";

export const getClients = async (req, res) => {
  try {
    const clientMessages = await ClientMessage.find();

    res.status(200).json(clientMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  const client = req.body;
  const newClient = new ClientMessage({...client, creator: req.userId, createdAt: new Date().toISOString()});
  try {
    await newClient.save();

    res.status(201).json(newClient);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateClient = async (req, res) => {
  const { id: _id } = req.params;
  const client = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No client with that id");

  const updatedClient = await ClientMessage.findByIdAndUpdate(
    _id,
    { ...client, _id },
    {
      new: true,
    }
  );

  res.json(updatedClient);
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No client with that id");

  await ClientMessage.findByIdAndRemove(id);

  res.json({ message: "Client deleted succesfully " });
};
