import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListOfTasksComponent } from '../list-of-tasks/list-of-tasks.component';
import { CreatingTaskComponent } from '../creating-task/creating-task.component';
import { ChangingTaskComponent } from '../changing-task/changing-task.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListOfTasksComponent,
    CreatingTaskComponent,
    ChangingTaskComponent
  ],
  exports: [
    ListOfTasksComponent,
    CreatingTaskComponent,
    ChangingTaskComponent
  ]
})
export class TasksModule { }
