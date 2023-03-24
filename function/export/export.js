function createJSON(result){

    var data = { "pages":[]};

    //找出所有要放進 json 的元件
    var htmlPages = document.querySelectorAll('.page-border');
    //每個頁面
    for(var i=0; i<htmlPages.length; i++){

        data.pages.push({});

        var current = data.pages[i];
        var borders = htmlPages[i].children;

        //頁面中每個元素
        for(var j=0; j<borders.length; j++){

            //搜尋元件的 class name
            var borderName = borders[j].className;
            console.log(borderName);

            if(borderName.includes('img-border')){
                
                current['img-'+Random()] = borders[j].children[2].src;
            }
            else if(borderName.includes('table-border')){
                current['table-'+Random()] = borders[j].getAttribute('name');
            }
            else if(borderName.includes('comp-border')){

                var child = borders[j].children[0];

                if(child.className.includes('content')){

                    var newList =[
                        child.innerText, 
                        child.style.color, 
                        child.style.fontSize, 
                        child.style.textAlign, 
                        child.style.fontStyle, 
                        child.style.fontWeight
                    ];
                    current['content-'+Random()] = newList;
                }
                else if(child.className.includes('title')){

                    var newList =[
                        child.innerText, 
                        child.style.color, 
                        child.style.fontSize, 
                        child.style.textAlign, 
                        child.style.fontStyle, 
                        child.style.fontWeight
                    ];
                    current['title-'+Random()] = newList;
                }
                else if(child.className.includes('list')){

                    var value=[];
                    for(var item=0; item<child.children.length; item++){
                        value.push(child.children[item].innerText);
                    }
                    var newList =[
                        value, 
                        child.style.color, 
                        child.style.fontSize, 
                        child.style.textAlign, 
                        child.style.fontStyle, 
                        child.style.fontWeight, 
                        child.style.listStyleType
                    ];
                    current['list-'+Random()] = newList;
                }
            }
        }
    }

    var result = JSON.stringify(data, null, '\t');
    result = 'var struct = ' + result;
    console.log(result);
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
    saveFile(temp);
}