var hideList = []

window.addEventListener('beforeprint', () =>{
    var btnBlock = document.querySelector('#btnBlock');
    hideList.push(btnBlock);

    var pageBlock = document.querySelector('#page_block');
    hideList.push(pageBlock);

    var componentBlock = document.querySelector('#component_block');
    hideList.push(componentBlock);
    
    var buttons = document.querySelectorAll('button');
    hideList.push(...buttons);

    var inputs = document.querySelectorAll('input');
    hideList.push(...inputs);

    var selects = document.querySelectorAll('select');
    hideList.push(...selects);

    for(var i=0; i<hideList.length; i++){
        hideList[i].style.display = "none";
    }
})

window.addEventListener('afterprint', () =>{

    for(var i=0; i<hideList.length; i++){
        hideList[i].style.display = "inline";
    }
})