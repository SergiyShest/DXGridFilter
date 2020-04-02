'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//используется в фильтре для обычных HTML контролоы
var FilterItem = function () {
    function FilterItem(dataGridColumn, input, input2, checkBox, filterFind) {
        _classCallCheck(this, FilterItem);

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
        this.FilterFind = filterFind; //function FilterFind colls by press Enter
    }

    _createClass(FilterItem, [{
        key: 'ApplayFilter',
        value: function ApplayFilter(collectiveFilter) {
            var val = '';
            if (checkBox == null || checkBox.checked) {

                val = this.Input.value;

                switch (this.column.filterType) {
                    case "between":
                        switch (this.column.dataType) {
                            case 'string':
                                {
                                    throw "notInplemented";
                                }break;
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
                                    return FilterHelper.GetFilterContainsFromText(collectiveFilter, this.column.dataField, val, "like");
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
    }, {
        key: 'SetSetting',
        value: function SetSetting(setting) {

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
    }, {
        key: 'GetSetting',
        value: function GetSetting() {

            var val = this.Input.value;
            var val2 = null;
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

    }, {
        key: 'ChangeChecked',
        value: function ChangeChecked() {

            filterField = this;

            if (filterField.Input.value === "") {
                filterField.CheckBox.checked = false;
            } else {
                filterField.CheckBox.checked = true;
            }
        }

        //called from out side 
        //change CheckBox value depending on the InputBox.value  

    }, {
        key: 'CheckedChanged',
        value: function CheckedChanged() {

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

    }, {
        key: 'ValueChanged',
        value: function ValueChanged(e) {

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
    }]);

    return FilterItem;
}();

var DevexpressRadioButtonsFilterItem = function (_FilterItem) {
    _inherits(DevexpressRadioButtonsFilterItem, _FilterItem);

    function DevexpressRadioButtonsFilterItem(dataGridColumn, radioButtons, filterFind) {
        _classCallCheck(this, DevexpressRadioButtonsFilterItem);

        var _this = _possibleConstructorReturn(this, (DevexpressRadioButtonsFilterItem.__proto__ || Object.getPrototypeOf(DevexpressRadioButtonsFilterItem)).call(this, dataGridColumn, null, null, null, filterFind));

        _this.Input = radioButtons;
        return _this;
    }

    _createClass(DevexpressRadioButtonsFilterItem, [{
        key: 'ApplayFilter',
        value: function ApplayFilter(collectiveFilter) {

            var value = this.Input.GetValue();
            return FilterHelper.GetFilterInFromText(this.column.dataField, value, collectiveFilter);
        }
    }, {
        key: 'GetSetting',
        value: function GetSetting() {
            var value = this.Input.GetValue();;
            return { checkBox: true, value: value, value2: null };
        }
    }, {
        key: 'SetSetting',
        value: function SetSetting(setting) {
            this.Input.SetValue(setting.value);
        }
    }]);

    return DevexpressRadioButtonsFilterItem;
}(FilterItem);

var DevexpressCheckBoxFilterItem = function (_FilterItem2) {
    _inherits(DevexpressCheckBoxFilterItem, _FilterItem2);

    function DevexpressCheckBoxFilterItem(dataGridColumn, checkBox, filterFind) {
        _classCallCheck(this, DevexpressCheckBoxFilterItem);

        var _this2 = _possibleConstructorReturn(this, (DevexpressCheckBoxFilterItem.__proto__ || Object.getPrototypeOf(DevexpressCheckBoxFilterItem)).call(this, dataGridColumn, null, null, null, filterFind));

        _this2.CheckBox = checkBox;
        return _this2;
    }

    _createClass(DevexpressCheckBoxFilterItem, [{
        key: 'ApplayFilter',
        value: function ApplayFilter(collectiveFilter) {
            var val = '';
            var value = this.CheckBox.GetCheckState() === "Checked";
            if (value) val = '1';

            return FilterHelper.GetFilterInFromText(this.column.dataField, val, collectiveFilter);
        }
    }, {
        key: 'GetSetting',
        value: function GetSetting() {
            var value = this.CheckBox.GetCheckState() === "Checked";
            return { checkBox: true, value: value, value2: null };
        }
    }, {
        key: 'SetSetting',
        value: function SetSetting(setting) {
            this.CheckBox.SetChecked(setting.value);
        }
    }]);

    return DevexpressCheckBoxFilterItem;
}(FilterItem);

var DevexpressDateFilterItem = function (_FilterItem3) {
    _inherits(DevexpressDateFilterItem, _FilterItem3);

    function DevexpressDateFilterItem(dataGridColumn, dateEditForm, dateEditTo, filterFind) {
        _classCallCheck(this, DevexpressDateFilterItem);

        var _this3 = _possibleConstructorReturn(this, (DevexpressDateFilterItem.__proto__ || Object.getPrototypeOf(DevexpressDateFilterItem)).call(this, dataGridColumn, null, null, null, filterFind));

        _this3.DateEditForm = dateEditForm;
        _this3.DateEditTo = dateEditTo;
        return _this3;
    }

    _createClass(DevexpressDateFilterItem, [{
        key: 'ApplayFilter',
        value: function ApplayFilter(collectiveFilter) {

            var value = dateCondition(this.DateEditForm.GetDate());

            var value2 = dateCondition(this.DateEditTo.GetDate());

            return FilterHelper.GetFilterBetween(collectiveFilter, this.column.dataField, this.column.dataType, value, value2);

            function dateCondition(searchedDate) {
                if (searchedDate != null) {
                    return dateFormat(searchedDate, "yyyy-mm-dd");
                } else return "";
            }
        }
    }, {
        key: 'GetSetting',
        value: function GetSetting() {

            var value = dateCondition(this.DateEditForm.GetDate());

            var value2 = dateCondition(this.DateEditTo.GetDate());

            return { checkBox: true, value: value, value2: value2 };

            function dateCondition(searchedDate) {
                if (searchedDate != null) {
                    return dateFormat(searchedDate, "yyyy-mm-dd");
                } else return "";
            }
        }
    }, {
        key: 'SetSetting',
        value: function SetSetting(setting) {
            var d = null;
            var d2 = null;
            if (setting.value !== '') {
                d = new Date(setting.value);
                this.DateEditForm.SetDate(d);
            } else {
                this.DateEditForm.SetDate(null);
            }

            if (setting.value2 !== '') {
                d2 = new Date(setting.value2);
                this.DateEditTo.SetDate(d2);
            } else {
                this.DateEditTo.SetDate(null);
            }
        }
    }]);

    return DevexpressDateFilterItem;
}(FilterItem);