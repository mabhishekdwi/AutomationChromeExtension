

 


  window.addEventListener('DOMContentLoaded', (event) => {
    init();
    //insertInDom();
    //alert("Dom Loaded");
});

window.addEventListener('click', (event) => {
    init();

   var abc=parseDOM(event.toElement);
   //var xyz=document.getElementById("w3review");
   //xyz.value="    "+abc+'\r\n'+xyz.value;

   if(event.toElement.className==="context-menu__link"){
		alert("clicked context menu link " +event.toElement.innerHTML);
		}
    else{
      alert(abc);
      
      chrome.runtime.sendMessage(abc);
      //event.preventDefault();
  }
   
   
   
    //alert("item clicked");
});




// get the target element once click on the context menu
function init() {
    (event) => {
         //alert(event.target);
        targetElemt = event.target;
    }, false;
}

function parseDOM(targetElemt) {
    let tag = targetElemt.tagName.toLowerCase();
    let attributes = targetElemt.attributes;
    hasMainAttributesAvailable(attributes,targetElemt,tag);
    addAllXPathAttributes(attributes, tag, targetElemt);
    absoluteXpath(targetElemt);
    getTextXPath(targetElemt);
    var xpathKeyValue=""+ xpathKey +""+'='+ xpathValue;
    uniqueIdCount=0;
    return xpathKeyValue;
    }
    
    // get all attribtes based XPath
    function addAllXPathAttributes(attributes, tagName, targetElemt) {
    if(uniqueIdCount == 0){
    Array.prototype.slice.call(attributes).forEach(element => {
       switch (element.name) {
           case "id":
               getUniqueId(targetElemt, tagName);
               break;
           case "name":
               getUniqueName(targetElemt, tagName);
               break;
           case "className":
               getUniqueClassName(targetElemt, tagName);
               break;
           default:
               if (element.value != '')
                   attributesBasedXPath(targetElemt, tagName);
               break;
       }
    });
    }
    }
    
    function hasMainAttributesAvailable(attributes, targetElemt,tag) {
    if(uniqueIdCount ==0){
   if(targetElemt.hasAttribute('id')){
    getUniqueId(targetElemt,tag);
    }
    else if(targetElemt.hasAttribute('class')){
    getUniqueClassName(targetElemt, tag);
    }
    else if(targetElemt.hasAttribute('name')){
    getUniqueName(targetElemt, tag);
    }
     }
    }
    
    // find the no.of elements matches with XPath
    function getCountOfXPath(xpath) {
    let count = document.evaluate(
       `count(${xpath})`, document, null, XPathResult.ANY_TYPE, null
    ).numberValue;
    return count;
    }
    
    // store all the XPath values in an array
    var XPATHDATA = [];
    var uniqueIdCount = 0; 
    var xpathValue="";
    var xpathKey="";
    var xpathKeyValue="";
    
    // id
    function getUniqueId(targetElemt, tag) {
    let idValue = targetElemt.id;
    let idPattern = `//*[@id='${idValue}']`;
    //let count = getCountOfXPath(idPattern);
    //if (count == 1) {
       getKeyOfElement(targetElemt);
       xpathValue=idPattern;
       uniqueIdCount = uniqueIdCount+1;
    //}
    }
    
    // name
    function getUniqueName(targetElemt, tag) {
    let value = targetElemt.name;
    let nameValue = `//*[@name='${value}']`;
    //let count = getCountOfXPath(nameValue);
    //if (count == 1) {
       xpathValue=nameValue;
       getKeyOfElement(targetElemt);
       uniqueIdCount = uniqueIdCount+1;
    //}
    }
    
    // className
    function getUniqueClassName(targetElemt, tag) {
    let value = targetElemt.className;
    let classvalue = `//*[@class='${value}']`;
    //let count = getCountOfXPath(classvalue);
    //if (count == 1) {
    xpathValue=classvalue;
       getKeyOfElement(targetElemt);
       uniqueIdCount = uniqueIdCount+1;
    //}
    }
    
    
    // tag
    function getUniqueTagName(targetElemt, tag) {
    let count = document.getElementsByTagName(tag).length;
    //if (count == 1) {
       XPATHDATA.push(["unique Tag name:", tag]);
       xpathValue='Tag.'+tag;
       getKeyOfElement(targetElemt);
       uniqueIdCount = uniqueIdCount+1;
    //}
    }
    
    
    // link
    function getUniqueLinkText(ele, tag) {
    }
    function getKeyOfElement(targetElemt) {
        if(targetElemt.innerText =="") {
         if(targetElemt.getAttribute("type")) {
          xpathKey=targetElemt.getAttribute("type");
          }
            else if(targetElemt.getAttribute("class")) {
            xpathKey=targetElemt.getAttribute("class");
            }
    else if(targetElemt.getAttribute("id")) {
          xpathKey=targetElemt.getAttribute("id");
          }
    else if(targetElemt.getAttribute("placeholder")) {
          xpathKey=targetElemt.getAttribute("placeholder");
          }		   
    }
      else {
      xpathKey=targetElemt.innerText;
          }
        }   
    
    // Attributes based XPath 
    function attributesBasedXPath(targetElemt, tagName) {
    let temp = `//${tagName}[@${targetElemt.name}='${targetElemt.value}']`;
    //let count = getCountOfXPath(temp);
    //if (count == 1) {
    xpathValue=temp;
       xpathKey=targetElemt.innerText;
       uniqueIdCount = uniqueIdCount+1;
    //}
    
    }
    
     function absoluteXpath(targetElemt) { 
     if(uniqueIdCount == 0){
       var allNodes = document.getElementsByTagName('*'); 
       for (var segs = []; targetElemt && targetElemt.nodeType == 1; targetElemt = targetElemt.parentNode) 
       { 
           if (targetElemt.hasAttribute('id')) { 
           } else { 
               for (i = 1, sib = targetElemt.previousSibling; sib; sib = sib.previousSibling) { 
                   if (sib.localName == targetElemt.localName)  i++; }; 
                   segs.unshift(targetElemt.localName.toLowerCase() + '[' + i + ']'); 
           }; 
       }; 
       xpathValue= segs.length ? '/' + segs.join('/') : null;
       xpathKey=targetElemt.innerText;			
   }
}		
    
    function getTextXPath(targetElemt) {
if (targetElemt.textContent != "" && uniqueIdCount ==0) {
   let tagName = targetElemt.tagName.toLowerCase()
   let text = targetElemt.textContent;
   let pattern = `//${tagName}[text()='${text}']`
   xpathKey=targetElemt.innerText;
   xpathValue=pattern;
   uniqueIdCount = uniqueIdCount+1;
}
}
document.addEventListener( "contextmenu", function(e) {
  taskItemInContext = clickInsideElement( e, taskItemClassName );

 // if ( taskItemInContext ) {
    e.preventDefault();
    toggleMenuOn();
    positionMenu(e);
 // } else {
   // taskItemInContext = null;
   // toggleMenuOff();
//   }
});




    function clickInsideElement( e, className ) {
    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
      return el;
    } else {
      while ( el = el.parentNode ) {
        if ( el.classList && el.classList.contains(className) ) {
          return el;
        }
      }
    }
    
    return el;
    }
    
    /**
    * Get's exact position of event.
    * 
    * @param {Object} e The event passed in
    * @return {Object} Returns the x and y position
    */
    function getPosition(e) {
    var posx = 0;
    var posy = 0;
    
    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return {
      x: posx,
      y: posy
    }
    }
    
    
    var contextMenuClassName = "context-menu";
    var contextMenuItemClassName = "context-menu__item";
    var contextMenuLinkClassName = "context-menu__link";
    var contextMenuActive = "context-menu--active";
    
    var taskItemClassName = "context-menu";
    var taskItemInContext="body";
    
    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;
    
    var menu = document.querySelector("#context-menu");
    var menuItems = menu.querySelectorAll(".context-menu__item");
    var menuState = 0;
    var menuWidth;
    var menuHeight;
    var menuPosition;
    var menuPositionX;
    var menuPositionY;
    
    var windowWidth;
    var windowHeight;
    
    /**
    * Initialise our application's code.
    */
    function init() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
    }
    
    
    
    /**
    * Listens for contextmenu events.
    */
    function contextListener() {
    document.addEventListener( "contextmenu", function(e) {
      taskItemInContext = clickInsideElement( e, taskItemClassName );
    
     // if ( taskItemInContext ) {
        e.preventDefault();
        toggleMenuOn();
        positionMenu(e);
     // } else {
       // taskItemInContext = null;
       // toggleMenuOff();
    //   }
    });
    }
    
    /**
    * Listens for click events.
    */
    function clickListener() {
    document.addEventListener( "click", function(e) {
      var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );
    
      if ( clickeElIsLink ) {
        
        //e.preventDefault();
        toggleMenuOff();
        //alert("clicked");
       
      } else {
        var button = e.which || e.button;
        if ( button === 1 ) {
          toggleMenuOff();
        }
      }
    });
    }
    
    /**
    * Listens for keyup events.
    */
    function keyupListener() {
    window.onkeyup = function(e) {
      if ( e.keyCode === 27 ) {
        toggleMenuOff();
      }
    }
    }
    
    /**
    * Window resize event listener
    */
    function resizeListener() {
    window.onresize = function(e) {
      toggleMenuOff();
    };
    }
    
    /**
    * Turns the custom context menu on.
    */
    function toggleMenuOn() {
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add( contextMenuActive );
    }
    }
    
    /**
    * Turns the custom context menu off.
    */
    function toggleMenuOff() {
    if ( menuState !== 0 ) {
      menuState = 0;
      menu.classList.remove( contextMenuActive );
    }
    }
    
    /**
    * Positions the menu properly.
    * 
    * @param {Object} e The event
    */
    function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;
    
    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;
    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    if ( (windowWidth - clickCoordsX) < menuWidth ) {
      menu.style.left = windowWidth - menuWidth + "px";
    } else {
      menu.style.left = clickCoordsX + "px";
    }
    
    if ( (windowHeight - clickCoordsY) < menuHeight ) {
      menu.style.top = windowHeight - menuHeight + "px";
    } else {
      menu.style.top = clickCoordsY + "px";
    }
    }
    
    /**
    * Dummy action function that logs an action when a menu item link is clicked
    * 
    * @param {HTMLElement} link The link that was clicked
    */
    function menuItemListener( link ) {
    console.log( "Task ID - " + taskItemInContext.getAttribute("data-id") + ", Task action - " + link.getAttribute("data-action"));
    toggleMenuOff();
    }
    

    
   
    /**
    * Run the app.
    */
    //init();
    
    






  