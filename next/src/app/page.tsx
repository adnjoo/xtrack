import OutlinedCard from "@/app/components/OutlinedCard";
import Card from "@/app/components/Card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 gap-10">
      <Card />
      <OutlinedCard />
    </main>
  );
}
