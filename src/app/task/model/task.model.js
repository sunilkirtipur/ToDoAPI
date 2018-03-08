var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        default: 'todo'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
        timestamps: true,
    });

export default mongoose.model('Task', taskSchema);
