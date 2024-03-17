import { Table } from 'flowbite-react';

export const SkeletonTable = () => {
  return (
    <Table hoverable striped>
      <Table.Head className='animate-pulse'>
        {[...Array(6)].map((_, i) => (
          <Table.HeadCell key={i}>
            <div className='h-4 w-40 rounded bg-gray-300 dark:bg-gray-400'></div>
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body>
        {[...Array(10)].map((_, i) => (
          <Table.Row
            className='animate-pulse bg-white dark:border-gray-700 dark:bg-gray-800'
            key={i}
          >
            <Table.Cell>
              <div className='h-4 w-40 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
            <Table.Cell>
              <div className='h-4 w-20 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
            <Table.Cell>
              <div className='h-4 w-20 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
            <Table.Cell>
              <div className='h-4 w-20 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
            <Table.Cell>
              <div className='h-4 w-20 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
            <Table.Cell>
              <div className='h-4 w-20 rounded bg-gray-300 dark:bg-gray-400'></div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
