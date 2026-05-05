import { supabase } from "@/src/lib/supabase";
import type { CampaignOutput, Platform, Tone } from "@/src/types/campaign";

const GENERATIONS_STORAGE_KEY = "seed_to_social_generations";

type SaveGenerationInput = {
  seed: string;
  audience: string;
  tone: Tone;
  platforms: Platform[];
  output: CampaignOutput;
};

function saveGenerationLocally(input: SaveGenerationInput) {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem(GENERATIONS_STORAGE_KEY);
  const generations = existing ? JSON.parse(existing) : [];

  generations.push({
    ...input,
    created_at: new Date().toISOString(),
  });

  localStorage.setItem(GENERATIONS_STORAGE_KEY, JSON.stringify(generations));
}

export async function saveGeneration(input: SaveGenerationInput) {
  const { error } = await supabase.from("generations").insert({
    seed_text: input.seed,
    audience: input.audience,
    tone: input.tone,
    platforms: input.platforms,
    output: input.output,
  });

  if (error) {
    saveGenerationLocally(input);

    if (error.code !== "42501") {
      console.error("Failed to save generation:", error);
    }
  }
}