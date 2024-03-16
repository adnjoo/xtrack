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
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchAI = async () => {
    setIsLoading(true);

    if (!mappedData || mappedData.length === 0) {
      return;
    }

    let queryString = '';

    mappedData.forEach((item: any, index: number) => {
      const { date, ...categories } = item;

      Object.keys(categories).forEach((category) => {
        if (categories[category] > 0) {
          queryString += `${date} ${category} ${categories[category]}, `;
        }
      });
    });

    // Remove the trailing comma and space
    queryString = queryString.slice(0, -2);

    // Send the query to the API
    try {
      const query =
        'total expenses by category, and suggest how to improve: ' +
        queryString;
      const response = await axios.get(`/api?query=${query}`);
      setAItext(response.data);
    } catch (error) {
      console.error('Error fetching AI data:', error);
      setAItext('Error fetching AI data');
    } finally {
      setIsLoading(false);
    }
  };

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

      <button
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() => fetchAI()}
      >
        Get AI
      </button>
      {isLoading && <div>Loading...</div>}
      {aiText && <div className='rounded-lg bg-gray-100 p-4'>{aiText}</div>}
    </>
  );
}
