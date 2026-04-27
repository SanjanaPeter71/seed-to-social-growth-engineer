import { NextResponse } from "next/server";
import { mockGenerate } from "@/src/lib/mockGenerate";
import type {Platform, Tone } from "@/src/types/campaign";

export async function POST(request: Request){
    try{
        const body = await request.json();

        const seed = String(body.seed || "").trim();
        const audience = String(body.audience || "").trim();
        const tone = String(body.tone || "").trim() as Tone;
        const platforms = (body.platforms || []).map((p: string) => p.trim() as Platform);

        if(!seed){
            return NextResponse.json({
                error: "Seed idea is required"
            }, { status: 400 });
        }

        if(!Array.isArray(platforms) || platforms.length === 0) {
            return NextResponse.json({
                error: "At least one platform is required"
            }, { status: 400 });
        }

        const output = mockGenerate({
            seed, audience, tone, platforms
        });

        if(output.x){
            output.x.characterCount = output.x.post.length;
        }

        return NextResponse.json({output})
    } catch (error) {    
        return NextResponse.json({
            error: "An error occurred while generating the output"
        }, { status: 500 });
    } 
}