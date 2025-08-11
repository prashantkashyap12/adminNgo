import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { CommonService } from '../../common.service';
import { CommonModule } from '@angular/common';
import { UsePanelService } from '../../UserPanel/service/user-panel.service';
import { url } from '../../interface/api_config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  providers: [UsePanelService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // formModel!:FormGroup;
  // fileData: any;
  todayDate = new Date();
  authName:any;
  eventAll_Rec:any
  // onFileChange(event: any) {
  //   let data = event.target.files[0];
  //   this.fileData = data;
  // }

  public baseUrl = new url().value; // Update with your actual base URL
  constructor(private _fb:FormBuilder, private _http:HttpClient, private _comm:CommonService,
    private _usrcommon:UsePanelService, private _router: Router) {
    // Initialize the form model here if needed
    // this.formModel = new FormGroup({});
  }
  ngOnInit(){
    // this.formModel = this._fb.group({
    //   file: [null, Validators.required]
    // });
    this._comm.dashUser.subscribe(res=>this.authName=res);
    this.eventAll();
  }

  eventAll(){
    let userId:string = sessionStorage.getItem('userId') as string;
    this._usrcommon.getEvent(userId?.toString()).subscribe(res=>{
      this.eventAll_Rec = res.record;
      console.log(this.eventAll_Rec)
    })
  }


  navigateToEvent(){
    this._router.navigate(['/UpcommingEvent']);
  }
  // onSubmit() {
  //   if(true){ 
  //     const model = new FormData();
  //     // Append the file data to the FormData object
  //     model.append('file', this.fileData);  
  //     model.append('folder', '');
  //     this._http.post("http://localhost:5181/TestFile", model).subscribe({
  //       next: (res) => {
  //         console.log("File uploaded successfully", res);
  //       },
  //       error: (err) => {
  //         console.error("Error uploading file", err);
  //       }
  //     }); 
  //   }
  // }


}
