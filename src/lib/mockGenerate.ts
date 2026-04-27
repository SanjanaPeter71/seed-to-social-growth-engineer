import type { CampaignOutput, Platform, Tone } from "@/src/types/campaign";

type GenerateInput = {
  seed: string;
  audience: string;
  tone: Tone;
  platforms: Platform[];
};

export function mockGenerate(input: GenerateInput): CampaignOutput {
  const { seed, audience } = input;

  return {
    x: input.platforms.includes("x")
      ? {
          post: `Most ${audience || "creators"} don't need more ideas. They need a system to turn one idea into many useful posts. Start with this: ${seed.slice(
            0,
            80
          )}`,
          characterCount: 0,
        }
      : undefined,

    linkedin: input.platforms.includes("linkedin")
      ? {
          hook: "Most people waste their best ideas.",
          post: `A single idea can become a full content campaign if you treat it like a system.\n\nSeed idea:\n${seed}\n\nFor ${
            audience || "creators"
          }, the advantage is not creating more. It is distributing better.`,
          cta: "What is one idea you could repurpose this week?",
        }
      : undefined,

    instagram: input.platforms.includes("instagram")
      ? {
          caption: `One idea. Multiple platforms. Better distribution.\n\n${seed}`,
          hashtags: ["#contentcreation", "#creatorgrowth", "#socialmediatips"],
        }
      : undefined,

    tiktok: input.platforms.includes("tiktok")
      ? {
          hook: "You are wasting your best content ideas.",
          caption: `Turn one raw thought into multiple posts instead of starting from zero every time.`,
        }
      : undefined,

    pinterest: input.platforms.includes("pinterest")
      ? {
          title: "How to Turn One Idea Into Multiple Social Media Posts",
          description:
            "A practical workflow for creators who want to repurpose one idea into platform-ready content for LinkedIn, X, Instagram, TikTok, and Pinterest.",
          keywords: ["content repurposing", "social media workflow", "creator tools"],
        }
      : undefined,

    imagePrompts: [
      "A clean desk with sticky notes, a laptop, and social media content cards floating above the screen.",
    ],
  };
}