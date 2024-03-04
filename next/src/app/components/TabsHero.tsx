'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { WalletIcon } from '@heroicons/react/24/outline';
import { BsGraphUp } from 'react-icons/bs';

import ExpenseTable from '@/app/components/ExpenseTable';
import Tremor from '@/app/components/Tremor';

const tabs = [
  {
    label: 'Expenses',
    component: <ExpenseTable />,
    icon: () => <WalletIcon className='h-6 w-6' />,
  },
  {
    label: 'Analytics',
    component: <Tremor />,
    icon: () => <BsGraphUp className='h-6 w-6' />,
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
    <div className='mx-auto max-w-lg space-y-12'>
      <TabGroup>
        <TabList variant='line' defaultValue='1'>
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              value={tab.label}
              icon={tab.icon}
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
