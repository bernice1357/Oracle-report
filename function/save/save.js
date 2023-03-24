function SaveImg(){
    var imgs = document.querySelectorAll('.img-border');
    for(var i=0; i<imgs.length; i++){
        var newEl = createImg(imgs[i].children[1].src);
        imgs[i].replaceWith(newEl);
    }
}

function SaveContent(){

    var content = document.querySelectorAll('.content');

    for(var i=0; i<content.length; i++){

        var newStyle = content[i].style;
        var list = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight];

        var newEl = createContent(content[i].value, list);
        content[i].parentNode.replaceWith(newEl);
    }
}

function SaveTitle(){
    var title = document.querySelectorAll('.title');

    for(var i=0; i<title.length; i++){
        
        var newStyle = title[i].style;
        var list = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight];

        var newEl = createTitle(title[i].value, list);
        title[i].parentNode.replaceWith(newEl);
    }
}

//更新表格
function SaveTable(){

    var table = document.querySelectorAll('.table-border');

    for(var i=0; i<table.length; i++){
        var tableName = table[i].getAttribute("name");
        var newTable = createTable(tableName, false);
        table[i].replaceWith(newTable);
    }
}

//更新list
function SaveList(){

    var list = document.querySelectorAll('.list');
    
    for(var i=0; i<list.length; i++){

        var content = [];
        for(var j=0; j<list[i].children.length; j++){
            content.push(list[i].children[j].innerHTML);
        }

        var newStyle = list[i].style;
        var styleList = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight, newStyle.listStyleType];

        var newEl = createList(content, styleList);
        list[i].parentNode.replaceWith(newEl);

        // list[i].setAttribute("contenteditable", "false");
        // list[i].classList.remove("listEditable");

        // var newList = [];
        // var result = list[i].value.split('\n');
        
        // var newStyle = list[i].style;
        // var styleList = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight, newStyle.listStyleType];

        // for(var j=0; j<result.length; j++){

        //     console.log(result[j]);
        //     if(result[j]){
        //         newList.push(result[j]);
        //     }
        // }

        // var newEl = createList(newList, styleList);
        // list[i].replaceWith(newEl);
    }
}

//更新目錄
function UpdateMenu(){

    var title = document.querySelectorAll('.title');
    var menu = document.querySelector('.menu');
    menu.innerHTML = '';
    pageCount = 1;

    for(var i=0; i<title.length; i++){
        var a = document.createElement('a');
        a.href = '#page-' + pageCount++;
        a.innerHTML = title[i].innerText;
        menu.append(a);
        menu.innerHTML += '<br>';
    }
}

function save(){
    SaveContent();
    SaveTable();
    SaveImg();
    SaveList();
    SaveTitle();
    UpdateMenu();

    var page_block = document.getElementById('page_block');
    page_block.classList.remove('hide');
    var component_block = document.getElementById('component_block');
    component_block.classList.remove('hide');
    var styleBoard = document.getElementById('styleBoard');
    styleBoard.classList.add('hide');

    var btn = document.getElementsByClassName('save');
    btn[0].classList.add('hide');
    var btn = document.getElementsByClassName('edit');
    btn[0].classList.remove('hide');

    //儲存啟用
    var btn = document.querySelector('.download');
    btn.disabled = false;

    clearListeners('#styleBoard');
    pageRegister();

    var deleteBut = document.querySelectorAll('.deleteBut');
    for(var i=0; i<deleteBut.length; i++){
        deleteBut[i].classList.remove('hide');
    }

    if(currentText){
        currentText.classList.remove('currentText');
        currentText = '';
    }
}