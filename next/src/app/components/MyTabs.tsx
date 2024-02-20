'use client';

import React, { useRef, useState } from 'react';
import { Tabs, TabsRef } from 'flowbite-react';
import { HiCurrencyDollar, HiChartBar } from 'react-icons/hi';

export type MyTabsProps = {
  tab1: React.ReactNode;
  tab2: React.ReactNode;
};

export const MyTabs: React.FC<MyTabsProps> = ({ tab1, tab2 }) => {
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs
      aria-label='Default tabs'
      style='default'
      ref={tabsRef}
      onActiveTabChange={(tab) => setActiveTab(tab)}
    >
      <Tabs.Item active title='Expenses' icon={HiCurrencyDollar}>
        {tab1}
      </Tabs.Item>
      <Tabs.Item title='Analytics' icon={HiChartBar}>
        {tab2}
      </Tabs.Item>
    </Tabs>
  );
};

export default MyTabs;
