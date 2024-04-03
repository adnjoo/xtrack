'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { WalletIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { BsGraphUp } from 'react-icons/bs';

import ExpenseTable from '@/app/components/organisms/ExpenseTable';
import LineChartHero from '@/app/components/organisms/LineChartHero';
import SubscriptionsHero from '@/app/components/organisms/SubscriptionsHero';

const tabs = [
  {
    label: 'Expenses',
    component: <ExpenseTable />,
    icon: () => <WalletIcon className='h-6 w-6' />,
  },
  {
    label: 'Analytics',
    component: <LineChartHero />,
    icon: () => <BsGraphUp className='h-6 w-6' />,
  },
  {
    label: 'Subscriptions',
    component: <SubscriptionsHero />,
    icon: () => <CreditCardIcon className='h-6 w-6' />,
  },
];

export type TabsHeroProps = {
  tabs: {
    label: string;
    component: JSX.Element;
    icon: JSX.Element;
  }[];
};

export default function TabsHero() {
  return (
    <div className='mx-auto max-w-lg space-y-12 sm:max-w-3xl'>
      <TabGroup>
        <TabList variant='line' defaultValue='1'>
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              value={tab.label}
              icon={tab.icon}
              className='focus:ring'
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab) => (
            <TabPanel key={tab.label}>{tab.component}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
