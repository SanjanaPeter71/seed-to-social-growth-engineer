"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/src/lib/tracking";

type TrackedEvent = {
  eventName: string;
  path: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export default function DashboardPage() {
  const [events, setEvents] = useState<TrackedEvent[]>([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const count = (eventName: string) =>
    events.filter((event) => event.eventName === eventName).length;

  const started = count("generator_started");
  const completed = count("generation_completed");
  const exported = count("csv_exported");

  const completionRate = started ? Math.round((completed / started) * 100) : 0;
  const exportRate = completed ? Math.round((exported / completed) * 100) : 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-4xl font-bold">Growth Dashboard</h1>
        <p className="mt-3 text-zinc-400">
          Local analytics for the Seed-to-Social funnel.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric title="Generator starts" value={started} />
          <Metric title="Generations" value={completed} />
          <Metric title="CSV exports" value={exported} />
          <Metric title="Export rate" value={`${exportRate}%`} />
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-lg font-semibold">Recent events</h2>
          <div className="space-y-3">
            {events.slice().reverse().map((event, index) => (
              <div key={index} className="rounded-xl bg-zinc-950 p-3 text-sm">
                <p className="font-medium">{event.eventName}</p>
                <p className="text-zinc-500">{event.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}