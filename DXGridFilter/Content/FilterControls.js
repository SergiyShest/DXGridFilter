
////объект который содержит данные об одном элементе фильтра
//function FilterField(dataGridColumn, input, input2, checkBox, filterFind) {
//    this.column = dataGridColumn;
//    this.Input = input;
//    this.Input2 = input2;
//    if (this.Input !== null) {
//        this.Input.Tag = this;
//        this.Input.onchange = ValueChanged;
//        this.Input.onkeyup = ValueChanged;
//    }
//    if (this.Input2 !== null) {
//        this.Input2.onchange = ValueChanged;
//        this.Input2.Tag = this;
//    }
//    this.CheckBox = checkBox;
//    if (this.CheckBox !== null) {
//    this.CheckBox.onchange = CheckedChanged;
//    this.CheckBox.Tag = this;
//    }
//    this.ApplayFilter = applayFilter;//function применить фильтр
//    this.GetSetting = getSetting;//function получить значение фильтра
//    this.SetSetting = setSetting;//function установить значение фильтра
//    this.ChangeChecked = ChangeChecked;//function снять галочку
//    this.FilterFind = filterFind;//function FilterFind colls by press Enter

//    function applayFilter(collectiveFilter) {
//        var val = '';
//        if (checkBox==null || checkBox.checked) {

//            val = this.Input.value;   

//            switch (this.column.filterType) {
//                case "between":
//                    switch (this.column.dataType) {
//                        case 'string': { throw "notInplemented"; } break;
//                        case 'number':
//                        case 'date':
//                            {
//                                if (this.Input2 !== null) {
//                                    var val2 = this.Input2.value;
//                                    return FilterHelper.GetFilterBetween(collectiveFilter, this.column.dataField, this.column.dataType, val, val2);
//                                }
//                            }
//                            break;
//                    }

//                    break;
//                case "listbox":

//                    val = "";
//                    for (var i = 0; i < this.Input.selectedOptions.length; i++) {
//                        if (val.length > 0) val += ',';
//                        val += this.Input.selectedOptions[i].value;
//                    }

//                    return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);

//                    break;

//                default:

//                    switch (this.column.dataType) {
//                        case 'number':
//                            {
//                                return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
//                            }
//                            break;
//                        case 'string':
//                            {
//                                return FilterHelper.GetFilterContainsFromText(collectiveFilter,
//                                    this.column.dataField,
//                                    val,
//                                    "like");
//                            }
//                            break;
//                        case 'date':
//                            {
//                                throw "notInplemented";
//                            }
//                            break;
//                    }
//            }
//        }
//        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
//    }

//    function setSetting(setting) {

//        this.CheckBox.checked = setting.checkBox;
//        this.Input.value = setting.value;
//        if (this.Input2 !== null) {
//            this.Input2.value = setting.value2;
//        }


//        switch (this.column.filterType) {
//            case "listbox":
//                console.log(setting.value);
//                var arr = setting.value.split(',');
//                for (var i = 0; i < arr.length; i++) {
//                    for (var o = 0; o < this.Input.options.length; o++) {
//                        var option = this.Input.options[o];

//                        if (option.value == arr[i]) {
//                            option.selected = true;
//                        }
//                    }
//                }

//                break;
//        }
//    }

//    function getSetting() {

//        let val = this.Input.value;
//        let val2 = null;
//        if (this.Input2 !== null) {
//            val2 = this.Input2.value;
//        }
//        switch (this.column.filterType) {
//            case "listbox":
//                val = "";
//                for (var i = 0; i < this.Input.selectedOptions.length; i++) {
//                    if (val.length > 0) val += ',';
//                    val += this.Input.selectedOptions[i].value;
//                }
//                break;
//        }
//        return { checkBox: this.CheckBox.checked, value: val, value2: val2 };

//    }


//    //called from OUTside 
//    //change CheckBox value depending on the InputBox.value  
//    function ChangeChecked() {

//        filterField = this;

//        if (filterField.Input.value === "") {
//            filterField.CheckBox.checked = false;

//        } else {
//            filterField.CheckBox.checked = true;


//        }
//    }

//    //called from out side 
//    //change CheckBox value depending on the InputBox.value  
//    function CheckedChanged() {

//        var filterField = this.Tag;


//        if (!filterField.CheckBox.checked) {

//            filterField.Input.classList.add("greyBackground");
//            if (filterField.Input2 != null) {
//                filterField.Input2.classList.add("greyBackground");
//            }

//        } else {
//            filterField.Input.classList.remove("greyBackground");
//            if (filterField.Input2 != null) {
//                filterField.Input2.classList.remove("greyBackground");
//            }

