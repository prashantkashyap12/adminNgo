import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  formModel!:FormGroup;
  fileData: any;
  onFileChange(event: any) {
    let data = event.target.files[0];
    this.fileData = data;
  }

  constructor(private _fb:FormBuilder, private _http:HttpClient) {
    // Initialize the form model here if needed
    this.formModel = new FormGroup({});
  }
  ngOnInit(){
    this.formModel = this._fb.group({
      file: [null, Validators.required]
    });
  }

  onSubmit() {
    if(true){ 
      const model = new FormData();
      // Append the file data to the FormData object
      model.append('file', this.fileData);  
      model.append('folder', '');

      this._http.post("http://localhost:5181/TestFile", model).subscribe({
        next: (res) => {
          console.log("File uploaded successfully", res);
        },
        error: (err) => {
          console.error("Error uploading file", err);
        }
      }); 
    }
  }


}
