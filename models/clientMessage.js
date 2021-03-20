import mongoose from "mongoose";



const clientSchema = mongoose.Schema({
  fullName: String,
  phone: String,
  extraInfo: String,
  selectedFile: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ClientMessage = mongoose.model("ClientMessage", clientSchema);

export default ClientMessage;
