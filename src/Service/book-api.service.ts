import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '../Models/ibook';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private _httpclient : HttpClient)
   {

   }
   
    GetAllBooks():Observable<IBook[]>{
      return this._httpclient.get<IBook[]>(`${environment.baseUrl}/Book`)
     }
     GetBookById(Id:number):Observable<IBook[]>
     {
      return this._httpclient.get<IBook[]>(`${environment.baseUrl}/Book/${Id}`);
     }
     AddBook(book: IBook): Observable<IBook> {
      return this._httpclient.post<IBook>(`${environment.baseUrl}/Book`, book, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
  }
  
  
  DeleteBook(id:number):Observable<IBook>
  {
  return this._httpclient.delete<IBook>(`${environment.baseUrl}/Book?id=${id}`)
  }
  Update(book: IBook): Observable<IBook> {
    return this._httpclient.put<IBook>(`${environment.baseUrl}/Book`, book);
  }  
}
