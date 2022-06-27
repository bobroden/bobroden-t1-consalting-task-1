import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';

import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { TaskService } from './services/task.service';

import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  
  constructor(private router: Router, private userService: UserService, private categoryService: CategoryService, private taskService: TaskService) {}

  ngOnInit(): void {
    this.userService.getServerCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((currentUser: User) => {
      if(currentUser) {
        this.userService.setCurrentUser(currentUser);
        this.categoryService.setListOfCategories(currentUser.listOfCategories);
        this.taskService.setListOfTasks(currentUser.listOfTasks);
        this.userService.setIsSigned(true);
      }
    });

    this.userService.isSigned$.pipe(take(1)).subscribe((value) => {
      if(!value) {
        this.router.navigateByUrl('/auth');
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
