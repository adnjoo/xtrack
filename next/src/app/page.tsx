"use client";

import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import MySpeedDial from "@/app/components/MySpeedDial";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const { getToken } = useAuth();

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
      <section className="flex flex-col items-center justify-between p-24 gap-10">
        {data?.length > 0 &&
          data?.map((data: any) => (
            <div key={data.id}>
              {data.title} {data.amount} {data.description}{" "}
              {new Date(data.date).toLocaleDateString()}
            </div>
          ))}
      </section>
      <MySpeedDial />
    </>
  );
}
