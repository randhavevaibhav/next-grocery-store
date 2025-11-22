import * as z from 'zod';


export const loginFormSchema = z.object({
 
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
   password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

export type loginFormValues = z.infer<typeof loginFormSchema>;


export const signupFormSchema = z.object({
 
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
   password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});

export type signupFormValues = z.infer<typeof loginFormSchema>;