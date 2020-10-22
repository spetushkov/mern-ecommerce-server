import { model } from 'mongoose';
import { Task } from './Task';

export const TaskModel = model('Task', Task);
