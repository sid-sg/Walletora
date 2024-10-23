'use client';
import InputField from "@repo/ui/inputfield";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

const SignInPage = () => {
    const router = useRouter();
    const session = useSession();
    const [postInputs, setPostInputs] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);
    function getErrorMessage(error: string) {
        switch (error) {
            case 'CredentialsSignin':
                return 'Invalid email or password.';
            case 'NoUser':
                return 'No user found with the provided email.';
            case 'InvalidPassword':
                return 'Invalid password.';
            default:
                return 'An unexpected error occurred.';
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                redirect: false,  
                email: postInputs.email,
                plainPassword: postInputs.password
            });

            if (res?.error) {
                setErrors({ other: res.error });
                setLoading(false);
                return;
            }

            router.push('/dashboard'); 
        }
        catch (error) {
            console.error("Error during sign-in:", error);
            setErrors({ other: 'An error occurred during sign-in. Please try again later.' });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <Appbar/>
            <div className='flex items-center justify-center h-screen'>
                <div className='bg-gray-900 rounded text-white flex flex-col pt-2 pb-3 px-4 w-64 md:w-80 lg:w-96'>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            type='email'
                            label='Email'
                            placeholder='johndoe@gmail.com'
                            value={postInputs.email}
                            onChange={(e:any) => setPostInputs({ ...postInputs, email: e.target.value })}
                            error={errors.email}
                        />
                        <InputField
                            type='password'
                            label='Password'
                            placeholder='•••••••••'
                            value={postInputs.password}
                            onChange={(e:any) => setPostInputs({ ...postInputs, password: e.target.value })}
                            error={errors.password}
                        />
                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                disabled={loading}
                                className={`text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-slate-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                        {errors.other && (
                            <p className='text-red-500 mt-2 text-center'>{getErrorMessage(errors.other)}</p>
                        )}
                    </form>

                    <div className='text-white mt-2 text-sm text-center'>
                        <p>
                            Don’t have an account?{' '}
                            <span className='underline'>
                                <Link href='/sign-up'>Sign up</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
