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

        var border = newPage.children[0];
        var newEl = createTitle("New Title", ['rgb(0,0,0)','24pt','','','']);

        newPage.children[0].appendChild(newEl);
        console.log(newPage);

        newPage.className = 'page';
        newPage.id = 'page-'+Random();
        currentPage.before(newPage);

        newEl.children[1].addEventListener("mouseover", function(){
            console.log(9999);
        })

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

        var border = newPage.children[0];
        var newEl = createTitle("New Title", ['rgb(0,0,0)','24pt','','','']);
        border.appendChild(newEl);
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

