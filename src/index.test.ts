// 测试
import { tableToExcel } from './index';

test('test', () => {
  tableToExcel([
    {
      sheet: {
        name: 'test',
        header: ['姓名1231232', '年龄'],
        columns: [
          {
            title: '姓名',
            width: 50,
            dataIndex: 'name',
            children: [
              {
                title: '姓名1',
                dataIndex: 'name1',
              },
              {
                title: '姓名1',
                dataIndex: 'name1',
              },
              {
                title: '姓名2',
                dataIndex: 'name2',
              },
            ],
          },
          {
            title: '姓名2',
            dataIndex: 'name2',
            children: [
              {
                title: '姓名1',
                dataIndex: 'name1',
              },
              {
                title: '姓名2',
                dataIndex: 'name2',
              },
            ],
          },
        ],
      },
      source: [
        {
          name: 'test',
          name2: 'test2',
        },
        {
          name: 'test',
          name2: 'test2',
        },
      ],
      options: {
        onRow(row, index) {
          if (index === 0) {
            return {
              height: 100,
            };
          }
          return {
            height: 50,
          };
        },
      },
    },
  ]);
});
