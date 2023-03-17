var pages = document.querySelectorAll('.page');

window.addEventListener('beforeprint', () => {
    for(var i=0; i<pages.length; i++){
        pages[i].style.height = 'auto'
    }
})

window.addEventListener('afterprint', () => {
    for(var i=0; i<pages.length; i++){
        pageHeight = pages[i].offsetHeight
        if( pageHeight <= 1485 ){
            pages[i].style.height = '1485px'
        }else{
            pages[i].style.height = pageHeight+'px'
        }
    }
})