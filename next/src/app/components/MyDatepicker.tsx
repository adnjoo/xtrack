'use client';
import React, { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

export default function MyDatepicker() {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  return (
    <div className='mt-8 max-w-md'>
      <Datepicker asSingle value={value} onChange={handleValueChange} />
    </div>
  );
}
