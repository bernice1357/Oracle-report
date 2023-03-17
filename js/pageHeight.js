var pages = document.querySelectorAll('.page');

for(var i=0; i<pages.length; i++){
    pageHeight = pages[i].offsetHeight;
    if( pageHeight <= 1485 ){
        pages[i].style.height = '1485px'
    }else{
        pages[i].style.height = 'auto'
    }
}