import { Routes } from '@angular/router';
import { BookComponent } from '../Components/book/book.component';
import { DisplayAllBooksComponent } from '../Components/display-all-books/display-all-books.component';

export const routes: Routes = [
    
    {path:'',redirectTo:'/getall',pathMatch:"full"},
    {path:'getall',component:DisplayAllBooksComponent},
    {path:'createbook',component:BookComponent},

];
