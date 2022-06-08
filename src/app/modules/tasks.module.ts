import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListOfTasksComponent } from '../list-of-tasks/list-of-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ListOfTasksComponent],
  exports: [ListOfTasksComponent]
})
export class TasksModule { }
