type EventPayload = {
  eventName: string;
  metadata?: Record<string, unknown>;
};

export function trackEvent({ eventName, metadata = {} }: EventPayload) {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("seed_to_social_events");
  const events = existing ? JSON.parse(existing) : [];

  events.push({
    eventName,
    metadata,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("seed_to_social_events", JSON.stringify(events));
}

export function getEvents() {
  if (typeof window === "undefined") return [];

  const existing = localStorage.getItem("seed_to_social_events");
  return existing ? JSON.parse(existing) : [];
}