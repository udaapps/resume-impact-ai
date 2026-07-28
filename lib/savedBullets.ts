import { supabase } from "./supabase";

export type SavedBullet = {
  id: string;
  user_id: string;
  bullet: string;
  favorite: boolean;
  created_at: string;
};

export async function saveBullet(
  userId: string,
  bulletText: string
): Promise<SavedBullet> {
  const cleanBullet = bulletText.trim();

  if (!cleanBullet) {
    throw new Error("Bullet text is empty.");
  }

  const { data, error } = await supabase
    .from("saved_bullets")
    .insert({
      user_id: userId,
      bullet: cleanBullet,
      favorite: false,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("This bullet is already saved.");
    }

    throw new Error(
      `Unable to save bullet: ${error.message}`
    );
  }

  return data as SavedBullet;
}

export async function getSavedBullets(
  userId: string
): Promise<SavedBullet[]> {
  const { data, error } = await supabase
    .from("saved_bullets")
    .select("*")
    .eq("user_id", userId)
    .order("favorite", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(
      `Unable to load saved bullets: ${error.message}`
    );
  }

  return (data ?? []) as SavedBullet[];
}

export async function toggleBulletFavorite(
  bulletId: string,
  favorite: boolean
): Promise<SavedBullet> {
  const { data, error } = await supabase
    .from("saved_bullets")
    .update({
      favorite: !favorite,
    })
    .eq("id", bulletId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Unable to update favorite: ${error.message}`
    );
  }

  return data as SavedBullet;
}

export async function deleteSavedBullet(
  bulletId: string
): Promise<void> {
  const { error } = await supabase
    .from("saved_bullets")
    .delete()
    .eq("id", bulletId);

  if (error) {
    throw new Error(
      `Unable to delete bullet: ${error.message}`
    );
  }
}