import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Bookmark } from '../bookmark';
@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.css'],
})
export class AddBookMarkComponent implements OnInit {
  actionBtn: string = 'Save';
 
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddBookMarkComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  bookmarkForm!: FormGroup;
 

  
  ngOnInit(): void {
  
    this.bookmarkForm = this.fb.group({
      title: ['', Validators.required],
      categoryName: [''],
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      categories: this.fb.array([this.initCategory()]) ,

    });

    if (this.editData) {
      this.bookmarkForm.controls['title'].setValue(this.editData.title);
      this.bookmarkForm.controls['url'].setValue(this.editData.url);
      this.bookmarkForm.controls.categories.setValue(this.editData.categories.name);
  
      this.actionBtn = 'Update';
    }
  }

  categories(): FormArray {
    return this.bookmarkForm.get("categories") as FormArray;
  }



  addCategory(): void {
    this.categories().push(this.initCategory());
  }

  removeCategory(i: number): void {
    this.categories().removeAt(i);
  }
  initCategory() {
    return this.fb.group({
      name: ["", Validators.required],
    });
  }

  get m(){
    return this.bookmarkForm.controls;
  }

  addBookmark() {
    if (!this.editData) {
      if (this.bookmarkForm.valid) {
        this.apiService.saveBookmark(this.bookmarkForm.value).subscribe(
          (res) => {
            //console.log(res);
            this.dialogRef.close('save');
            //alert('Bookmark Added Successfull');
            //this.router.navigateByUrl('');
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log('data is not valid');
      }
    } else {
      this.updateBookmark();
    }
  }

  updateBookmark() {
    this.apiService
      .updateBookmark(this.bookmarkForm.value, this.editData.id)
      .subscribe(
        (res) => {
          //console.log(res);
          //alert('Bookmark Updated Successfull');
          this.bookmarkForm.reset(), this.dialogRef.close('update');
          //this.router.navigateByUrl('');
          this.dialogRef.close('update');
        },
        (err) => {
          console.log(err);
        }
      );
  }

 
}