//        }
//    }
//    //called from InputBox 
//    //change CheckBox value depending on the InputBox.value 
//    function ValueChanged(e) {

//        if (e.keyCode === 13) {
//            FilterFind();
//        }

//        if (this.value === "") {
//            this.Tag.CheckBox.checked = false;
//            this.Tag.Input.classList.add("greyBackground");
//            if (this.Tag.Input2 != null) {
//                this.Input2.Tag.classList.add("greyBackground");
//            }
//        } else {
//            this.Tag.CheckBox.checked = true;
//            this.Tag.Input.classList.remove("greyBackground");
//            if (this.Tag.Input2 != null) {
//                this.Tag.Input2.classList.remove("greyBackground");
//            }
//        }
//    }

//}

//function DevexpressCheckBoxFilterField(dataGridColumn, checkBox, filterFind) {

//    this.CheckBox = checkBox;
//    this.ApplayFilter = applayFilter;//function применить фильтр
//    FilterField.call(this, dataGridColumn, null, null, null, filterFind);
//function applayFilter(collectiveFilter) {
//        var value = CheckBox.GetCheckState() === "Checked";
//        if (value) val = '1';
                         
//        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
//    }
//}

//DevexpressCheckBoxFilterField.prototype = Object.create(FilterField.prototype);
////DevexpressCheckBoxFilterField.prototype.ApplayFilter = function (collectiveFilter) {
////        var value = CheckBox.GetCheckState() === "Checked";
////        if (value) val = '1';
                         
////        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
////    }

////limits input characters to numbers and commas
function OnlyNumberAndCommas(element, e) {
    if (element == null) return;
    //  console.log(e.keyCode);


    if (e.keyCode >= 48 && e.keyCode <= 57) //digits
    {
        return true;
    }
    if (e.keyCode == 188 || e.keyCode == 190)//dote comma 
    {
        return true;
    }
    if (e.keyCode == 46 || e.keyCode == 8) //back delete
    {
        return true;
    }
    return false;
}

class FilterElements {

    constructor (datagrid, fe) {
        this.FilterElementsArray = new Array(); //массив элементов фильтра
        this.dataGrid = datagrid;
        this.filtElem = fe;
    }



    AddDevexpressCheckBox(checkBox, dataField)
    {
        var column = {dataField: dataField,  dataType: "number" }
        var field = new DevexpressCheckBoxFilterItem(column, checkBox, FilterFind);

         this.FilterElementsArray.push(field);
    }

    AddDevexpressDate(dateFrom, dateTo, dataField) {
        var column = { dataField: dataField, dataType: "date", filterType: "between"}
        var field = new DevexpressDateFilterItem(column, dateFrom, dateTo, FilterFind);

        this.FilterElementsArray.push(field);
    }
    SaveSettings(settingName) {
        var settings = [];
        for (var i = 0; i < this.FilterElementsArray.length; i++) {
            var filterItem = this.FilterElementsArray[i];
            settings.push({ dataField: filterItem.column.dataField, value: filterItem.GetSetting() });

        }
        console.log(settings);
        var jsn = JSON.stringify(settings);
        console.log(jsn);
        localStorage.setItem(settingName, jsn);
    }

    ReadSettings(settingName) {
        console.log(this.FilterElementsArray);

        var jsn = localStorage.getItem(settingName, jsn);
        try {
            var settings = JSON.parse(jsn);
            for (let i = 0; i < settings.length; i++) {
                const setting = settings[i];
                for (let it = 0; it < this.FilterElementsArray.length; it++) 
                { 
                    const item = this.FilterElementsArray[it];
                   if(item.column.dataField==setting.dataField){
                      item.SetSetting(setting.value);
                      break;
                   }
                }
            }

        } catch (error) {
            alert(error);
        }


    }




    //Функция создания фильтра
    CreateFilter(columns) {
       // this.filtElem.childNodes.length = 0;

        const table = document.createElement('table');
        table.classList.add('filter');
        //       table.setAttribute('border', '1');
        this.filtElem.appendChild(table);

        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];

            if (!column.filter) {
                continue;
            }
         var   row = document.createElement('tr');
            row.classList.add('border_bottom');
            table.appendChild(row);

            var text = column.caption;
            if (!text) {
                text = column.dataField;
            }
            //label
          var  textnode = document.createTextNode(text);
            //create  checkbox
            var checkBox = document.createElement("input");
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('id', column.dataField + 'Checkbox');

