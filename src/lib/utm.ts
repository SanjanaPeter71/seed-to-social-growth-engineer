export type UtmData = {
    source?: string;
    medium?: string;
    campaign?: string;
};

const UTM_STORAGE_KEY = "seed_to_social_utm";

export function captureUtm() {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const utmData: UtmData = {
        source: params.get("utm_source") || undefined,
        medium: params.get("utm_medium") || undefined,
        campaign: params.get("utm_campaign") || undefined,
    };

    if (utmData.source || utmData.medium || utmData.campaign) {
        localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData));
    }
}

export function getUtm(): UtmData {
    if (typeof window === "undefined") return {};

    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as UtmData) : {};
}
