import * as React from 'react';
import { TextField, IDropdownOption, DropdownMenuItemType, Dropdown, PrimaryButton, Spinner, SpinnerSize, Modal, IDragOptions, ContextualMenu, IIconProps, getTheme, FontWeights, mergeStyleSets } from "@fluentui/react";
import { ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Checkbox } from '@fluentui/react-checkbox';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/controls/PeoplePicker";
import styles from './RequestApprovalForm.module.scss';
import { IRequestApprovalFormProps } from './IRequestApprovalFormProps';
import { RaisedBy } from './IRequestApprovalItem'
import { IRequestApprovalItem } from './IRequestApprovalItem';
import { RequestApprovalState } from './IRequestApprovalFormState'
import { escape } from '@microsoft/sp-lodash-subset';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { DateTimePicker, DateConvention, TimeConvention, TimeDisplayControlType } from '@pnp/spfx-controls-react/lib/dateTimePicker';

const companyoptions: IDropdownOption[] = [
  { key: 'PITL', text: 'PITL' },
  { key: 'Company1', text: 'Company1' },
  { key: 'NewCompany', text: 'NewCompany' }
];

const currencyoptions: IDropdownOption[] = [
  { key: 'USD', text: 'USD' },
  { key: 'INR', text: 'INR' },
  { key: 'EUR', text: 'EUR' }
];

let RequestApprovalFormItem: IRequestApprovalItem[] = [];
let Users: RaisedBy[] = [];

const theme = getTheme();

// const DateFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };
const DateFieldStyles = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    width: "50%"
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLargePlus,
    {
      flex: '1 1 auto',
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

export default class RequestApprovalForm extends React.Component<IRequestApprovalFormProps, RequestApprovalState, {}> {

  private _requestApprovalForm: IRequestApprovalItem[];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      RaisedBy: [],
      Company: [],
      Department: [],
      CompleteBy: new Date,
      MobileCostEstimate: '',
      MobileCostCurrency: [],
      MobileBusinessJustification: '',
      MobileComments: '',
      AgreeMobilePolicy: false
    };
  }


  private _getPeoplePickerItems(items: any[]) {
    Users = [];
    if (items.length > 0) {
      items.forEach(element => {
        Users.push(element.id);
      });
      this.setState({
        RaisedBy: Users
      });
    }
  }

  public handleDateChange = (date: any) => {
    alert(date);
    this.setState({ CompleteBy: date });
 }

  public _btnSaveClicked():void {
    // RequestApprovalFormItem = [];
    // RequestApprovalFormItem.push({
    //     RaisedBy : this.state.RaisedBy,
    //     Company: this.state.Company,
    //     Department:this.state.Department,
    //     CompleteBy : this.state.CompleteBy,
    //     MobileCostEstimate : this.state.MobileCostEstimate,
    //     MobileCostCurrency : this.state.MobileCostCurrency,
    //     MobileBusinessJustification : this.state.MobileBusinessJustification,
    //     MobileComments:this.state.MobileComments,
    //     AgreeMobilePolicy:this.state.AgreeMobilePolicy
    // });
  }
  private onTaxPickerChange(terms: IPickerTerms) {
    console.log("Terms", terms);
  }

  public render(): React.ReactElement<IRequestApprovalFormProps> {
    return (
      <div className={styles.column}>
        <label>New Request</label>
        <PeoplePicker
          context={this.props.context}
          titleText="Raised By"
          personSelectionLimit={3}
          groupName={""} // Leave this blank in case you want to filter from all users
          showtooltip={true}
          ensureUser={true}
          // selectedItems={this._getPeoplePickerItems.bind(this)}
          principalTypes={[PrincipalType.User]}
          resolveDelay={1000}>
        </PeoplePicker>
        <Dropdown
          placeholder="Select an option"
          label="Company"
          id="ddlcompany"
          // onChange={(event, value) => this.setState({ Company: value.text })}
          options={companyoptions}>
        </Dropdown>
        <TaxonomyPicker allowMultipleSelections={true}
          termsetNameOrID="Job Title"
          panelTitle="Select Term"
          label="Department or Team"
          context={this.props.context}
          onChange={this.onTaxPickerChange}
          isTermSetSelectable={false} />
        <DateTimePicker label="Complete By"
          dateConvention={DateConvention.DateTime}
          timeConvention={TimeConvention.Hours24}
          showLabels={false}

          value={this.state.CompleteBy}
          onChange={this.handleDateChange}/>
          <TextField
              label="Mobile Cost Estimate"
              onChange={(event, value)=>this.setState({MobileCostEstimate:value})}>
          </TextField>
        <Dropdown
          placeHolder='Select an option'
          label="Mobile Cost Currency"
          id="ddlDepartment"
          // onChange={(event, value) => this.setState({ MobileCostCurrency: value.text })}
          options={currencyoptions}>
        </Dropdown>
        <TextField
            label="Mobile Business Justification"
            onChange={(event, value)=>this.setState({MobileBusinessJustification:value})}
            multiline>
        </TextField>
        <TextField
            label="Mobile Comments"
            onChange={(event, value)=>this.setState({MobileComments:value})}
            multiline>
        </TextField>
        <Checkbox label="Agree Mobile Policy" />

        <PrimaryButton style={{ marginTop: 10 }} text="Save" onClick={() => this._btnSaveClicked()} />
      </div>
    );
  }
}
