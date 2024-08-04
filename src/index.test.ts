// 测试
import { tableToExcel } from './index';

test('test', () => {
  tableToExcel(
    {
      name: 'xxxx',
      header: [
        {
          name: 'test11123',
          height: 50,
          style: {
            alignment: {
              horizontal: 'center',
              vertical: 'middle',
            },
          },
        },
        {
          name: 'test1112312',
          height: 100,
          style: {
            alignment: {
              horizontal: 'center',
              vertical: 'middle',
            },
          },
        },
      ],
      columns: [
        {
          title: 'test1',
          dataIndex: 'xxx1',
          style: {
            alignment: {
              horizontal: 'center',
              vertical: 'middle',
            },
          },
        },
        {
          title: 'test2',
          dataIndex: 'xxx2',
          style: {
            alignment: {
              horizontal: 'center',
            },
          },
          children: [
            {
              title: 'test10',
              dataIndex: 'xxx3',
              width: 50,
              style: {
                alignment: {
                  horizontal: 'left',
                },
                numFmt: '0.00%',
              },
            },
            {
              title: 'test12',
              dataIndex: 'xxx4',
              width: 50,
              style: {
                alignment: {
                  horizontal: 'right',
                },
              },
            },
          ],
        },
        {
          title: 'test3',
          dataIndex: 'xxx5',
          style: {
            alignment: {
              horizontal: 'right',
            },
          },
        },
      ],
    },
    [
      {
        xxx1: 1,
        xxx2: 2,
        xxx3: 0.1,
        xxx4: 3,
        xxx5: 5,
      },
      {
        xxx1: 2,
        xxx2: 2,
        xxx3: 2,
        xxx4: 2,
        xxx5: 2,
      },
    ],
    {
      filename: 'testxxx',
    }
  );
});
