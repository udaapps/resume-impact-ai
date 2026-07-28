import { supabase } from "./supabase";

type GeneratedBullet = {
  id: number;
  text: string;
};

type AtsAnalysis = {
  score: number;
  rating: string;
  strengths: string[];
  suggestions: string[];
};

type SaveResumeHistoryInput = {
  userId: string;
  jobTitle: string;
  experienceLevel: string;
  resumeStyle: string;
  responsibility: string;
  bullets: GeneratedBullet[];
  atsAnalysis: AtsAnalysis | null;
};

export async function saveResumeHistory({
  userId,
  jobTitle,
  experienceLevel,
  resumeStyle,
  responsibility,
  bullets,
  atsAnalysis,
}: SaveResumeHistoryInput) {
  if (!bullets || bullets.length === 0) {
    throw new Error("Generated bullets are missing.");
  }

  const { data, error } = await supabase
    .from("resume_history")
    .insert({
      user_id: userId,
      job_title: jobTitle,
      experience_level: experienceLevel,
      resume_style: resumeStyle,
      responsibility,
      bullets: bullets,
      ats_analysis: atsAnalysis,
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      `Unable to save resume history: ${error.message}`
    );
  }

  return data;
}
export async function getResumeHistory(userId: string) {
  const { data, error } = await supabase
    .from("resume_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}