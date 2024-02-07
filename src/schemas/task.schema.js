import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Title Is Required'
    }),

    description: z.string({
        required_error: 'Description Is Required'
    }),

    date: z.string().datetime().optional()
})