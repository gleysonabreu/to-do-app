'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateTagHelper(tag: string) {
  revalidateTag(tag);
}
