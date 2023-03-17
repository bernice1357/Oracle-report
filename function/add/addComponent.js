//開始拖曳
document.addEventListener('dragstart', function(e){
    if(!currentPage){
        alert('尚未選取頁面');
    }else{
        e.dataTransfer.setData('text/plain', e.target.name);
    }
})

//滑鼠放開的瞬間
document.addEventListener('drop', function(e){

    for(var i=0; i<children.length; i++){

        var newTarget = findTarget(e);

        if(children[i] == newTarget){

            let getText = e.dataTransfer.getData('text/plain');
            var newEl;

            if(getText == 'title'){

                newEl = createTitle('New title', []);
    
            }else if(getText == 'text'){

                newEl = createContent('New content', []);
    
            }else if(getText == 'table'){

                newEl = createTable('', false);
    
            }else if(getText == 'image'){

                newEl = createImg('');

            }else if(getText == 'list'){

                newEl = createList(['List item','List item','List item'], []);
            }

            newTarget.after(newEl);
            newTarget.classList.remove('hover');
            pageResize();
        }
    }
})

document.addEventListener('dragover', function(e){
    e.preventDefault()
    e.stopPropagation()
    return false
})

document.addEventListener('dragenter', function(e){

    e.preventDefault()
    e.stopPropagation()

    if(currentPage){
        var border = document.querySelector('.currentPage').children[0];
        children = border.children;
        for(var i=0; i<children.length; i++){

            var newTarget = findTarget(e);
            console.log('aaa',newTarget);

            if(children[i]==newTarget){
                //不穩定
                newTarget.classList.add('hover');
            }
        }
    }
    return false
})

document.addEventListener('dragleave', function(e){

    e.preventDefault()
    e.stopPropagation()

    //選取 currentPage 的元件
    var border = document.querySelector('.currentPage').children[0];
    children = border.children;

    //尋找目標元件
    for(var i=0; i<children.length; i++){

        var newTarget = findTarget(e);
        
        if(children[i] == newTarget){
            newTarget.classList.remove('hover');
        }
    }
    return false
})

function findTarget(e){
    var newTarget;

    var tableTag = ['TBODY','TD','TR','TH','TT'];
    var imgTag = ['CENTER','IMG'];
    var listTag = ['OL','LI'];

    if(tableTag.includes(e.target.tagName)){
        newTarget = e.target.closest('.table-border');
    }else if(imgTag.includes(e.target.tagName)){
        newTarget = e.target.closest('.img-border');
    }else if(listTag.includes(e.target.tagName)){
        newTarget = e.target.closest('.list');
    }else{
        newTarget = e.target;
    }

    return newTarget;
}
