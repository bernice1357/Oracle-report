var pages = document.querySelectorAll('.page');

for(var i=0; i<pages.length; i++){
    pageHeight = pages[i].offsetHeight;
    if( pageHeight <= 1118 ){
        pages[i].style.height = '1114px'
    }else{
        pages[i].style.height = 'auto'
    }
}