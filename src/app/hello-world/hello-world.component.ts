import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, tap, first, skipUntil } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WebAPIService } from 'src/app/services/WebAPIService';
import { Global } from 'src/app/model/global';
import { StartSOAPRequest } from 'src/app/model/startSoapRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.css']
})
export class HelloWorldComponent implements OnInit {

  bToggleInformation: boolean = false;
  bIsSoap:boolean = false;
  bIsREST:boolean = false;
  infoForm: FormGroup;
  emailForm: FormGroup;
  contactGet: any;
  contactAdd: any;

  constructor(
    private webApiService: WebAPIService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("Hellow World...in ngOnInit");
    this.bToggleInformation = false;
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required]
    }); 
    this.infoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      email: ['', Validators.required]
    });
    
    this.infoForm.get('lastName').setValue(Global.LastName);
    this.infoForm.get('address').setValue(Global.Address);
    this.infoForm.get('city').setValue(Global.City);
    this.infoForm.get('state').setValue(Global.State);
    this.infoForm.get('zip').setValue(Global.Zip);
    this.infoForm.get('email').setValue(Global.Email);
    this.infoForm.get('firstName').setValue(Global.FirstName);

    this.emailForm.get('email').setValue(Global.Email);
  }

  private btnClick(){
    console.log("Hellow World...in btnClick"); 
    this.bToggleInformation = !this.bToggleInformation;
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // makeRESTWebApiCall
  // HTTP GET API call for an example. This will call an 
  // API on backend. The flexibility is using HTTP to call server which would have some
  // kind of message hub/service to fetch the data
  // Fetch the contact based on email and patch the form values with returned value.
  makeRESTWebApiCall(enable: boolean){
    console.log("Hellow World...in makeRESTWebApiCall");
    this.contactGet = JSON.stringify(this.emailForm.value);
    if( enable ){
      this.bIsREST = false;
      let email = this.emailForm.get('email').value();
      this.webApiService.getContact(email).then(
        data => {
            this.infoForm.patchValue(data);
            Swal.fire({
              title: 'Success',
              text: 'Contact fetched successfully.',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Fetch Contact error!',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
      );
    }else{
      console.log('REST API is not enabled!');
      Swal.fire({
        title: 'Error!',
        text: 'REST API not active!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.bIsREST = true;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // makeSOAPWebApiCall
  // Psuedo SOAP, making an HTTP POST API REST call for an example. This will call an 
  // API on backend. The flexibility is using HTTP to call server which would have some
  // kind of message hub/service to save the data, and in this case handle translation
  // for any kind of SOAP package
  makeSOAPWebApiCall(enable: boolean){
    console.log("Hellow World...in makeSOAPWebApiCall");
    this.contactAdd = JSON.stringify(this.infoForm.value);
    if( enable ){
      this.bIsSoap = false;
      let SSRequest = new StartSOAPRequest();
      SSRequest.copyFormData(this.infoForm.value);
      this.webApiService.startSOAPService(SSRequest)
            .pipe(first())
              .subscribe(
                socresponse => {
                console.log('New SOAP response ' + socresponse.returnMessage + ' returned ');             
                },
                error => {
                  console.log(error);
        });	
    }else{
      console.log('SOAP is not enabled!');
      Swal.fire({
        title: 'Error!',
        text: 'SOAP API not active!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      this.bIsSoap = true;
    }
  }

}
