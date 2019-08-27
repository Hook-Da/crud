import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTask } from'./dto/create-task.dto';
import { getTaskFilter } from './dto/get-task-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
	constructor(public tasksService: TasksService){

	}
	/* @Get()
	getAllTasks():Task[]{
		return this.tasksService.getAllTasks();
	} */
	@Get()
	getFilterTask(@Query(ValidationPipe) filterObject:getTaskFilter):Task[]{
		if (Object.keys(filterObject).length){
			return this.tasksService.getFilterTask(filterObject)
		}
		return this.tasksService.getAllTasks();
	}
	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto:CreateTask):Task{
		return this.tasksService.createTask(createTaskDto);
	}
	@Get('/:title')
	getTaskByTitle(@Param('title') title:string):Task{
		return this.tasksService.getTaskByTitle(title);
	}
	@Delete('/:title')
	deleteByTitle(@Param('title') title:string):Task{
		return this.tasksService.deleteByTitle(title);
	}
	@Patch('/:title')
	updateStatus(@Param('title') title:string, @Body('status',TaskStatusValidationPipe) status:TaskStatus):Task{
		return this.tasksService.updateStatus(title, status);
	}
}
