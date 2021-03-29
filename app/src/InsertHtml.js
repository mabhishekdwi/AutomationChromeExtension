var div=window.document.createElement("div");

setAttributes(div,{
    'id':'context-menu',
    'class':'context-menu'
});

var ul=document.createElement("ul");
ul.setAttribute("class","context-menu__items");
var li1=window.document.createElement("li");
setAttributes(li1,{
    "class":"context-menu__item"
});
var a1=window.document.createElement("a");
setAttributes(a1,{
    "href":"#",
     "class":"context-menu__link",
	 "data-action":"verifyTextPresent"
});
a1.innerHTML="verifyTextPresent";

 
 var li2=window.document.createElement("li");
 setAttributes(li2,{
     "class":"context-menu__item"
 });
 var a2=window.document.createElement("a");
 setAttributes(a2,{
     "href":"#",
      "class":"context-menu__link",
      "data-action":"assertElementPresent"
 });
 a2.innerHTML="assertElementPresent";
 
 var li3=window.document.createElement("li");
 setAttributes(li3,{
     "class":"context-menu__item"
 });
 var a3=window.document.createElement("a");
 setAttributes(a3,{
     "href":"#",
      "class":"context-menu__link",
      "data-action":"waitForText"
 });
 a3.innerHTML="waitForText";
 
 var li4=window.document.createElement("li");
 setAttributes(li4,{
     "class":"context-menu__item"
 });
 var a4=window.document.createElement("a");
 setAttributes(a4,{
     "href":"#",
      "class":"context-menu__link",
      "data-action":"waitForElement"
 });
 a4.innerHTML="waitForElement";
 
 
 
 var li5=window.document.createElement("li");
 setAttributes(li5,{
     "class":"context-menu__item"
 });
 var a5=window.document.createElement("a");
 setAttributes(a5,{
     "href":"#",
      "class":"context-menu__link",
      "data-action":"Cancel"
 });
 a5.innerHTML="Cancel";


 div.appendChild(ul);
 ul.appendChild(li1);
 li1.appendChild(a1);

 ul.appendChild(li2);
 li2.appendChild(a2);
 ul.appendChild(li3);
 li3.appendChild(a3);
 ul.appendChild(li4);
 li4.appendChild(a4);
 ul.appendChild(li5);
 li5.appendChild(a5);
 

window.document.body.appendChild(div);
  
  

// var eleStylesheet=window.document.createElement('link');
//                 eleStylesheet.setAttribute('rel', 'stylesheet'); 
//                 eleStylesheet.setAttribute('type','text/css');
// 				eleStylesheet.setAttribute('href', 'app/src/contextMenu.css'); 
// 				window.document.head.appendChild(eleStylesheet);


function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }