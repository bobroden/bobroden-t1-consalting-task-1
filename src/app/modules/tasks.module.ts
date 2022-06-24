import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { ListOfTasksComponent } from '../list-of-tasks/list-of-tasks.component';
import { CreatingTaskComponent } from '../creating-task/creating-task.component';
import { ChangingTaskComponent } from '../changing-task/changing-task.component';
import { DeletingTaskComponent } from '../deleting-task/deleting-task.component';

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
    ChangingTaskComponent,
    DeletingTaskComponent
  ],
  exports: [
    ListOfTasksComponent,
    CreatingTaskComponent,
    ChangingTaskComponent,
    DeletingTaskComponent
  ]
})
export class TasksModule { }
