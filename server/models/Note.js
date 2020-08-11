import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Note = new Schema({
    content: { type: String, required: true },
    bugId: { type: ObjectId, ref: 'Bug', required: true },
    flagged: { type: String, enum: ["pending", "completed", "rejected"] },
    creatorEmail: { type: String, required: true },
    name: { type: String }
}, { timestamps: true, toJSON: { virtuals: true } })

export default Note


