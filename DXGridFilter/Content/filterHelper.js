class BaseFilterItem {

    get isFilterItem() { return this._name; }
    set isFilterItem(val) { this._name = val; }

    get isFilterGroupItem() { return this._namex; }
    set isFilterGroupItem(val) { this._namex; }
}

class FilterItem extends BaseFilterItem {

    get Name() { return this._Name; }
    set Name(val) { this._Name = val; }

    get Condition() { return this._Condition; }
    set Condition(val) { this._Condition = val; }

    get Value() { return this._Value; }
    set Value(val) { this._Value = val; }
    /**
    * @param {string} name имя переменной
    * @param {string} condition условие
    * @param {string} value значение
    */
    constructor(name, condition, value) {
        super();
        this.Name = name;
        this.Condition = condition;
        this.Value = value;
        this.isFilterItem = true;
    }
    GetResultArrey() {
        return [this.Name, this.Condition, this.Value]
    }
    GetString() {
        return this.Name + this.Condition + this.Value;
    }
}

class FilterGroupItem extends BaseFilterItem {

    get GroupName() { return this._GroupName; }
    set GroupName(val) { this._GroupName = val; }

    get Items() { return this._Items; }
    set Items(val) { this._Items = val; }

    constructor(name) {
        super();
        if (name.length == 0) throw "Имя не может быть пустым"
        this.GroupName = name.toLowerCase().trim();
        this.Items = new Array();
    }
    GetResultArrey() {
        var resultArrey = new Array();
        for (var i = 0; i < this.Items.length; i++) {
            if (resultArrey.length > 0) {
                resultArrey.push(this.GroupName);
            }
            resultArrey.push(this.Items[i].GetResultArrey());
        }
        return resultArrey;
    }
    //удаляет из  this.Items объекты с именем fieldName
    Remove(fieldName) {
        var resultArrey = new Array();
        for (var i = 0; i < this.Items.length; i++) {
            var item = this.Items[i];
            if (item.Name == fieldName) continue;//
            if (!item.Name) {//если нет свойтсва имя то это 
                item.Remove(fieldName);
            }
            resultArrey.push(this.Items[i]);
        }
        this.Items = resultArrey;
    }
}

class FilterHelper {


    static RemoveFromExpession(expression, condField) {
        var reg = '(\\s*And |Or |and |or |)\\s*\\[' + condField + '\\]\\s+(=|<|>|<=|>=)\\s+\\w+\\s*'
        var res = expression.replace(new RegExp(reg, 'g'), "");
        console.log("=====" + expression + "=====");
        console.log('1-->     |' + res + '|');
        res = res.replace(/\(\s*(and|or|)\s*\)/ig); //removes empty brackets possibly with and|or
        res = res.replace('undefined', ""); //removes undefined
        res = FilterHelper.Normalaze(res);
        console.log('2---->     |' + res + '|');
        return res;
    }


    constructor() {
    }

    static Normalaze(expression) {
        var res = expression.replace(/^\s*(and|or)\s*/i); //removes or|and in begin expression
        res = res.replace(/\s*(and|or)\s*$/i); //removes or|and in end expression
        res = res.replace('undefined', "").trim(); //removes undefined and treem
        if (res.startsWith('(') && res.endsWith(')')) {
            res = res.substring(1, res.length - 1); //removes  brackets in begin and end
        }
        return res;
    }

    /*ссс*
     * @param {string} filterStr старый  фильтр  грида
     * @param {string} condField Имя поля
     * @param {Array<string>} condValues Массив значений
     * @param {string} dataType тип данных грида
     * @return{string} новый фильтр грида
    */
    static ApplyInCon(filterStr, condField, condValues, dataType) {

        filterStr = FilterHelper.RemoveFromExpession(filterStr, condField);
        var filterOr = "";

        for (var i = 0; i < condValues.length; i++) {
            if (filterOr.length > 0) filterOr += ' or ';
            filterOr += `[${condField}] = ${condValues[i]}${dataType}`;
        }

        if (condValues.length > 1) {
            filterOr = `(${filterOr})`;
        }
        filterStr += ' and ' + filterOr;

        filterStr = FilterHelper.Normalaze(filterStr);
        return filterStr;

    }

    /**
        @param { Array<string | Array>} filterArr массив параметров
    */
    static GetName(filterArr) {
        // var arrType = typeof filterArr;
        if (typeof (filterArr) !== "undefined" && typeof (filterArr.length) !== "undefined")
            if (filterArr.length == 3 && typeof filterArr[0] == 'string') {
                return filterArr[0];
            }
        return null;
    }



    /**
     * the input string will be divided by comma to get an array of parameters
      @param { string} fieldName 
      @param {string } filterText  
      @param {Array<string| Array> } filterArr previous  dataGrid filter 
  */
    static GetFilterInFromText(fieldName, filterText, filterStr) {
        if (filterText.length > 0) {
            var valueAr = filterText.split(',');
            filterStr = FilterHelper.ApplyInCon(filterStr, fieldName, valueAr);

        } else {
            filterStr = FilterHelper.RemoveFromExpession(filterStr, fieldName);
        }
        return filterStr;
    }
    /**
        @param { string} fieldName 
        @param {Array<string> } valueAr 
        @param {Array<string| Array> } filterArr previous  dataGrid filter 
    */
    static GetFilterFromArr(fieldName, valueAr, filterArr) {
        if (valueAr.length > 0) {
            filterArr = FilterHelper.ApplyInCon(filterArr, fieldName, valueAr);
        } else {
            filterArr = FilterHelper.RemoveCondition(filterArr, fieldName)
        }
        return filterArr;
    }


}

