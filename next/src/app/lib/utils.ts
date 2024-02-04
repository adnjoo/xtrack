import { DateValueType } from 'react-tailwindcss-datepicker';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

// TODO: unit test
export async function calculateTZOffset(newValue: DateValueType) {
  // Get the time zone offset in minutes
  const tzOffsetInMinutes = new Date().getTimezoneOffset();

  // Apply the offset to startDate and endDate
  const adjustedStartDate = new Date(newValue?.startDate as string);
  adjustedStartDate.setMinutes(
    adjustedStartDate.getMinutes() + tzOffsetInMinutes
  );

  const adjustedEndDate = new Date(newValue?.endDate as string);
  adjustedEndDate.setMinutes(adjustedEndDate.getMinutes() + tzOffsetInMinutes);

  // convert back to ISO format
  adjustedStartDate.setHours(0, 0, 0, 0);
  adjustedEndDate.setHours(23, 59, 59, 999);

  // console.log(adjustedStartDate, adjustedEndDate);

  return { adjustedStartDate, adjustedEndDate };
};
