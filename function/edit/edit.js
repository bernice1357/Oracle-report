//編輯模式
function ChangeBtn(){
    //按鈕文字
    var btn = document.getElementsByClassName('save');
    btn[0].classList.remove('hide');
    var btn = document.getElementsByClassName('edit');
    btn[0].classList.add('hide');
}

function EditImg(){
    imgListener();
}

function valueToHex(c) {
    if(!c) return '00';
    var hex = c.toString(16);
    return hex.length == 1 ? '0'+hex : hex;
}

function styleListeners(){

    var text = document.querySelectorAll('.text');

    for(var i=0; i<text.length; i++){
        text[i].addEventListener('mousedown',function(e){

            for(var i=0; i<text.length; i++){
                text[i].classList.remove('currentText');
            }

            currentText = e.target;
            e.target.classList.add('currentText');

            //color change

            //先把rgb的三個值取出來
            var currentColor = currentText.style.color;
            currentColor = currentColor.substring(4, currentColor.length-1).replace(/ /g, '').split(',');

            for(var j=0; j<currentColor.length; j++){
                currentColor[j] = parseInt(currentColor[j]);
            }
            
            var color = document.getElementById('font-color');
            color.value = '#' + valueToHex(currentColor[0]) + valueToHex(currentColor[1]) + valueToHex(currentColor[2]);

            //font size change
            var size = document.getElementById('font-size');
            var textSize = currentText.style.fontSize;

            if(textSize){
                textSize = textSize.substring(0,2);
                size.value = textSize;
            }else{
                var temp = 0;
                for(var i=0; i<currentText.classList.length; i++){
                    if(currentText.classList[i]=='title'){
                        temp = 1;
                        break;
                    }
                }
                size.value = (temp) ? '24' : '14';
            }
        })
    }

    var styleBoard = document.getElementById('styleBoard');
    styleBoard.addEventListener('click', function(e){

        if(!currentText) alert('尚未選取文字');

        var action = e.target.id;
        var textStyle = currentText.style;

        switch(action){
            case 'align-left':
                textStyle.textAlign="left";
                break;
            case 'align-center':
                textStyle.textAlign="center";
                break;
            case 'align-right':
                textStyle.textAlign="right";
                break;
            case 'italic':
                textStyle.fontStyle = (!textStyle.fontStyle) ? "italic" : "";
                break;
            case 'bold':
                textStyle.fontWeight = (textStyle.fontWeight=="bold") ? "" : "bold";
                break;
            //TODOhere
            case 'list-circle':
                textStyle.listStyleType = "disc";
                break;
            case 'list-number':
                textStyle.listStyleType = "decimal";
                break;
            case 'list-square':
                console.log(textStyle.listStyleType);
                textStyle.listStyleType = "square";
                break;
        }
    })

    styleBoard.addEventListener('change', function(e){

        var action = e.target;
        switch(action.id){
            case 'font-size':
                currentText.style.fontSize = action.value+'pt';
                textResize(currentText);
                break;
            case 'font-color':
                currentText.style.color = action.value;
                break;
        }
    })
}

function EditTitle(){
    var title = document.querySelectorAll('.title');

    for(var i=0; i<title.length; i++){

        var newStyle = title[i].style;
        var list = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight];

        var newEl = createInput(title[i], list);
        title[i].replaceWith(newEl);
        textResize(newEl);
    }
}

function EditContent(){
    var content = document.querySelectorAll('.content');

    for(var i=0; i<content.length; i++){

        var newStyle = content[i].style;
        var list = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight];

        var newEl = createTextarea(content[i], list, 'content');
        content[i].replaceWith(newEl);
        textResize(newEl);
    }
}

function EditList(){

    var list = document.querySelectorAll('.list');
    for(var i=0; i<list.length; i++){

        var content='';
        for(var j=0; j<list[i].children.length; j++){
            content += (list[i].children[j].innerText+'\n');
        }

        var newStyle = list[i].style;
        var styleList = [newStyle.color, newStyle.fontSize, newStyle.textAlign, newStyle.fontStyle, newStyle.fontWeight];

        
        var newEl = createTextarea(content, styleList, 'list');
        
        list[i].replaceWith(newEl);
        textResize(newEl);
    }
}

function tableListeners(target){
    var newTable = createTable(target.value, true);
    var table_border = target.parentNode;
    table_border.replaceWith(newTable);
}

function EditTable(){

    //抓到新的值再去table.json重抓一次表格
    var tables = document.querySelectorAll('.table-border');

    for(var i=0; i<tables.length; i++){
        tables[i].children[0].classList.remove('hide');//select顯示
        tables[i].children[0].addEventListener('change', tableListeners(tables[i].children[0]));
    }
}

//調整input高度
function textResize(target){

    target.style.height = 0;

    if(target.className.includes('title')){
        // console.log(target.style.fontSize);
        target.style.height = target.style.fontSize;
        // console.log(target.style.height);
    }else{
        target.style.height = (target.scrollHeight) + "pt";
    }
}

function edit(){

    clearListeners('.page');
    if(currentPage){
        document.querySelector('.currentPage').classList.remove('currentPage');
        currentPage = '';
    }
    
    //右上角的按鈕隱藏
    var page_block = document.getElementById('page_block');
    page_block.classList.add('hide');
    var component_block = document.getElementById('component_block');
    component_block.classList.add('hide');

    //儲存禁用
    var btn = document.querySelector('.download');
    btn.disabled = true;

    //字體編輯器顯示
    var styleBoard = document.getElementById('styleBoard');
    styleBoard.classList.remove('hide');

    ChangeBtn();

    EditTitle();
    EditContent();
    EditList();
    styleListeners();

    EditTable();
    EditImg();

    var input = document.querySelectorAll('.text');
    for(var i=0; i<input.length; i++){
        input[i].addEventListener('input', function(e){
            textResize(e.target);
        })
    }
}