'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@tremor/react';

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function LineChartHero() {
  const [mappedData, setMappedData] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any>([]);
  const { data } = useQuery<any>({
    queryKey: ['expenses'],
  });

  // console.log('data', data);
  // console.log('mappedData', mappedData);
  // console.log('categories', categories);

  React.useEffect(() => {
    if (data) {
      // Transform data
      const transformedData: any = {};

      // get categories
      const categories = data
        .map((item: any) => item.category)
        .filter(
          (item: any, index: any, self: any) => self.indexOf(item) === index
        );
      setCategories(categories);

      data.forEach((item: any) => {
        // Transform date into 'Mar 3' format
        const date = new Date(item.date); // Assuming 'date' is available in your data
        const formattedDate = date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        if (!transformedData[formattedDate]) {
          transformedData[formattedDate] = {};
        }

        transformedData[formattedDate][item.category || ''] = parseInt(
          item.amount
        );
      });

      // Convert transformedData object into an array
      const finalData = Object.keys(transformedData).map((date) => ({
        date,
        ...transformedData[date],
      }));

      // reverse date
      finalData.reverse();

      setMappedData(finalData);
    }
  }, [data]);

  return (
    <LineChart
      className='h-80'
      data={mappedData} // Use the transformed data
      index='date'
      categories={categories}
      colors={['indigo', 'rose', 'yellow', 'red', 'orange', 'amber']}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
      connectNulls
    />
  );
}
