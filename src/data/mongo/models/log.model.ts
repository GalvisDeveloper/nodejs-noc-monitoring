import mongoose from "mongoose";

/**
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
 */

const logSchema = new mongoose.Schema({
    message: { type: String, required: true },
    level: { type: String, required: true, enum: ['low', 'medium', 'high'], default: 'low' },
    createdAt: { type: Date, default: Date.now },
    origin: { type: String, required: true },
})

export const LogModel = mongoose.model('Log', logSchema);