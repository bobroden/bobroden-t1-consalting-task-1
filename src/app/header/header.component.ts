import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openCategoryDialog(): void {
    this.dialog.open(CategoryComponent);
  }

}
