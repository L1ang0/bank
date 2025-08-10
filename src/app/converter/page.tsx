'use client'

import { useState } from 'react'
import Header from '@/components/header'
import SideNav from '@/components/sideNav'
import CurrencyConverter from '@/components/CurrencyConverter'
import RightSidebar from '@/components/RightSidebar'
import useCurrencyData from '@/hooks/useCurrencyConverter'

export default function HomePage() {
  const [sideOpen, setSideOpen] = useState(false);
  const {
    data,
    isLoading,
    isError,
    nbrbConverter,
    buyConverter,
    sellConverter
  } = useCurrencyData();

  return (
    <div className="flex flex-col h-screen w-screen lg:overflow-hidden">
    <Header onMenuClick={() => setSideOpen(!sideOpen)} />

      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
        <SideNav open={sideOpen} onClose={() => setSideOpen(false)} />

        <div className="block lg:hidden w-full">
          <RightSidebar 
            rates={data?.rates ?? {}} 
            currenciesList={data?.currencies ?? []} 
          />
        </div>

        <main className="flex-1 overflow-y-auto">
          <CurrencyConverter
            isLoading={isLoading}
            isError={isError}
            currenciesList={data?.currencies ?? []}
            nbrbConverter={nbrbConverter}
            buyConverter={buyConverter}
            sellConverter={sellConverter}
          />
        </main>

        <div className="hidden lg:block h-full overflow-y-hidden">
          <RightSidebar 
            rates={data?.rates ?? {}} 
            currenciesList={data?.currencies ?? []} 
          />
        </div>
      </div>
    </div>

  );
}