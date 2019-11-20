import { Injectable } from '@angular/core';
import { Rest2Form } from 'src/app/model/adapter';

export class StartSOAPResponse {
    returnMessage: string;
    returnCode: number;
}

@Injectable({
    providedIn: 'root'
})
export class StartSOAPResponseAdapter implements Rest2Form<StartSOAPResponse> {

    restToForm(item: any): StartSOAPResponse {
        let result = new StartSOAPResponse();
        result.returnMessage = item.returnMessage;
        result.returnCode = item.returnCode;
        return result;
    }
}