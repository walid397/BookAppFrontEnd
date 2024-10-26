import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../Models/ibook';
import { BookApiService } from '../../Service/book-api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  Book: IBook = {} as IBook;
  id: number = 0;
  titleExist = false
  priceError = false
  authorError = false
  descriptionError = false
  genreError = false
  publishedDateError = false
  CreateOrEdit: string = 'Create';
  constructor(
    private _bookService: BookApiService,
    private _ActivatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit() {
    // this.Book = new IBook()
    // this.id = this._ActivatedRoute.snapshot.params['id'];
    console.log(this.id);
    if (this.id != 0 && this.id != undefined) {
      this.CreateOrEdit = 'Edit';
      this._bookService.GetBookById(this.id).subscribe({
        next: (res:any) => {
          console.log(res);
          this.Book = res['entity'];
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  AddBook(Book: IBook) {
    // if (typeof Book.publishedDate === 'string') {
    //   Book.publishedDate = new Date(Book.publishedDate).toISOString();
    // }

    console.log(Book.publishedDate);

    this._bookService.AddBook(Book).subscribe(res=>{
        this.router.navigate(['/getall'])
    },err=>{
      if(err.error.errors){
        this.titleExist = false
        console.log(' err.error.errors.Price' , err.error.errors.Price)
        err.error.errors.Price ? this.priceError = true : this.priceError = false
        err.error.errors.Author ? this.authorError = true :this.authorError = false
        err.error.errors.Description ? this.descriptionError = true : this.descriptionError = false
        err.error.errors.Genre ? this.genreError = true :  this.genreError =false
        err.error.errors.PublishedDate ? this.publishedDateError = true :  this.publishedDateError =false
        console.log('err.errors',(err.error.errors))
      }else{
        this.titleExist = true
        this.priceError = false
        this.authorError = false
        this.descriptionError = false
        this.genreError = false
        this.publishedDateError = false
      }
      console.log('error' , err)
    })



    // this._bookService.AddBook(Book).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.router.navigate(['/getall'])

    //   },
    //   error: (err) => {
    //     console.log('err' , err.errors)
    //     if(err.error.message == `Unexpected token 'N', "Name Already Exist" is not valid JSON`){
    //       this.titleExist = true
    //       this.priceError = false

    //     }else{
    //       this.priceError = true
    //       this.titleExist = false

    //     }
    //     console.log(err);
    //   },
    // });
  }

  GetBookById(Id: number) {
    this._bookService.GetBookById(Id).subscribe({
      next: (res) => {},
      error: (err) => {
        console.log(err);
      },
    });
  }

  Update(Book: IBook) {
    if (typeof Book.publishedDate === 'string') {
      Book.publishedDate = new Date(Book.publishedDate).toISOString();
    }
    this._bookService.Update(Book).subscribe({
      next: (res) => {
        this.router.navigate(['/getall'])
      },
      error: (err) => {
        if(err.error.errors){
          this.titleExist = false
          console.log(' err.error.errors.Price' , err.error.errors.Price)
          err.error.errors.Price ? this.priceError = true : this.priceError = false
          err.error.errors.Author ? this.authorError = true :this.authorError = false
          err.error.errors.Description ? this.descriptionError = true : this.descriptionError = false
          err.error.errors.Genre ? this.genreError = true :  this.genreError =false
          err.error.errors.PublishedDate ? this.publishedDateError = true :  this.publishedDateError =false
          console.log('err.errors',(err.error.errors))
        }else{
          this.titleExist = true
          this.priceError = false
          this.authorError = false
          this.descriptionError = false
          this.genreError = false
          this.publishedDateError = false
        }

   
        console.log(err);
      },
    });
  }

  cancle(){
    this.router.navigate(['/getall'])

  }
}
