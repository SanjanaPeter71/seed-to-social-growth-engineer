import { supabase } from "./supabase";
import { getUtm, type UtmData } from "./utm";

export type EventPayload = {
  eventName: string;
  metaData?: Record<string, unknown>;
  path?: string;
  timestamp?: string;
  utm?: UtmData;
};

type DbEventRow = {
  id?: string;
  event_name?: string;
  meta_data?: Record<string, unknown>;
  path?: string;
  utm?: UtmData;
  created_at?: string;
};

export async function trackEvent({ eventName, metaData = {} }: EventPayload) {
  if (typeof window === "undefined") return;


  // const existing = localStorage.getItem("seed_to_social_events");
  // const events: EventPayload[] = existing ? JSON.parse(existing) : [];

  // events.push({
  //   eventName,
  //   metaData,
  //   path: window.location.pathname,
  //   timestamp: new Date().toISOString(),
  //   utm,
  // });

  // localStorage.setItem("seed_to_social_events", JSON.stringify(events));

  try {
    const utm = getUtm();

    await supabase.from("events").insert({
      event_name: eventName,
      path: window.location.pathname,
      utm,
      meta_data: metaData,
    });
  } catch(e){
    // Keep local analytics working even when remote write fails.
    console.log(e);
  }
}

export function getEvents(): EventPayload[] {
  if (typeof window === "undefined") return [];

  const existing = localStorage.getItem("seed_to_social_events");
  return existing ? (JSON.parse(existing) as EventPayload[]) : [];
}


export async function getDbEvents(): Promise<DbEventRow[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  const rows = (data ?? []) as DbEventRow[];

  return rows.map((row) => ({
    id: row.id,
    eventName: row.event_name ?? "unknown_event",
    metaData: row.meta_data,
    path: row.path,
    utm: row.utm,
    created_at: row.created_at,
    timestamp: row.created_at,
  }));
}