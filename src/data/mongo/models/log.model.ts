import mongoose from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new mongoose.Schema({
    message: { type: String, required: true },
    level: { type: String, required: true, enum: LogSeverityLevel, default: LogSeverityLevel.LOW },
    createdAt: { type: Date, default: Date.now },
    origin: { type: String, required: true },
})

export const LogModel = mongoose.model('Log', logSchema);