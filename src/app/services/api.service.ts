import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bookmark } from '../crud/bookmark';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  saveBookmark(data: any) {
    return this.http.post<Bookmark[]>(
      'http://localhost:3000/bookmarkList/',
      data
    );
  }

  getBookmark() {
    return this.http.get<Bookmark[]>('http://localhost:3000/bookmarkList/');
  }

  getCategory() {
    return this.http.get<Bookmark[]>('http://localhost:3000/bookmarkList/');
  }

  updateBookmark(data: any, id: number) {
    return this.http.put<Bookmark[]>(
      'http://localhost:3000/bookmarkList/' + id,
      data
    );
  }
  
}
