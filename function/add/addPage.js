//刪除頁面
var deletePage = document.getElementById('deleteCurrent');
deletePage.addEventListener('click', function() {

    if(currentPage){
        if(confirm('確定要刪除此頁嗎？')) currentPage.remove();
    }else{
        alert('尚未選取頁面');
    }
});


//新增上一頁
var addPrevious = document.getElementById('addPrevious');
addPrevious.addEventListener('click', function() {

    if(currentPage){
        var newPage = document.createElement('div');

        newPage.innerHTML = component['new-page'];
        newPage.className = 'page';
        newPage.id = 'page-'+Random();
        currentPage.before(newPage);
        reset();
        
    }else{
        alert('尚未選取頁面');
    }
});

//新增下一頁
var addAfter = document.getElementById('addAfter');
addAfter.addEventListener('click', function() {

    if(currentPage){
        var newPage = document.createElement('div');
        newPage.innerHTML = component['new-page'];
        newPage.className = 'page';
        newPage.id = 'page-'+Random();
        currentPage.after(newPage);
        reset();
    }else{
        alert('尚未選取頁面');
    }
});

//刪掉原本的 listeners -> 重新註冊
function reset(){
    pageResize();
    clearListeners('.page');
    pageRegister();
}