            //input
            var input = document.createElement("input");
            input.classList.add("inputBase");
            var input2 = null;
            input.setAttribute('id', column.dataField + 'Input');
            input.classList.add("greyBackground");
            if (column.dataType == 'number') {
                input.onkeydown = OnlyNumberAndCommas();
                input.setAttribute('onkeydown', 'return OnlyNumberAndCommas(this, event)');
                if (column.filterType == "between") {
                    input.setAttribute('type', 'number');

                    input2 = document.createElement("input");
                    input2.setAttribute('id', column.dataField + 'Input2');
                    input2.setAttribute('type', 'number');
                    input2.classList.add("inputBase");
                    input2.classList.add("greyBackground");
                }
            }

            if (column.dataType == 'date') {
                input.setAttribute('type', 'date');
                if (column.filterType == "between") {
                    input2 = document.createElement("input");
                    input2.setAttribute('id', column.dataField + 'Input2');
                    input2.classList.add("inputBase");
                    input2.setAttribute('type', 'date');
                    input2.classList.add("greyBackground");
                }
            }
            if (column.filterType && (column.filterType == 'combobox' || column.filterType == 'listbox')) {
                input = document.createElement("select");
                input.setAttribute('id', column.dataField + '_' + column.filterType);
                input.classList.add("greyBackground");
                input.classList.add("inputBase");
                for (var f = 0; f < column.avaiableValues.length; f++) {
                    var option = document.createElement("option");
                    option.text = column.avaiableValues[f];
                    input.add(option);
                }
                if (column.filterType == 'listbox') {
                    input.setAttribute('multiple', true);
                }
            }
         var   field = new FilterItem(column, input, input2, checkBox, FilterFind);

            this.FilterElementsArray.push(field);
            createTableCell(row, textnode);
            createTableCell(row, checkBox);
            //  var td=  createTableCell(row, input,"3");
            if (input2 !== null) {
                var div = document.createElement("div");
                var from = document.createTextNode("от");

                div.appendChild(from);
                div.appendChild(input);
                var to = document.createTextNode("до");

                div.appendChild(to);
                div.appendChild(input2);
                createTableCell(row, div, column);
            }
            else {
                if (column.filterType == 'listbox' || column.filterType == 'combobox') {
                    input.setAttribute('style', "width: 99%");
                } else {
                    input.setAttribute('style', "width: 98%");
                }

                createTableCell(row, input, column);
            }
            //this.FilterElementsArray.push({ DataField: column.dataField, DataType: column.dataType, Input: input, Check: checkBox });
        }
        row = document.createElement('tr');

        table.appendChild(row);
       var findButton = document.createElement("button");
        findButton.setAttribute('onclick', 'FilterFind()');
        findButton.setAttribute('style', 'align: right;');
        findButton.textContent = 'Найти';
        findButton.setAttribute('id', 'findButton');
        createTableCell(row);// create 2 empty cell
        createTableCell(row);
        var td = createTableCell(row, findButton);//put button in 3 cell
        td.setAttribute('align', "right");
        function createTableCell(row, el = null, column = null, rowspan = null) {
            var td = document.createElement("td");
            td.setAttribute('style', 'padding:2px;');
            if (el !== null) {
                try {
                    td.appendChild(el);
                }
                catch (err) {
                    console.log(column);
                    console.error(err);
                }
            }
            if (rowspan !== null) { td.setAttribute('rowspan', rowspan); }
            row.appendChild(td);
            return td;
        }
    }

    //Функция создания фильтра
    SetOuterFilter(columns) {

        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];

            if (!column.filter) {
                continue;
            }

            var checkBox = document.getElementById(column.dataField + 'Checkbox');

            var input2 = null;
            var input = document.getElementById(column.dataField + 'Input');

            input2 = document.getElementById(column.dataField + 'Input2');
            if (input==null)
                input = document.getElementById(column.dataField + '_' + column.filterType);

            var field = new FilterItem(column, input, input2, checkBox, FilterFind);

            this.FilterElementsArray.push(field);

        }
    }


   ClearFilter() {
        for (i = 0; i < this.FilterElementsArray.length; i++) {
            this.FilterElementsArray[i].Input.value = "";
            this.FilterElementsArray[i].ChangeChecked();
        }
    }

    //Find by Filter
    FilterFind() {
       let collectiveFilter = this.dataGrid.cpFilterExpression;
        for (let i = 0; i < this.FilterElementsArray.length; i++) {
            collectiveFilter = this.FilterElementsArray[i].ApplayFilter(collectiveFilter);
        }

        this.dataGrid.PerformCallback({ filterExpression: collectiveFilter });;
    }

}
