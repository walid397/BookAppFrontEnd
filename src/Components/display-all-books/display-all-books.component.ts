import { Component, OnInit } from '@angular/core';
import { IBook } from '../../Models/ibook';
import { BookApiService } from '../../Service/book-api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-display-all-books',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './display-all-books.component.html',
  styleUrl: './display-all-books.component.css'
})
export class DisplayAllBooksComponent implements OnInit {
  allBook:IBook[] = []
  noBook:string=''
  id:string = ''
  constructor(private _bookService:BookApiService,private router:Router){

  }
  ngOnInit() {
    
    this.GetAllBooks()
  }
  GetAllBooks()
  {
    this._bookService.GetAllBooks().subscribe({
     next:(res)=>{
       console.log(res)
       this.allBook=res
     },
     error:(err)=>{
       console.log(err)
     }
    })
  }

  DeleteBook(Id:number)
  {
   this._bookService.DeleteBook(Id).subscribe({
    next:(res)=>{
      this.GetAllBooks()
    },
    error:(err)=>{
      console.log(err)
    }
   })
}
Update(id:number)
{
  this.router.navigate(['createbook'],
     { queryParams: { id: id } });
  }

  idChange(event: Event){
    if(event == null){
      this.GetAllBooks()
      this.noBook = ''

    }else{
      this._bookService.GetBookById(Number(event)).subscribe((res:any)=>{
       if(res.entity){
         this.noBook = ''
         this.allBook = [res.entity]
       }else{
         this.noBook = res.errorMessage
         this.allBook =[]
       }
       console.log('res' , res)
      })
    }
   
    // this.allBook.forEach()
    // event==''?
    console.log('id:', event);
  }
}
