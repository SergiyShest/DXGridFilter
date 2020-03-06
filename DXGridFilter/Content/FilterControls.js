
//объект который содержит данные о гриде
function FilterField(dataGridColumn, input, checkBox, condition = '=') {
    this.column = dataGridColumn;
   // this.DataField = dataGridColumn.dataField;
   // this.DataType = dataGridColumn.dataType;
    this.Condition = condition;
    this.Input = input;
    this.Input.Tag = this;
    this.Input.onkeyup = ValueChanged;
    this.CheckBox = checkBox;
    this.CheckBox.Tag = this;
    this.ApplayFilter = ApplayFilter;//function применить фильтр
    this.ChangeChecked = ChangeChecked;//function изменилась галочка
    function ApplayFilter(collectiveFilter) {
        var val='';
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
                      return FilterHelper.GetFilterContainsFromText(collectiveFilter,this.column.dataField, val, "like");
                  }
              break;
            }
        }
        return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter)
    }

    //called from OUTside 
    //change CheckBox value depending on the InputBox.value  
    function ChangeChecked() {
        if (this.Input.value === "") {
            this.CheckBox.checked = false;
        } else {
            this.CheckBox.checked = true;
        }
    }
    //called from InputBox 
    //change CheckBox value depending on the InputBox.value 
    function ValueChanged(e) {
        if (this.value === "") {
            this.Tag.CheckBox.checked = false;
        } else {
            this.Tag.CheckBox.checked = true;
        }
    }

}

function FilterElements(datagrid, fe) {

    this.dataGrid = datagrid;
    this.filtElem = fe;
    this.CreateFilter = CreateFilter;
    this.ClearFilter  = ClearFilter;
    this.FilterFind = FilterFind;

    //массив элементов фильтра
    this.FilterElementsArray = new Array();
   
    //Функция создания фильтра
    function CreateFilter(columns) {
        this.filtElem.childNodes.length = 0;

        const table = document.createElement('table');
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
            checkBox = document.createElement("input");
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('id', column.dataField+'Checkbox');
            //input
            input = document.createElement("input")
            input.setAttribute('id', column.dataField+'Input');
            if (column.filterType && column.filterType == 'ComboBox') {
                input = document.createElement("select")
                for(var f=0; f<column.avaiableFields.length;f++){
                var option = document.createElement("option");
                option.text = column.avaiableFields[f];
                input.add(option);
            }

            }
            field = new FilterField(column, input, checkBox);

            this.FilterElementsArray.push(field);
            createTableCell(row, textnode);
            createTableCell(row, checkBox);
            createTableCell(row, input);
            //this.FilterElementsArray.push({ DataField: column.dataField, DataType: column.dataType, Input: input, Check: checkBox });
        }
        row = document.createElement('tr');

        table.appendChild(row);
        findButton = document.createElement("button");
        findButton.setAttribute('onclick', 'FilterFind()');
        findButton.setAttribute('class', 'float-right');
        findButton.textContent = 'Найти';
        findButton.setAttribute('id', 'findButton');
        createTableCell(row);// create 2 empty cell
        createTableCell(row);
        createTableCell(row, findButton);//put button in 3 cell

          function createTableCell(row, el) {
            td = document.createElement("td");
            if (el != null) { td.appendChild(el); }
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
            collectiveFilter=   this.FilterElementsArray[i].ApplayFilter(collectiveFilter);
        }
        
        this.dataGrid.PerformCallback({ filterExpression: collectiveFilter });;
    }

}
