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

function findCurText(el){
    if(el.tagName == "TEXTAREA" || el.tagName == "INPUT") return el;
    else return el.closest('ul');
}

function styleListeners(){

    var text = document.querySelectorAll('.text');
    for(var i=0; i<text.length; i++){
        text[i].addEventListener('mousedown',function(e){

            for(var i=0; i<text.length; i++){
                text[i].classList.remove('currentText');
            }

            currentText = findCurText(e.target);
            currentText.classList.add('currentText');

            //disable list type button
            var list = ['list-circle', 'list-number', 'list-square'];
            for(var j in list){
                if(!currentText.className.includes('list')){
                    document.querySelector("button[name="+ list[j] +"]").disabled = true;
                }else{
                    document.querySelector("button[name="+ list[j] +"]").disabled = false;
                }
            }

            //change font color 
            //先把rgb的三個值取出來
            var currentColor = currentText.style.color;
            currentColor = currentColor.substring(4, currentColor.length-1).replace(/ /g, '').split(',');

            for(var j=0; j<currentColor.length; j++){
                currentColor[j] = parseInt(currentColor[j]);
            }
            
            var color = document.querySelector("input[name='font-color']");
            color.value = '#' + valueToHex(currentColor[0]) + valueToHex(currentColor[1]) + valueToHex(currentColor[2]);

            //font size change
            var size = document.querySelector("select[name='font-size']");
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
                size.value = (temp) ? '20' : '14';
                //title: 20pt, content: 14pt
            }
        })
    }

    var styleBoard = document.getElementById('styleBoard');
    styleBoard.addEventListener('click', function(e){

        if(!currentText) alert('尚未選取文字');

        var action = e.target.name;
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
            case 'list-circle':  
                textStyle.listStyleType = "disc";
                editListContent(currentText, textStyle.listStyleType);
                break;
            case 'list-number':
                textStyle.listStyleType = "decimal";
                editListContent(currentText, textStyle.listStyleType);
                break;
            case 'list-square':
                textStyle.listStyleType = "square";
                editListContent(currentText, textStyle.listStyleType);
                break;
        }
    })

    styleBoard.addEventListener('input', function(e){

        var action = e.target;
        switch(action.name){
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

        list[i].setAttribute("contenteditable", "true");
        list[i].classList.add("listEditable");
    }
}

function EditTable(){
    TableRegister();
}

//調整input高度
function textResize(target){

    target.style.height = 0;

    if(target.className.includes('title')){
        target.style.height = target.style.fontSize;
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

    //隱藏刪除元件的按鈕
    var deleteBut = document.querySelectorAll('.deleteBut');
    for(var i=0; i<deleteBut.length; i++){
        deleteBut[i].classList.add('hide');
    }

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