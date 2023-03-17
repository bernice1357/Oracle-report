from bs4 import BeautifulSoup 
import json
import click

@click.command()
@click.option('-h', required=True, help='HTML 原始檔路徑')
@click.option('-i', required=True , help='要引入的 JSON 檔路徑')

def getPath(h, i):
    importJson(h, i)

def importJson(h, i):

    # read sample.html
    with open(h) as fp:
        content = BeautifulSoup(fp, 'html.parser')

    # open json
    with open(i, 'r') as f:
        data = f.read()
        data = data[17:]
        table_dic = json.loads(data)

    # 用標題找表格
    result_dic = {}
    for item in table_dic['tables']:

        tableName = item['name']
        title = ''

        # 先找到對應的標題
        for t in content.body.select('font > b'):
            if t.text == tableName:
                title = t

        # 表格名稱加上 _
        name = tableName.replace(' ', '_')

        # 這個標題的兩個表格都需要
        if tableName == 'PGA Target Advice':
            result_dic['PGA_Target_Advice_1'] = str(title.findNext('table')).replace('\n','').replace('\t','')
            result_dic['PGA_Target_Advice_2'] = str(title.findNext('table').findNext('table')).replace('\n','').replace('\t','')
        
        elif tableName == 'Initialization Parameters':
            result_dic['Initialization_Parameters'] = str(title.findNext('table').findNext('table')).replace('\n','').replace('\t','')

        # 所有欄位都需要的表格
        elif item['column'] == 'all':
            result_dic[name] = str(title.findNext('table')).replace('\n','').replace('\t','')

        # 只需特定表格
        else:
            result = title.findNext('table')
            temp = 0
            for row in result.findAll('tr'): # row -> tr

                new_list = ''
                # header
                if temp == 0:
                    for i in item['column']:
                        new_list += str(row.findAll('th')[i])
                    temp = 1

                # content
                else:
                    for i in item['column']:
                        new_list += str(row.findAll('td')[i])
                
                row.clear()
                row.append(BeautifulSoup(new_list, 'html.parser'))

            # 讀到的資料存入 result_dic
            result_dic[name] = str(result).replace('\n','').replace('\t','')

    # 寫檔可以讓 js 讀取
    fp = open('./table.json', "w")
    fp.write("var content = "+ str(result_dic))
    fp.close()

if __name__ == '__main__':
    getPath()