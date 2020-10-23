import { IRequestApprovalItem, RaisedBy } from "./IRequestApprovalItem";
import { IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { IDropdownOption } from "@fluentui/react";


export interface RequestApprovalState{
    isLoading:boolean;
    // items: IRequestApprovalItem[];
    Department: IPickerTerms;
    RaisedBy:RaisedBy[];
    Company:IDropdownOption[];
    CompleteBy:any;
    MobileCostEstimate:string;
    MobileCostCurrency:IDropdownOption[];
    MobileBusinessJustification:string;
    MobileComments:string;
    AgreeMobilePolicy:boolean;
};
