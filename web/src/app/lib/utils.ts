import { DateValueType } from 'react-tailwindcss-datepicker';

import { SortOrder } from './constants';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4001';

/**
 * Returns a string of space-separated class names, filtering out any undefined or empty strings.
 *
 * @param {string | undefined} classes - The list of class names to be concatenated.
 * @return {string} The concatenated class names.
 */
export const classNames = (...classes: (string | undefined)[]) => {
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
}

/**
 * Sorts expenses by date based on the specified sort order.
 *
 * @param {any[]} expenses - The array of expenses to be sorted.
 * @param {SortOrder} sortOrder - The sort order to be applied.
 * @return {any[]} The sorted array of expenses.
 */

export const sortExpensesByDate = (expenses: any, sortOrder: SortOrder) => {
  if (sortOrder === SortOrder.DESC) {
    return expenses.sort(
      (a: any, b: any) => +new Date(b.date) - +new Date(a.date)
    );
  } else {
    return expenses.sort(
      (a: any, b: any) => +new Date(a.date) - +new Date(b.date)
    );
  }
};
