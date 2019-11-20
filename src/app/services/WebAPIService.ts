import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Constants } from 'src/app/model/constants';
import { ErrorResponse } from 'src/app/model/error-response';
import { StartSOAPRequest } from 'src/app/model/startSoapRequest';
import { StartSOAPResponse } from 'src/app/model/startSoapResponse';
import { Contact, ContactAdapter } from 'src/app/model/contact';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WebAPIService {

  constructor(
      private http: HttpClient,
      private contactAdapter : ContactAdapter,
    ) { }

    ////////////////////////////////////////////////////////////////////////////////////////
    // startSOAPService
    // send the SOAP request to the backend, the server api is './api/startSOAPRequest'
    startSOAPService(startRequest: StartSOAPRequest): Observable<StartSOAPResponse> {
        const url = `${Constants.URL_START_SOAP_SERVICE}`;            
        console.log('Just constructed start online SOAP service '); 
        return this.http.post<StartSOAPResponse>(url, startRequest, httpOptions)
           .pipe(
              tap((tmpResponse: StartSOAPResponse) => console.log(`created contact=${tmpResponse.returnCode}`)),
              catchError(this.errorHandler)
           );
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // retrieve the contact by email address, REST API 
    async getContact(email: string): Promise<Contact> {
        const url = `${Constants.URL_GET_CONTACT}/${email}`;
        let contact: Contact = await this.http.get<Contact>(url).toPromise();
        console.log('Contact details retrieved');
        let result: Contact = this.contactAdapter.restToForm(contact);
        console.log('result after conversion ' + result);
        return result;
    }

    errorHandler(error: ErrorResponse) {
        return throwError(error.message || 'Server Error');
    }
}