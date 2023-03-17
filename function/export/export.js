function createJSON(result){

    var data = { "pages":[]};

    //找出所有要放進 json 的元件
    var htmlPages = document.querySelectorAll('.page-border');
    //每個頁面
    for(var i=0; i<htmlPages.length; i++){

        data.pages.push({});

        var current = data.pages[i];
        var children = htmlPages[i].children;

        //頁面中每個元素
        for(var j=0; j<children.length; j++){

            //搜尋元件的 class name
            var name = children[j].className;

            if(name.includes('img-border')){

                current['img-'+Random()] = children[j].children[2].src;
            }
            else if(name.includes('content')){
                var newList =[children[j].innerText, children[j].style.color, children[j].style.fontSize, children[j].style.textAlign, children[j].style.fontStyle, children[j].style.fontWeight];
                current['content-'+Random()] = newList;
            }
            else if(name.includes('title')){
                var newList =[children[j].innerText, children[j].style.color, children[j].style.fontSize, children[j].style.textAlign, children[j].style.fontStyle, children[j].style.fontWeight];
                current['title-'+Random()] = newList;
            }
            else if(name.includes('list')){

                var value=[];
                for(var item=0; item<children[j].children.length; item++){
                    value.push(children[j].children[item].innerText);
                }
                var newList =[value, children[j].style.color, children[j].style.fontSize, children[j].style.textAlign, children[j].style.fontStyle, children[j].style.fontWeight];
                current['list-'+Random()] = newList;
            }
            else if(name.includes('table') && children[j].tagName=='DIV'){
                current['table-'+Random()] = children[j].getAttribute('name');
            }
        }
    }

    // console.log(data);
    var result = JSON.stringify(data, null, '\t');
    result = 'var struct = ' + result;
    // console.log(result);
    return result;
}

//寫入檔案
async function saveFile(result) {
    //writeFile格式
    const opts = {
        suggestedName: "structure",//預設檔名
        types: [{
            description: '',
            accept: {'application/JSON': ['.json']}
        }]
    };

    //要存檔的檔案名稱
    var newFile = await window.showSaveFilePicker(opts);

    //判斷有無開過 createWriter
    var writeFile;
    if (newFile.createWriter) {
        writeFile = await newFile.createWriter();
    }else{
        writeFile = await newFile.createWritable();
    }

    await writeFile.write(result);
    await writeFile.close();

    alert('資料已儲存！');
}

function download(){
    var temp = createJSON();
    // console.log(temp);
    saveFile(temp);
}