import type { CampaignOutput } from "@/src/types/campaign";

export function validateCampaign(output: CampaignOutput) {
  const warnings: string[] = [];

  if (output.x && output.x.post.length > 280) {
    warnings.push(`X post is ${output.x.post.length} characters. Limit is 280.`);
  }

  if (output.pinterest?.title && output.pinterest.title.length > 100) {
    warnings.push("Pinterest title is over 100 characters.");
  }

  if (output.pinterest?.description && output.pinterest.description.length > 500) {
    warnings.push("Pinterest description is over 500 characters.");
  }

  if (output.instagram && output.instagram.hashtags.length > 15) {
    warnings.push("Instagram has too many hashtags. Keep it tighter.");
  }

  if (output.linkedin && !output.linkedin.cta) {
    warnings.push("LinkedIn post is missing a CTA.");
  }

  return warnings;
}