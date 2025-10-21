/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to convert to a slug
 * @returns A URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Generate a unique slug by appending a number if needed
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Create a slug from a course title
 * @param title - Course title
 * @param id - Optional ID to append for guaranteed uniqueness
 * @returns URL-friendly slug
 */
export function createCourseSlug(title: string, id?: number | string): string {
  const baseSlug = slugify(title);
  return id ? `${baseSlug}-${id}` : baseSlug;
}

/**
 * Create a slug from a blog title
 * @param title - Blog post title
 * @param id - Optional ID to append for guaranteed uniqueness
 * @returns URL-friendly slug
 */
export function createBlogSlug(title: string, id?: number | string): string {
  const baseSlug = slugify(title);
  return id ? `${baseSlug}-${id}` : baseSlug;
}
