import z from 'zod';
// import { SortOrder } from '../../generated/prisma/internal/prismaNamespace';

export const addBlogSchema = z.object({
        place_name: z.string().trim().min(3).max(45),
        review: z.string().trim().min(3).max(45),
        cost: z.coerce.number(),
});

// export const updateBlogSchema = z.object({
//         place_name: z.string().trim().min(3).max(45).optional(),
//         review: z.string().trim().min(3).max(45).optional(),
// });

// or method for update blog .partial()
export const updateBlogSchema = addBlogSchema.partial();

export const allBlogsQueryScheme = z
        .object({
                filterType: z.enum(['all', 'my']),
                searchTerm: z.string().trim(),
                sortOrder: z.enum(['asc', 'desc']),
        })
        .partial();
