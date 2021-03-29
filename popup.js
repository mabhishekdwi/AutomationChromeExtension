chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
             addToTextArea(request);

    });

    function addToTextArea(abc){
        
        var xyz=document.getElementById("w3review");
       // xyz.value="    "+abc+'\r\n'+xyz.value
        alert("add to text area"+abc.value);
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        var checkPageButton = document.getElementById('clickIt');
        checkPageButton.addEventListener('click', function() {
      
            window.open("RecorderPage.html", 
                    "", "width=1000, height=800");
        }, false);
      }, false);