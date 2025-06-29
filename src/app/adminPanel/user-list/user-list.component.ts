import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserListService } from '../service/user-list.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers:[UserListService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  delete:any;
  constructor(private _user:UserListService){}

  ngOnInit(){
    this.allot();
  }

  data:any = []

  allot(){
    this._user.userGetLs().subscribe(res=>{
      this.data = res;
    })
  }

  edit(data:any){
    console.log(data);
  }
  del(evt:any){
    this._user.userDelLs(evt).then(res=>{
      if(res.state){
        alert(res.message);
      }
    }).catch(err=>{
      alert(err);
    })
  }

}
