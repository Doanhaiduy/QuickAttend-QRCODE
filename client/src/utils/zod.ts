import { z } from 'zod';
import { Regex } from '../helpers';

type passwordType = 'Login' | 'SignUp';

export const schemasCustom: {
    fullName: z.ZodString;
    email: z.ZodString;
    password: (type: passwordType) => z.ZodString;
    confirmPassword: z.ZodString;
} = {
    fullName: z
        .string({
            required_error: 'Full Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .regex(Regex.fullName, {
            message: 'Full Name is not valid',
        })
        .min(1, {
            message: 'Full Name is required',
        })
        .trim(),

    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is not valid' }),

    password: (type: passwordType) => {
        if (type === 'Login') {
            return z.string().min(1, { message: 'Password is required' });
        }
        return z.string().min(8, { message: 'Password must contain at least 8 characters' }).regex(Regex.password, {
            message: 'Password must contain at least 1 letter and 1 number',
        });
    },

    confirmPassword: z.string().min(8),
};
