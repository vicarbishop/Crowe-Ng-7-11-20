import { Injectable } from '@angular/core';
import { Rest2Form } from 'src/app/model/adapter';

export class Contact {
    id: number;
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

@Injectable({
    providedIn: 'root'
})
export class ContactAdapter implements Rest2Form<Contact> {

    restToForm(item: any): Contact {
        let result = new Contact();
        result.id = item.id;
	    result.firstName = item.firstName;
	    result.lastName = item.lastName;
	    result.address = item.address;
	    result.city = item.city;
	    result.state = item.state;
	    result.zip = item.zip;
	    result.email = item.email;
        return result;
    }
}
