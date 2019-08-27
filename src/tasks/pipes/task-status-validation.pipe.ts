import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];
    transform(value:any, metadata: ArgumentMetadata){
        console.log('value', value);
        console.log('metadata',metadata);
        if(this.checkStatus(value.toUpperCase())){
            return value;
        }
        throw new BadRequestException(`${value} is nod valid status`);
    }
    checkStatus(status){
        return this.allowedStatuses.includes(status);
    }
}