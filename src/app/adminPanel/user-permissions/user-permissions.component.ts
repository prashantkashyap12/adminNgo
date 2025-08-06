import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AutocompleteComponent, AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DocBuilderService } from '../service/doc-builder.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-permissions',
  standalone: true,
  imports: [AutocompleteLibModule, CommonModule,HttpClientModule, ReactiveFormsModule],
  providers:[DocBuilderService],
  templateUrl: './user-permissions.component.html',
  styleUrl: './user-permissions.component.css'
})
export class UserPermissionsComponent {
  loader:any;
  data:any =[]
  keyword="Name";
  updateAct=true;
  userRec!:FormGroup;

  constructor(private _docBuildServ:DocBuilderService, private _fb:FormBuilder){}
  ngOnInit(){
    this.init()
    this.allot();
  }
  init(){
    this.userRec = this._fb.group({
      name:['', Validators.required],
      contact:['',Validators.required],
      email:['', Validators.required],
      designaton:['', Validators.required],
      isEdit:['', Validators.required]
    })
  }


  // Data Calling
  allot(){
    this.loader =true;
    this._docBuildServ.getRecord().subscribe(res=>{
      this.data = res.results;
      this.loader =false;
    })
  }

  isUserId:any
  selectEvent(date:any){
    this.userRec.patchValue({
      name:date.Name,
      contact:date.Contact,
      email:date.Email,
      designaton:date.designation,
      isEdit:date.isEdit
    })
    this.isUserId = date.userId;
  }


  model(){
    return {
      designaton:this.userRec.value.designaton ?? '',
      isEdit: this.userRec.value.isEdit,
    }
  }

  errmsg:boolean = false;
  onSubmit(){
    if(this.userRec.invalid){
      this.errmsg = true;
      return alert("Form incomplete");
    }
    let model = this.model();
    this._docBuildServ.setPermission(model, this.isUserId).subscribe(res=>{
      if(res.state){
        alert("Set successfully");
        this.ngOnInit()
      }else{
        alert(res.message);
        this.ngOnInit()

      }
    })
  }

  clear(){
    this.ngOnInit()
  }
  
}
