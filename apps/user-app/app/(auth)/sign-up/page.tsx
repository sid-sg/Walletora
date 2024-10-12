'use client'
import InputField from "@repo/ui/inputfield";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Appbar } from "@repo/ui/appbar";
import { useSession } from "next-auth/react";

const Page = () => {
    const router = useRouter();
    const [postInputs, setPostInputs] = useState({
        name: "",
        email: "",
        plainPassword: ""
    });
    const session = useSession();
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            const res = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postInputs)
            });

            // console.log(res);
            const data = await res.json();

            if (!res.ok) {
                setErrors({ other: data.message });
                setLoading(false);
                return;
            }

            alert('Sign-up successful! Redirecting to sign-in page.');
            router.push('/sign-in');
        }
        catch (error) {
            console.error("Error during sign-up:", error);
            setErrors({ other: 'An error occurred during sign-up. Please try again later.' });
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <Appbar user={session.data?.user} />
            <div className='flex items-center justify-center h-screen'>
                <div className='bg-gray-900 rounded text-white flex flex-col pt-2 pb-3 px-4 w-64 md:w-80 lg:w-96'>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            type='text'
                            label='Name'
                            placeholder='John Doe'
                            value={postInputs.name}
                            onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                            error={errors.name}
                        />
                        <InputField
                            type='email'
                            label='Email'
                            placeholder='johndoe@gmail.com'
                            value={postInputs.email}
                            onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
                            error={errors.email}
                        />
                        <InputField
                            type='password'
                            label='Password'
                            placeholder='•••••••••'
                            value={postInputs.plainPassword}
                            onChange={(e) => setPostInputs({ ...postInputs, plainPassword: e.target.value })}
                            error={errors.plainPassword}
                        />
                        <div className='flex justify-center'>
                            <button
                                type='submit'
                                disabled={loading}
                                className={`text-black bg-white hover:bg-slate-200 focus:ring-4 focus:ring-slate-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? 'opacity-50' : ''}`}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </div>
                        {errors.other && (
                            <p className='text-red-500 mt-2 text-center'>{errors.other}</p>
                        )}
                    </form>

                    <div className='text-white mt-2 text-sm text-center'>
                        <p >
                            Already have an account?{' '}
                            <span className='underline'>
                                <Link href='/sign-in'>Log in</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
