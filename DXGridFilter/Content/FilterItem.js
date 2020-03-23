class FilterItem {

    constructor(dataGridColumn, input, input2, checkBox, filterFind) {
        this.column = dataGridColumn;
        this.Input = input;
        this.Input2 = input2;
        if (this.Input !== null) {
            this.Input.Tag = this;
            this.Input.onchange = this.ValueChanged;
            this.Input.onkeyup = this.ValueChanged;
        }
        if (this.Input2 !== null) {
            this.Input2.onchange = this.ValueChanged;
            this.Input2.Tag = this;
        }
        this.CheckBox = checkBox;
        if (this.CheckBox !== null) {
            this.CheckBox.onchange = this.CheckedChanged;
            this.CheckBox.Tag = this;
        }
        this.FilterFind = filterFind;//function FilterFind colls by press Enter
    }

    ApplayFilter(collectiveFilter) {
        var val = '';
        if (checkBox == null || checkBox.checked) {

            val = this.Input.value;

            switch (this.column.filterType) {
                case "between":
                    switch (this.column.dataType) {
                        case 'string': { throw "notInplemented"; } break;
                        case 'number':
                        case 'date':
                            {
                                if (this.Input2 !== null) {
                                    var val2 = this.Input2.value;
                                    return FilterHelper.GetFilterBetween(collectiveFilter, this.column.dataField, this.column.dataType, val, val2);
                                }
                            }
                            break;
                    }

                    break;
                case "listbox":

                    val = "";
                    for (var i = 0; i < this.Input.selectedOptions.length; i++) {
                        if (val.length > 0) val += ',';
                        val += this.Input.selectedOptions[i].value;
                    }

                    return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);

                    break;

                default:

                    switch (this.column.dataType) {
                        case 'number':
                            {
                                return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
                            }
                            break;
                        case 'string':
                            {
                                return FilterHelper.GetFilterContainsFromText(collectiveFilter,
                                    this.column.dataField,
                                    val,
                                    "like");
                            }
                            break;
                        case 'date':
                            {
                                throw "notInplemented";
                            }
                            break;
                    }
            }
        }
        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
    }

    SetSetting(setting) {

        this.CheckBox.checked = setting.checkBox;
        this.Input.value = setting.value;
        if (this.Input2 !== null) {
            this.Input2.value = setting.value2;
        }


        switch (this.column.filterType) {
            case "listbox":
                console.log(setting.value);
                var arr = setting.value.split(',');
                for (var i = 0; i < arr.length; i++) {
                    for (var o = 0; o < this.Input.options.length; o++) {
                        var option = this.Input.options[o];

                        if (option.value == arr[i]) {
                            option.selected = true;
                        }
                    }
                }

                break;
        }
    }

    GetSetting() {

        let val = this.Input.value;
        let val2 = null;
        if (this.Input2 !== null) {
            val2 = this.Input2.value;
        }
        switch (this.column.filterType) {
            case "listbox":
                val = "";
                for (var i = 0; i < this.Input.selectedOptions.length; i++) {
                    if (val.length > 0) val += ',';
                    val += this.Input.selectedOptions[i].value;
                }
                break;
        }
        return { checkBox: this.CheckBox.checked, value: val, value2: val2 };

    }


    //called from OUTside 
    //change CheckBox value depending on the InputBox.value  
    ChangeChecked() {

        filterField = this;

        if (filterField.Input.value === "") {
            filterField.CheckBox.checked = false;

        } else {
            filterField.CheckBox.checked = true;


        }
    }

    //called from out side 
    //change CheckBox value depending on the InputBox.value  
    CheckedChanged() {

        var filterField = this.Tag;


        if (!filterField.CheckBox.checked) {

            filterField.Input.classList.add("greyBackground");
            if (filterField.Input2 != null) {
                filterField.Input2.classList.add("greyBackground");
            }

        } else {
            filterField.Input.classList.remove("greyBackground");
            if (filterField.Input2 != null) {
                filterField.Input2.classList.remove("greyBackground");
            }

        }
    }
    //called from InputBox 
    //change CheckBox value depending on the InputBox.value 
    ValueChanged(e) {

        if (e.keyCode === 13) {
            FilterFind();
        }

        if (this.value === "") {
            this.Tag.CheckBox.checked = false;
            this.Tag.Input.classList.add("greyBackground");
            if (this.Tag.Input2 != null) {
                this.Input2.Tag.classList.add("greyBackground");
            }
        } else {
            this.Tag.CheckBox.checked = true;
            this.Tag.Input.classList.remove("greyBackground");
            if (this.Tag.Input2 != null) {
                this.Tag.Input2.classList.remove("greyBackground");
            }
        }
    }


}

class DevexpressCheckBoxFilterItem extends FilterItem {

    constructor(dataGridColumn, checkBox, filterFind) {
        super(dataGridColumn, null, null, null, filterFind);
        this.CheckBox = checkBox;
    }
  
ApplayFilter(collectiveFilter) {
  let val='0';
        var value = this.CheckBox.GetCheckState() === "Checked";
        if (value) val = '1';

        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
    }
}

class DevexpressDateFilterItem extends FilterItem {

    constructor(dataGridColumn, dateEditForm, dateEditTo, filterFind) {
        super(dataGridColumn, null, null, null, filterFind);
        this.DateEditForm = dateEditForm;
        this.DateEditTo = dateEditTo;
    }
  
  ApplayFilter(collectiveFilter) {

      var value = dateCondition(this.DateEditForm.GetDate());
    
      var value2 = dateCondition(this.DateEditTo.GetDate());



      return FilterHelper.GetFilterBetween(collectiveFilter, this.column.dataField, this.column.dataType, value, value2);

      function dateCondition(searchedDate) {
          if (searchedDate!=null  ) {
              return dateFormat(searchedDate, "yyyy-mm-dd");
          } else return "";
      }
    }

  GetSetting() {

      var value = dateCondition(this.DateEditForm.GetDate());

      var value2 = dateCondition(this.DateEditTo.GetDate());


      return { checkBox: true, value: value, value2: value2 };
    

      function dateCondition(searchedDate) {
          if (searchedDate != null) {
              return dateFormat(searchedDate, "yyyy-mm-dd");
          } else return "";
      }


  }


  SetSetting(setting) {

      let d = new Date(setting.value);
      this.DateEditForm.SetDate(d);
      let d2 = new Date(setting.value2);
      this.DateEditTo.SetDate(d2);
  }

}