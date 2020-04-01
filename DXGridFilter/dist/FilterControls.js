"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterElements = function () {
    function FilterElements(datagrid, fe) {
        _classCallCheck(this, FilterElements);

        this.FilterElementsArray = new Array(); //массив элементов фильтра
        this.dataGrid = datagrid;
        this.filtElem = fe;
    }

    _createClass(FilterElements, [{
        key: "AddDevexpressCheckBox",
        value: function AddDevexpressCheckBox(checkBox, dataField) {
            var column = { dataField: dataField, dataType: "number" };
            var field = new DevexpressCheckBoxFilterItem(column, checkBox, FilterFind);

            this.FilterElementsArray.push(field);
        }
    }, {
        key: "AddDevexpressDate",
        value: function AddDevexpressDate(dateFrom, dateTo, dataField) {
            var column = { dataField: dataField, dataType: "date", filterType: "between" };
            var field = new DevexpressDateFilterItem(column, dateFrom, dateTo, FilterFind);

            this.FilterElementsArray.push(field);
        }
    }, {
        key: "SaveSettings",
        value: function SaveSettings(settingName) {
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
    }, {
        key: "ReadSettings",
        value: function ReadSettings(settingName) {
            console.log(this.FilterElementsArray);

            var jsn = localStorage.getItem(settingName, jsn);
            try {
                var settings = JSON.parse(jsn);
                for (var _i = 0; _i < settings.length; _i++) {
                    var setting = settings[_i];
                    for (var it = 0; it < this.FilterElementsArray.length; it++) {
                        var item = this.FilterElementsArray[it];
                        if (item.column.dataField == setting.dataField) {
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

    }, {
        key: "CreateFilter",
        value: function CreateFilter(columns) {
            // this.filtElem.childNodes.length = 0;

            var table = document.createElement('table');
            table.classList.add('filter');
            //       table.setAttribute('border', '1');
            this.filtElem.appendChild(table);

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];

                if (!column.filter) {
                    continue;
                }
                var row = document.createElement('tr');
                row.classList.add('border_bottom');
                table.appendChild(row);

                var text = column.caption;
                if (!text) {
                    text = column.dataField;
                }
                //label
                var textnode = document.createTextNode(text);
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
                var field = new FilterItem(column, input, input2, checkBox, FilterFind);

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
                } else {
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
            createTableCell(row); // create 2 empty cell
            createTableCell(row);
            var td = createTableCell(row, findButton); //put button in 3 cell
            td.setAttribute('align', "right");
            function createTableCell(row) {
                var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var column = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var rowspan = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

                var td = document.createElement("td");
                td.setAttribute('style', 'padding:2px;');
                if (el !== null) {
                    try {
                        td.appendChild(el);
                    } catch (err) {
                        console.log(column);
                        console.error(err);
                    }
                }
                if (rowspan !== null) {
                    td.setAttribute('rowspan', rowspan);
                }
                row.appendChild(td);
                return td;
            }
        }

        //Функция создания фильтра

    }, {
        key: "SetOuterFilter",
        value: function SetOuterFilter(columns) {

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];

                if (!column.filter) {
                    continue;
                }

                var checkBox = document.getElementById(column.dataField + 'Checkbox');

                var input2 = null;
                var input = document.getElementById(column.dataField + 'Input');

                input2 = document.getElementById(column.dataField + 'Input2');
                if (input == null) input = document.getElementById(column.dataField + '_' + column.filterType);

                var field = new FilterItem(column, input, input2, checkBox, FilterFind);

                this.FilterElementsArray.push(field);
            }
        }
    }, {
        key: "ClearFilter",
        value: function ClearFilter() {
            for (i = 0; i < this.FilterElementsArray.length; i++) {
                this.FilterElementsArray[i].Input.value = "";
                this.FilterElementsArray[i].ChangeChecked();
            }
        }

        //Find by Filter

    }, {
        key: "FilterFind",
        value: function FilterFind() {
            var collectiveFilter = this.dataGrid.cpFilterExpression;
            for (var _i2 = 0; _i2 < this.FilterElementsArray.length; _i2++) {
                collectiveFilter = this.FilterElementsArray[_i2].ApplayFilter(collectiveFilter);
            }

            this.dataGrid.PerformCallback({ filterExpression: collectiveFilter });;
        }
    }]);

    return FilterElements;
}();

//limits input characters to numbers and commas


function OnlyNumberAndCommas(element, e) {
    if (element == null) return;
    //  console.log(e.keyCode);


    if (e.keyCode >= 48 && e.keyCode <= 57) //digits
        {
            return true;
        }
    if (e.keyCode == 188 || e.keyCode == 190) //dote comma 
        {
            return true;
        }
    if (e.keyCode == 46 || e.keyCode == 8) //back delete
        {
            return true;
        }
    return false;
}