import { Bookmark } from './crud/bookmark';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddBookMarkComponent } from './crud/add-bookmark/add-bookmark.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  bookmarks: any;
  categoryData: Bookmark[] = [];
  displayedColumns = [
    'title',
    'url',
    'category',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(public dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getBookmark();
  }
  open(): void {
    this.dialog.open(AddBookMarkComponent, {
      width: '30%',
    }).afterClosed()
    .subscribe((val) => {
      if (val === 'save') {
        this.getBookmark();
      }
    });
  }

  getBookmark() {
    this.apiService.getBookmark().subscribe((data: Bookmark[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.bookmarks = data
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value.trim();
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editBookmark(row: any): void {
    this.dialog.open(AddBookMarkComponent, {
      width: '30%',
      data: row,
    })
    .afterClosed()
    .subscribe((val) => {
      if (val === 'update') {
        this.getBookmark();
      }
    });
  }
  getCategory() {
    this.apiService.getCategory().subscribe((data: Bookmark[]) => {
      this.categoryData = data;
      console.log(this.categoryData)
    });
    }

}
