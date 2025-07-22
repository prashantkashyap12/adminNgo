import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { url } from '../../interface/api_config';
import { TeamService } from '../service/team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule, AutocompleteLibModule],
  providers:[TeamService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  loader:any =false
  constructor(private _fb:FormBuilder, private _teamSer:TeamService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }
    private baseUrl = new url().value;
    TeamForm!:FormGroup;
    keyword="Name";
    data:any = [  ]
    showList:boolean = true;
    updateAct:boolean = true;
    imagePreview:any = null;
    TeamTrn:any;
  
    // autoComplete 

    Init(){
     this.TeamForm = this._fb.group({
      imgPath: ['', [Validators.required]],
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
     })
    }


    selectEvent(data:any){
      this.updateAct =false;
      this.TeamTrn = data?.TeamTran;
      this.imagePreview = this.baseUrl + data?.ImgPath;
      this.TeamForm.patchValue({
        name: data.Name,
        position:data.Position,
        imgPath : this.imagePreview
      })
    }
    
    IfromFile:any
    fileUpdate(file:any){
      if(file.target.files.length==1){
        this.IfromFile = file.target.files[0]; 
      }
    }
  
    onSubmit(){
      this.loader  = true
      let fromds= new FormData();
      fromds.append('imgPath', this.IfromFile as File);
      fromds.append('position', this.TeamForm.value.position);
      fromds.append('name', this.TeamForm.get('name')?.value);
      if(this.updateAct){
        this._teamSer.AddTeam(fromds).then(res=>{
          if(res.state){
            this.fresh();
            alert("Record added");
            this.loader  = false
          }
        })
      }else{
        fromds.append('TeamTran',this.TeamTrn);
        this._teamSer.updateTeam(fromds).then(res=>{
          if(res.status){
            this.fresh();
            alert("Record updated");
            this.loader  = false
          }
        })

      }
      
    }
    delet(){
      this.loader  = true
      this._teamSer.DeleteTeam(this.TeamTrn).then(res=>{
        if(res.status){
          this.fresh();
          alert("Data Has been deleted");
          this.loader  = false
        }
      })
    }

    allot(){
      this._teamSer.getTeam().subscribe(res=>{
        this.data = res.res
      })
    }
    fresh(){
      this.allot()
      this.updateAct =true;
      this.IfromFile = null
      this.Init();
      this.imagePreview = null
    }
  

}
