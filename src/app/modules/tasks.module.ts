import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { ListOfTasksComponent } from '../components/list-of-tasks/list-of-tasks.component';
import { CreatingTaskComponent } from '../components/creating-task/creating-task.component';
import { ChangingTaskComponent } from '../components/changing-task/changing-task.component';
import { DeletingTaskComponent } from '../components/deleting-task/deleting-task.component';

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
