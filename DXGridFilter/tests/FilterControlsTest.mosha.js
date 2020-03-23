//const FilterHelper = require('../dist/FilterHelper.js');
//import { FilterHelper }  from '../dist/FilterHelper.js';


describe("filerElem SaveSettings Tests", function () {

    it("SaveSettingSimple", function () {
        var el = document.getElementById("OrderIDInput");
        el.value = "1,3";
        var setting = filerObj.FilterElementsArray[0].GetSetting();
        console.log(setting)

        expect(setting.value).to.equal("1,3");;
    });

    it("SaveSetting_combobox", function () {
        var el = document.getElementById("CustomerID_combobox");
        el.selectedIndex = 2;
        var setting = filerObj.FilterElementsArray[2].GetSetting();
        console.log(setting)

        expect(setting.value).to.equal("HANAR");;
    });

    it("SaveSetting_listbox", function () {
        var el = document.getElementById("CustomerID_listbox");
        el.options[0].selected=false;
        el.options[1].selected=true;
        el.options[2].selected=true;
        var setting = filerObj.FilterElementsArray[3].GetSetting();
        console.log(setting)

        expect(setting.value).to.equal("TOMSP,HANAR");;
    });

    it("SaveSetting_between_number", function () {
        var el = document.getElementById("FreightInput");
        var el2 = document.getElementById("FreightInput2");
        el.value = "1"; 
        el2.value = "2";

        var setting = filerObj.FilterElementsArray[4].GetSetting();
        console.log(setting)

        expect(setting.value).to.equal("1");
        expect(setting.value2).to.equal("2");
    });

     it("SaveSetting_between_date", function () {
        var el = document.getElementById("OrderDateInput");
        var el2 = document.getElementById("OrderDateInput2");
        el.value = "2018-12-10"; 
        el2.value = "2019-10-05";

        var setting = filerObj.FilterElementsArray[5].GetSetting();
        console.log(setting)

        expect(setting.value).to.equal("2018-12-10");
        expect(setting.value2).to.equal("2019-10-05");
    });
   
});

describe("filerElem readSettings Tests", function () {

    it("ReadSettingSimple", function () {
        var el = document.getElementById("OrderIDInput");
        el.value = "";
        var setting={checkBox:true,value:'0,3' ,value2:null }
  
        filerObj.FilterElementsArray[0].SetSetting(setting);
        expect( el.value).to.equal('0,3');;
    });

    it("ReadSetting_combobox", function () {
        var el = document.getElementById("CustomerID_combobox");
        el.selectedIndex = -1;
        var setting={checkBox:true,value:"HANAR" ,value2:null }
        filerObj.FilterElementsArray[2].SetSetting(setting);
        expect(el.selectedIndex).to.equal(2);;
    });

    it("ReadSetting_listbox", function () {
        var el = document.getElementById("CustomerID_listbox");
        el.options[0].selected=true;
        el.options[1].selected=false;
        el.options[2].selected=true;
        el.options[3].selected=false;
         var setting={checkBox:true,value:"VINET,HANAR" ,value2:null }
       filerObj.FilterElementsArray[3].SetSetting(setting);
  

        expect(el.options[0].selected).to.equal(true);
        expect(el.options[1].selected).to.equal(false);
        expect(el.options[2].selected).to.equal(true);
        expect(el.options[3].selected).to.equal(false);
       
    });

    it("ReadSetting_between_number", function () {
        var el = document.getElementById("FreightInput");
        var el2 = document.getElementById("FreightInput2");
        el.value = ""; 
        el2.value = "";
        var setting={checkBox:true,value:"3" ,value2:"4" }
        filerObj.FilterElementsArray[4].SetSetting(setting);
   

        expect(el.value).to.equal("3");
        expect(el2.value).to.equal("4");
    });

     it("ReadSetting_between_date", function () {
        var el = document.getElementById("OrderDateInput");
        var el2 = document.getElementById("OrderDateInput2");

         var setting ={checkBox:true,value:"2019-10-05" ,value2:"2019-11-06" }
         filerObj.FilterElementsArray[5].SetSetting(setting);
  

        expect(el.value).to.equal("2019-10-05");
        expect(el2.value).to.equal("2019-11-06");
    });
   
});

describe("filerControls Settings Tests", function () {

    it("SaveSettingSimple", function () {
        localStorage.clear();
        var el = document.getElementById("OrderIDInput");
        el.value = "0,3";
        filerObj.SaveSettings("test");
        var testSettings=  localStorage.getItem("test");
         expect(testSettings.length>100).to.equal(true);

    });

        it("ReadSettingSimple", function () {
        var el = document.getElementById("OrderIDInput");
        el.value = "15,3";
        filerObj.ReadSettings("test");

        var testSettings =  localStorage.getItem("test");
         expect(el.value).to.equal("0,3");

    });
   
});

