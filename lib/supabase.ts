import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadFile(
  file: File,
  folder: string = "client-files"
): Promise<{ url: string; error: null } | { url: null; error: string }> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("magnolia-files")
    .upload(filePath, file);

  if (error) {
    return { url: null, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from("magnolia-files")
    .getPublicUrl(filePath);

  return { url: urlData.publicUrl, error: null };
}

export async function deleteFile(fileUrl: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const url = new URL(fileUrl);
    const filePath = url.pathname.split("/magnolia-files/")[1];

    const { error } = await supabase.storage
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
