import { supabase } from "@/integrations/supabase/client";

export const AVATAR_BUCKET = "volunteer-avatars";

/** Creates a temporary signed URL for a private volunteer avatar path. */
export async function signedUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage
    .from(AVATAR_BUCKET)
    .createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}
