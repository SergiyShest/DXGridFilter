if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position)
            || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

class FilterHelper {


    static RemoveFromExpession(expression, condField) {

        var reg = '(\\s*And |Or |and |or |)\\s*\\[' + condField + '\\]\\s+(=|<|>|<=|>=|Like|like|LIKE)\\s+[\\w\\/-]+\\s*';//значение  без кавычек [a]=4
        var res = expression.replace(new RegExp(reg, 'g'), "");

        reg = '(\\s*And |Or |and |or |)\\s*\\[' + condField + '\\]\\s+(=|<|>|<=|>=|Like|like|LIKE)\\s+\'(.*?)\'\\s*';//значение в кавычках например [a]='e dfdfg' 
        res = res.replace(new RegExp(reg, 'g'), "");

        reg = '(\\s*And |Or |and |or |)\\s*\\[' + condField + '\\]\\s+(=|<|>|<=|>=)\\s+#(.*?)#\\s*';//дата в # например [ProductDate] > #1994-12-31# 
        res = res.replace(new RegExp(reg, 'g'), "");

        //        console.log("=====" + expression + "=====" + reg);
        //        console.log('1-->     |' + res + '|');

        var reg2 = '(\\s*And |Or |and |or |)\\s*(Contains|BeginFrom|End)\\(\\[name\\], \'\\w+\'\\)\\s*';
        res = res.replace(new RegExp(reg2, 'g'), "");

        res = res.replace(/\(\s*(and|or|)\s*\)/ig); //removes empty brackets possibly with and|or
        res = res.replace('undefined', ""); //removes undefined
        res = FilterHelper.Normalaze(res);
        //        console.log('2---->     |' + res + '|');
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

            if (condValues[i].length == 0) continue;
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
     * 
     * @param {string} filterStr
     * @param {string} fieldName
     * @param {string} searchedValue
     * @param {string} compareType
     */
    static GetFilterContainsFromText(filterStr, fieldName, searchedValue, compareType) {

        filterStr = FilterHelper.RemoveFromExpession(filterStr, fieldName);

        if (searchedValue.length > 0) {
            switch (compareType) {
                case "Contains":
                    filterStr += ' and Contains([' + fieldName + "], '" + searchedValue + "')";
                    break;
                default:
                    console.log('default ' + filterStr);
                    filterStr += ' and [' + fieldName + "] like '%" + searchedValue + "%'";
            }
        }
        console.log('result ' + filterStr);
        return filterStr;
    }
    /**
     * 
     * @param {any} filterStr
     * @param {any} fieldName
     * @param {any} dataType
     * @param {any} searchedValueFrom
     * @param {any} searchedValueTo
     */
    static GetFilterBetween(filterStr, fieldName, dataType, searchedValueFrom, searchedValueTo) {


        filterStr = FilterHelper.RemoveFromExpession(filterStr, fieldName);

        console.log(fieldName);
        if (dataType == "date") {
            filterStr += addDateCondition(searchedValueFrom, ">=");
            filterStr += addDateCondition(searchedValueTo, "<=");
        } else {
            filterStr += addNumberCondition(searchedValueFrom, ">=");
            filterStr += addNumberCondition(searchedValueTo, "<=");
        }

        filterStr = FilterHelper.Normalaze(filterStr);
        return filterStr;

        function addDateCondition(searchedValue, condition) {
            if (searchedValue.length > 0) {
                var d = Date.parse(searchedValue);
                searchedValue = dateFormat(d, "yyyy-mm-dd");
                return ` and [${fieldName}] ${condition} #${searchedValue}#`;
            }else return "";
        }
        function addNumberCondition(searchedValue, condition) {
            if (searchedValue.length > 0) {
                return ` and [${fieldName}] ${condition} ${searchedValue}`;
            }else return "";
        }
    }
}

//module.exports = FilterHelper;

