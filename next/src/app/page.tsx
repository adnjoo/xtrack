"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import MySpeedDial from "@/app/components/MySpeedDial";
import ExpenseTable from "@/app/components/ExpenseTable";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const res = await axios
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

  return (
    <>
      <section className="">
        <ExpenseTable data={data} />
      </section>
      {isSignedIn && <MySpeedDial />}
    </>
  );
}
