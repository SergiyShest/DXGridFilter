
class FilterHelper {


    static RemoveFromExpession(expression, condField) {
        var reg = '(\\s*And |Or |and |or |)\\s*\\[' + condField + '\\]\\s+(=|<|>|<=|>=|Like|like|LIKE)\\s+(\'%|)\\w+(%\'|)\\s*';
        var res = expression.replace(new RegExp(reg, 'g'), "");
        console.log("=====" + expression + "=====" + reg);
        console.log('1-->     |' + res + '|');

        var reg2 = '(\\s*And |Or |and |or |)\\s*(Contains|BeginFrom|End)\\(\\[name\\], \'\\w+\'\\)\\s*';
         res = res.replace(new RegExp(reg2, 'g'), "");

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
    static GetFilterContainsFromText(filterStr, fieldName,searchedValue, compareType) {
     console.log('before remove ' + filterStr);
        filterStr = FilterHelper.RemoveFromExpession(filterStr, fieldName);
        console.log('after remove ' + filterStr);
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


}

