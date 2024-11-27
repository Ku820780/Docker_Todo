import mongoose, { model }  from "mongoose";

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required:true
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true
    }
}, {timestamps: true})

const TaskModel = mongoose.model("task", taskSchema);
export default TaskModel;