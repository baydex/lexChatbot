import { Message } from "./Message";

export interface DialogElicitAction {
    type: string;
    intentName: string;    
    slots:any,
    slotToElicit: string,
    message: Message;
}

export interface DialogDelegateAction {
    sessionState: SessionState;
}

export interface SessionState{
    activeContext: any;
    intent:any, 
    sessionAttributes: any, 
    dialogAction: {
        type: "Delegate"
    }
}

  

