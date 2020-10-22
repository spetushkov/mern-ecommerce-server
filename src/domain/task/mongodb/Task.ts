import { Schema } from 'mongoose';

export const Task = new Schema({
  name: String,
  assignee: String,
  dueDateIso: String,
  projects: [String],
  description: String,
  isCompleted: Boolean,
  comments: [String],
  userId: String,
  author: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  }, // ext. reference: user as author ONE_TO_MANY task
  responsibles: [
    {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  ], // ext. reference: user as responsibles MANY_TO_MANY task
});

Task.statics.getExternalKeys = function () {
  return ['author', 'responsibles'];
};
