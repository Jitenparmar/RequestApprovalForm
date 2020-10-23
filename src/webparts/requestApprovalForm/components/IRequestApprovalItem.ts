export interface IRequestApprovalItem{
    Title:string;
    RaisedBy:RaisedBy[];
    Company:any[];
    Department:any[];
    CompleteBy:Date;
    MobileCostEstimate:string;
    MobileCostCurrency:any[];
    MobileBusinessJustification:string;
    MobileComments:string;
    AgreeMobilePolicy:any[];
}

export interface RaisedBy{
    UserId:number;
}
