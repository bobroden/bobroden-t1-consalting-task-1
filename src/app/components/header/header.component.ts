import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';

import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { CategoryService } from '../../services/category.service';
import { TaskService } from '../../services/task.service';

import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  listOfTasks: Task[] = [];
  listOfCategories: string[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private categoryService: CategoryService,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.taskService.listOfTasks$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfTasks = list;
    });
    this.categoryService.listOfCategories$.pipe(takeUntil(this.destroy$)).subscribe(list => {
      this.listOfCategories = list;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  saveChanges(): void {
    this.userService.saveChanges(this.listOfCategories, this.listOfTasks).pipe(take(1)).subscribe();
  }

  signOut(): void {
    this.userService.setIsSigned(false);
    this.localStorageService.removeCurrentUser();
    this.router.navigateByUrl('/auth');
  }

}
