    //   ==========================  Vat Apllication Extension ================== 
   //    ==========================  Version 1.0.0             ==================
  //     ==========================   Author: Arslan Ismail    ==================   

var VatApp=(function(){

  var ApplicationHtml=
      {
        //    var Select input button html
        
        vatSelectInput:function(){
             var selectInput="<select id='vatid' onchange='VatApp.applyPricing()' style='margin-left: 30px;'>"+
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

                    //  To Add  Ex - vat infront of the span

                    var toAddExvat=document.getElementsByClassName('excvat')[i].innerHTML.trim();
                    toAddExvat=toAddExvat.replace(/Rs./gi,"");
                    document.getElementsByClassName('excvat')[i].innerHTML='Exc-Vat Rs.'+toAddExvat;
                    
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
         
         appendInProductPriceSnippet:function()
         {
            var regularPriceClassAttribute='price-item price-item--regular excvat';
            var regularsalePriceStyleAttribute='display:block';
            var salePriceClassAttribute='price-item price-item--sale excvat';
            
                //   Get Price and Multiply it with Tax Rate
            if(document.querySelector('#commerce-vat-tax-rate').innerHTML.trim())
            {
            var taxprice=document.querySelector('#commerce-vat-tax-rate').innerHTML.trim();
            }
            
            var conditionalCheck=document.getElementsByClassName("price__regular");
            if(conditionalCheck.length>0){
            for (var i=0; i<conditionalCheck.length; i++){
                var regularPrice=document.getElementsByClassName("price__regular")[i].children[1].children[0].innerHTML.trim();
                regularPrice=parseInt(regularPrice.replace(/Rs./gi,"")) + (parseInt(regularPrice.replace(/Rs./gi,""))*taxprice);
                regularPrice=parseFloat(regularPrice).toFixed(2);    
                var salePrice=document.getElementsByClassName("price__sale")[i].children[1].children[0].innerHTML.trim();
                salePrice=parseInt(salePrice.replace(/Rs./gi,"")) + (parseInt(salePrice.replace(/Rs./gi,""))*taxprice);
                var addSpanToRegularPrice="<span style='display:none;' class='price-item price-item--regular incvat' data-regular-price=''>Inc-Vat Rs."+regularPrice+"</span>";
                var addSpanToSalePrice="<span style='display: none;' class='price-item price-item--sale incvat' data-sale-price=''>Inc-Vat  Rs."+salePrice+"</span>";
                this.productSnippetDom(regularPriceClassAttribute,regularsalePriceStyleAttribute,salePriceClassAttribute,regularsalePriceStyleAttribute,addSpanToSalePrice,addSpanToRegularPrice,i);
            }
                
            }
         },

        //               Product Prices Dom Manipulation Function
        
        
         productSnippetDom:function(regularPriceClassAttribute,regularsalePriceStyleAttribute,salePriceClassAttribute,regularsalePriceStyleAttribute,addSpanToSalePrice,addSpanToRegularPrice,index)
         {
            
            
            document.getElementsByClassName("price__regular")[index].children[1].children[0].setAttribute('class',regularPriceClassAttribute);
            document.getElementsByClassName("price__regular")[index].children[1].children[0].setAttribute('style',regularsalePriceStyleAttribute);
            document.getElementsByClassName("price__sale")[index].children[1].children[0].setAttribute('class',salePriceClassAttribute);
            document.getElementsByClassName("price__sale")[index].children[1].children[0].setAttribute('style',regularsalePriceStyleAttribute);
            document.getElementsByClassName("price__sale")[index].children[1].insertAdjacentHTML('beforebegin',addSpanToSalePrice);
            document.getElementsByClassName("price__regular")[index].children[1].insertAdjacentHTML('beforeend',addSpanToRegularPrice);
            
           

            // document.querySelector(".price__regular").children[1].children[0].setAttribute('class',regularPriceClassAttribute);
            // document.querySelector(".price__regular").children[1].children[0].setAttribute('style',regularsalePriceStyleAttribute);
            // document.querySelector(".price__sale").children[1].children[0].setAttribute('class',salePriceClassAttribute);
            // document.querySelector(".price__sale").children[1].children[0].setAttribute('style',regularsalePriceStyleAttribute);
            // document.querySelector(".price__sale").children[1].insertAdjacentHTML('beforebegin',addSpanToSalePrice);
            // document.getElementsByClassName("price__regular")[0].children[1].insertAdjacentHTML('beforeend',addSpanToRegularPrice);
            
         },

        //     Render The Appplication

         render:function(){
            this.appendVatBtnInHeader();
            this.appendInProductPriceSnippet();
         }

      }

//   =========================== Chnages on Store Header 

    function startApp(){
     ApplicationHtml.render();
    }

//   =========================== Store Pricing

    function pricing() {
        ApplicationHtml.runProcess();  
    }

//   ====================   Initializing The Vat App

    function init(){
        startApp();
        // console.log(Shopify);  
    }

 
    return {
        init:init,
        //  Event Handlers  ===> Access with VatApp.pricing();
        applyPricing:pricing
    }


})();

//   ====================   Invoking The Vat App
VatApp.init();