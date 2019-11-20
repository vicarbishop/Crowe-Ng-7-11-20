import { Injectable } from '@angular/core';

export class StartSOAPRequest {
    
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;

    copyFormData(sdata: any) {
        this.firstName = sdata.firstName;
        this.lastName = sdata.lastName;
        this.address = sdata.address;
        this.city = sdata.city;
        this.state = sdata.state;
        this.zip = sdata.zip;
        this.email = sdata.email;
        console.log('infoForm copyFormData sends this to SERVER <' + JSON.stringify(this) + '>' );
    } // end of copyFormData method
 
}