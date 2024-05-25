import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

async function getData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main className='grid grid-cols-1 gap-4 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {data.map((d: any) => (
        <Card key={d.id}>
          <CardHeader>
            <CardTitle>{d.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{d.title}</p>
            <p>{d.completed ? "Completed" : "Not Completed"}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  );
}
