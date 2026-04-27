import type {CampaignOutput} from "@/src/types/campaign";

function escapeCSVValue(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
    }  
    return value;
}   

export function campaignToCsv(output: CampaignOutput) {
  const rows = [["platform", "content_type", "content"]];

  if (output.x) rows.push(["x", "post", output.x.post]);

  if (output.linkedin) {
    rows.push(["linkedin", "hook", output.linkedin.hook]);
    rows.push(["linkedin", "post", output.linkedin.post]);
    rows.push(["linkedin", "cta", output.linkedin.cta]);
  }

  if (output.instagram) {
    rows.push(["instagram", "caption", output.instagram.caption]);
    rows.push(["instagram", "hashtags", output.instagram.hashtags.join(" ")]);
  }

  if (output.tiktok) {
    rows.push(["tiktok", "hook", output.tiktok.hook]);
    rows.push(["tiktok", "caption", output.tiktok.caption]);
  }

  if (output.pinterest) {
    rows.push(["pinterest", "title", output.pinterest.title]);
    rows.push(["pinterest", "description", output.pinterest.description]);
    rows.push(["pinterest", "keywords", output.pinterest.keywords.join(", ")]);
  }

  output.imagePrompts.forEach((prompt, index) => {
    rows.push(["visual", `image_prompt_${index + 1}`, prompt]);
  });

  return rows.map((row) => row.map(escapeCSVValue).join(",")).join("\n");
}

export function downloadCsv(output: CampaignOutput) {
  const csv = campaignToCsv(output);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "seed-to-social-campaign.csv";
  link.click();

  URL.revokeObjectURL(url);
}