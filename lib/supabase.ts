import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment."
    );
  }
  _supabase = createClient(url, key);
  return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop];
  },
});

export async function uploadFile(
  file: File,
  folder: string = "client-files"
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const client = getSupabase();
  const { data, error } = await client.storage
    .from("magnolia-files")
    .upload(filePath, file);

  if (error) {
    return { url: null, error: error.message };
  }

  const { data: urlData } = client.storage
    .from("magnolia-files")
    .getPublicUrl(filePath);

  return { url: urlData.publicUrl, error: null };
}

export async function deleteFile(fileUrl: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const url = new URL(fileUrl);
    const filePath = url.pathname.split("/magnolia-files/")[1];

    const { error } = await getSupabase().storage
      .from("magnolia-files")
      .remove([filePath]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Invalid file URL" };
  }
}
