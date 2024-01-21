"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/clerk-react";

import OutlinedCard from "@/app/components/OutlinedCard";
import Card from "@/app/components/Card";

export default function Home() {
  const [data, setData] = useState<any>("");
  const { getToken } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const res = axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/expenses` as string, {
          headers: { Authorization: `Bearer ${await getToken()}` },
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchData();
  }, []);

  const dateConversion = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <Card />
      <OutlinedCard />
      {data &&
        data.map((data: any) => (
          <div key={data.id}>
            {data.description} {data.amount} {dateConversion(data.date)}
          </div>
        ))}
      <UserButton />
    </main>
  );
}
