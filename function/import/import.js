//get page structure from structure.json

//新增目錄
function createMenu(count){
    
    //建立 menu div
    let indexPage = document.querySelector('#page-2 > .page-border');
    var menu = document.createElement('div');
    menu.setAttribute('class','menu');
    indexPage.appendChild(menu);
    
    //建立目錄裡的每條
    var pageCount = count;
    for(var page in struct['pages']){

        if(struct['pages'][page]['title']=='封面') continue;
    
        //建立 a 元素
        var a = document.createElement('a');
        a.href = '#page-' + pageCount++;
        a.innerHTML = struct['pages'][page]['title'];
        menu.appendChild(a);
    
        var br = document.createElement('br');
        menu.appendChild(br);
    }
}

function addPage(count, page){
    
    //新增分頁div
    var pageDiv = document.createElement('div');
    pageDiv.setAttribute('class','page');
    pageDiv.setAttribute('id','page-'+count);

    var border = document.createElement('div');
    border.setAttribute('class','page-border');

    pageDiv.appendChild(border);
    body.appendChild(pageDiv);

    //item=title, table...
    var onepage = struct['pages'][page]
    for(var item in onepage){

        //structure裡的value
        var pageData = onepage[item];
        var child;

        //標題
        if(item.includes('title')){
            var value = pageData[0];
            pageData.shift();
            child = createTitle(value, pageData);

            // console.log(pageData)
            
        //表格
        }else if(item.includes('table')){
            child = createTable(pageData, false);
            
        //文字
        }else if(item.includes('content')){
            var value = pageData[0];
            pageData.shift();

            child = createContent(value, pageData);

        //有序列表
        }else if(item.includes('list')){
            var value = pageData[0];
            pageData.shift();

            child = createList(value, pageData);

        //圖片
        }else if(item.includes('img')){
            child = createImg(pageData);
        }
        border.appendChild(child);
    }
}

//page=每頁
count = 1;
//表格 id 變數
var tableCount = 1;

var body = document.querySelector('body');
for(var i=0; i<struct['pages'].length; i++){
    addPage(count++, i);
}

count = 1;
createMenu(count);
