export type Tone = "educational" | "entertaining" | "inspirational" | "persuasive" | "humorous" | "professional";

export type Platform  = "pinterest" |"x" | "linkedin" | "instagram" | "tiktok";

export type CampaignOutput = {
    x?: {
        post: string;
        characterCount: number;
    };
    linkedin?: {
        hook: string;
        post: string;
        cta: string;
    };
    instagram?: {
        caption: string;
        hashtags: string[];
    };
    tiktok?: {
        hook: string;
        caption:string;
    };
    pinterest?: {
        title: string;
        description: string;
        keywords: string[];
    };
    imagePrompts: string[];
};