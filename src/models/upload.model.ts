import mongoose from 'mongoose'

const uploadSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    ETag: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Upload = mongoose.model('upload', uploadSchema)

export default Upload
