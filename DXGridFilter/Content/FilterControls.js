
//объект который содержит данные об одном элементе фильтра
function FilterField(dataGridColumn, input, input2, checkBox, condition = '=') {
    this.column = dataGridColumn;
    // this.DataField = dataGridColumn.dataField;
    // this.DataType = dataGridColumn.dataType;
    this.Condition = condition;
    this.Input = input;
    this.Input2 = input2;
    this.Input.Tag = this;
    this.Input.onchange = ValueChanged;
    this.Input.onkeyup = ValueChanged;
    if (this.Input2 !== null) {
        this.Input2.onchange = ValueChanged;
        this.Input2.Tag = this;
    }
    this.CheckBox = checkBox;
    this.CheckBox.onchange = CheckedChanged;
    this.CheckBox.Tag = this;
    this.ApplayFilter = ApplayFilter;//function применить фильтр
    this.ChangeChecked = ChangeChecked;//function снять галочку

    function ApplayFilter(collectiveFilter) {
        var val = '';
        if (checkBox.checked) {

            val = this.Input.value;
            switch (this.column.dataType) {
                case 'number':
                    {
                        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
                    }
                    break;
                case 'string':
                    {
                        return FilterHelper.GetFilterContainsFromText(collectiveFilter, this.column.dataField, val, "like");
                    }
                    break;
                case 'date':
                    {
                        if (this.Input2 !== null) {
                            var val2 = this.Input2.value;
                            return FilterHelper.GetFilterBetween(collectiveFilter, this.column.dataField, val, val2);
                        }
                    }
                    break;

            }
        }
        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
    }

    //called from OUTside 
    //change CheckBox value depending on the InputBox.value  
    function ChangeChecked() {

            filterField = this;

        if (filterField.Input.value === "") {
            filterField.CheckBox.checked = false;

        } else {
            filterField.CheckBox.checked = true;
          

        }
    }

    //called from OUTside 
    //change CheckBox value depending on the InputBox.value  
    function CheckedChanged() {

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
    function ValueChanged(e) {
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

function FilterElements(datagrid, fe) {

    this.dataGrid = datagrid;
    this.filtElem = fe;
    this.CreateFilter = CreateFilter;
    this.ClearFilter = ClearFilter;
    this.FilterFind = FilterFind;

    //массив элементов фильтра
    this.FilterElementsArray = new Array();

    //Функция создания фильтра
    function CreateFilter(columns) {
        this.filtElem.childNodes.length = 0;

        const table = document.createElement('table');
        table.setAttribute('border', '1');
        this.filtElem.appendChild(table);

        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];

            if (!column.filter) {
                continue;
            }
            row = document.createElement('tr');
            table.appendChild(row);

            var text = column.caption;
            if (!text) {
                text = column.dataField;
            }
            //label
            textnode = document.createTextNode(text);

            //create  checkbox
            var checkBox = document.createElement("input");
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('id', column.dataField + 'Checkbox');
            //input
            var input = document.createElement("input");
            var input2 = null;
            input.setAttribute('id', column.dataField + 'Input');

            input.classList.add("greyBackground");

            if (column.dataType == 'date') {
                input.setAttribute('type', 'date');

                if (column.filterType == "between") {
                    input2 = document.createElement("input");
                    input2.setAttribute('type', 'date');
                    input2.classList.add("greyBackground");
                }
            }

            if (column.filterType && column.filterType == 'ComboBox') {
                input = document.createElement("select");
                for (var f = 0; f < column.avaiableFields.length; f++) {
                    var option = document.createElement("option");
                    option.text = column.avaiableFields[f];
                    input.add(option);
                }

            }
            field = new FilterField(column, input, input2, checkBox);

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
                createTableCell(row, div);
            }
            else {
                input.setAttribute('style', "width: 100%");
                createTableCell(row, input);
            }
            //this.FilterElementsArray.push({ DataField: column.dataField, DataType: column.dataType, Input: input, Check: checkBox });
        }
        row = document.createElement('tr');

        table.appendChild(row);
        findButton = document.createElement("button");
        findButton.setAttribute('onclick', 'FilterFind()');
        findButton.setAttribute('style', 'align: right;');
        findButton.textContent = 'Найти';
        findButton.setAttribute('id', 'findButton');
        createTableCell(row);// create 2 empty cell
        createTableCell(row);
        var td = createTableCell(row, findButton);//put button in 3 cell
        td.setAttribute('align', "right");
        function createTableCell(row, el, rowspan = null) {
            var td = document.createElement("td");

            if (el !== null) {
                try {
                    td.appendChild(el);
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (rowspan !== null) { td.setAttribute('rowspan', rowspan); }
            row.appendChild(td);
            return td;
        }
    }

    function ClearFilter() {
        for (i = 0; i < this.FilterElementsArray.length; i++) {
            this.FilterElementsArray[i].Input.value = "";
            this.FilterElementsArray[i].ChangeChecked();
        }
    }

    //Find by Filter
    function FilterFind() {
        collectiveFilter = this.dataGrid.cpFilterExpression;
        for (i = 0; i < this.FilterElementsArray.length; i++) {
            collectiveFilter = this.FilterElementsArray[i].ApplayFilter(collectiveFilter);
        }

        this.dataGrid.PerformCallback({ filterExpression: collectiveFilter });;
    }

}
