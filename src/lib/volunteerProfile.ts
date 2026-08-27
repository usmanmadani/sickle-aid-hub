import { supabase } from "@/integrations/supabase/client";

export type ProfileLike = {
  bio?: string | null;
  skills?: string | null;
  state?: string | null;
  city?: string | null;
  availability_days?: string[] | null;
  availability_hours?: string | null;
  avatar_url?: string | null;
} | null;

export type SectionKey = "bio" | "skills" | "availability" | "location" | "photo";

export type SectionStatus = {
  key: SectionKey;
  label: string;
  done: boolean;
  hint: string;
};

/** Section-by-section completeness for a volunteer profile. */
export function profileSections(profile: ProfileLike): SectionStatus[] {
  const bio = (profile?.bio ?? "").trim();
  const skills = (profile?.skills ?? "").trim();
  const days = profile?.availability_days ?? [];
  const state = (profile?.state ?? "").trim();

  return [
    {
      key: "bio",
      label: "Bio",
      done: bio.length >= 40,
      hint: bio.length === 0 ? "Add a short bio about yourself" : "Expand your bio to at least 40 characters",
    },
    {
      key: "skills",
      label: "Skills",
      done: skills.length > 0,
      hint: "List a few skills you can bring to outreach",
    },
    {
      key: "availability",
      label: "Availability",
      done: days.length > 0,
      hint: "Pick the days you are available",
    },
    {
      key: "location",
      label: "Location",
      done: state.length > 0,
      hint: "Select the state where you can volunteer",
    },
    {
      key: "photo",
      label: "Photo",
      done: !!profile?.avatar_url,
      hint: "Upload a clear headshot",
    },
  ];
}

export function profileCompleteness(profile: ProfileLike) {
  const sections = profileSections(profile);
  const done = sections.filter((s) => s.done).length;
  return {
    sections,
    missing: sections.filter((s) => !s.done),
    percent: Math.round((done / sections.length) * 100),
  };
}

export const SECTION_LABELS: Record<string, string> = {
  bio: "Bio",
  skills: "Skills",
  availability: "Availability",
  location: "Location",
  photo: "Profile photo",
};

export type HistoryRow = {
  id: string;
  section: string;
  detail: string | null;
  created_at: string;
};

/** Appends one entry per changed section to the profile edit history. */
export async function logProfileChanges(
  userId: string,
  entries: { section: SectionKey; detail?: string | null }[]
) {
  if (entries.length === 0) return;
  await supabase.from("volunteer_profile_history").insert(
    entries.map((e) => ({ user_id: userId, section: e.section, detail: e.detail ?? null }))
  );
}
