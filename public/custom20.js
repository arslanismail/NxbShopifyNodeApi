    //   ==========================  Vat Apllication Extension ================== 
   //    ==========================  Version 1.0.0             ==================
  //     ==========================   Author: Arslan Ismail    ==================   

var VatApp=(function(){

  var ApplicationHtml=
      {
        //    var Select input button html
         vatSelectInput:function(){
             var selectInput="<select id='vatid' onchange='VatApp.pricing()'>"+
             "<option value='exc'>Excl. VAT</option>"+
             "<option value='inc'>Inc. VAT</option>"+
             "<option value='both'>Both</option>"+
             "</select>";

             return selectInput;
         },
         //   Selected Value from the button

         runProcess:function(){
            var ele = document.getElementsByClassName('incvat');
            var hideprice=document.getElementsByClassName('excvat');  
            var selectedVal = document.getElementById("vatid").value;
            if(selectedVal=="inc"){
                for (var i = 0; i < ele.length; i++ ) {
                    ele[i].style.display = "block";
                    hideprice[i].style.display = "none";
                }
            }
            else if(selectedVal=="exc")
            {
                for (var i = 0; i < hideprice.length; i++ ) {
                    hideprice[i].style.display = "block";
                    ele[i].style.display = "none";
                }
            }
            else{
                for (var i = 0; i < hideprice.length; i++ ) {
                    hideprice[i].style.display = "block";
                    ele[i].style.display = "block";
                }   
            }
         },
        //   Where Vat Button is to be placed 
         themeHeaderPostion:function(){
           var returnNavInHeader=document.getElementsByTagName("header")[0].children[0].children[2].children[0];
           return returnNavInHeader;
         },
         //   Appending Select button to theme Header
         appendVatBtnInHeader:function(){
            var buttonPosition=this.themeHeaderPostion();
            var toAddinHeader=this.vatSelectInput();
            buttonPosition.insertAdjacentHTML('beforeend', toAddinHeader);
         },
         //   Adding and Manipulating DOM of Product Price Snippet
         appendInProductPriceSnippet:function(){
           
         }
      }

//   =========================== Chnages on Store Header 
    function startApp(){
    ApplicationHtml.appendVatBtnInHeader();
    }

//   =========================== Store Pricing
    function pricing() {
        ApplicationHtml.runProcess();  
    }

//   ====================   Initializing The Vat App
    function init(){
        startApp();
    }



    return {
        init:init,
        //  Event Handlers  ===> Access with VatApp.pricing();
        pricing:pricing
    }


})();

//   ====================   Invoking The Vat App
VatApp.init();