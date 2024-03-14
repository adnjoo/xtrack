'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LineChart } from '@tremor/react';
import axios from 'axios';

const dataFormatter = (number: number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function LineChartHero() {
  const [mappedData, setMappedData] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any>([]);
  const { data } = useQuery<any>({
    queryKey: ['expenses'],
  });
  const [aiText, setAItext] = React.useState<string>('');

  const fetchAI = async () => {
    // convert to something like Mar 01 Entertainment xx Eating out xx, Mar 02 Eating out xx, etc.
  };

  React.useEffect(() => {
    if (!mappedData) {
      return;
    }

    // fetchAI();
  }, [mappedData]);

  React.useEffect(() => {
    if (data) {
      const transformedData: any = {};

      const categories = data
        .map((item: any) => item.category)
        .filter(
          (item: any, index: any, self: any) => self.indexOf(item) === index
        );
      setCategories(categories);

      data.forEach(({ date, category, amount }: any) => {
        const formattedDate = new Date(date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
        });

        if (!transformedData[formattedDate]) {
          transformedData[formattedDate] = {
            date: formattedDate,
            [category]: 0,
          };
        }

        if (typeof transformedData[formattedDate][category] !== 'number') {
          transformedData[formattedDate][category] = 0;
        }

        transformedData[formattedDate][category] += parseInt(amount);
      });

      const finalData = Object.values(transformedData);

      finalData.reverse();

      setMappedData(finalData);
    }
  }, [data]);

  return (
    <>
      <LineChart
        className='h-80'
        data={mappedData}
        index='date'
        categories={categories}
        colors={['indigo', 'rose', 'yellow', 'red', 'orange', 'amber']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
        connectNulls
      />

      {aiText && <p>{aiText}</p>}
    </>
  );
}
