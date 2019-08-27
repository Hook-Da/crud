import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTask } from'./dto/create-task.dto';
import { getTaskFilter } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
	private tasks:Task[] = [];
	getAllTasks():Task[]{
		return this.tasks;
	}
	getFilterTask(filterObject: getTaskFilter):Task[]{
		let { status, search } = filterObject;
		let filteredTask = this.tasks.filter((item)=>{
			return item.status === status || (item.title.includes(search) || item.description.includes(search));
		})
		return filteredTask;
	}
	createTask(createTaskDto:CreateTask):Task{
		let {title,description} = createTaskDto;
		const task: Task = {
			id:uuid(),
			title,
			description,
			status:TaskStatus.OPEN
		};

		this.tasks.push(task);
		return task;
	}
	getTaskByTitle(title):Task{
		let found =  this.tasks.find(item=>{
			return item.title === title;
		});
		if(!found){
			throw new NotFoundException('task with such title not found');
		}
		return found;
	}
	deleteByTitle(title):Task{
		let task = null;
		this.tasks = this.tasks.filter((item)=>{
			if(item.title === title){
				task = item;
				return false;
			}
			return true;
		});
		return task;
	}
	updateStatus(title:string, status:TaskStatus):Task{
		let objectForUpdate = this.tasks.find((item)=>item.title === title);
		objectForUpdate.status = status;
		return objectForUpdate;
	}
}
