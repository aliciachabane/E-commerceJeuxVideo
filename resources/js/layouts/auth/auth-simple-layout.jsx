import { Link } from '@inertiajs/react';

export default function AuthSimpleLayout({ children, title, description }) {
    return (
       <div className="min-h-svh flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-orange-500 p-6 md:p-10">
            <div className="bg-white w-[50em] h-[55em] max-w-full max-h-full rounded-lg shadow-lg p-10 flex flex-col gap-8 items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <div className="size-9 fill-current text-[var(--foreground)] dark:text-black" />
                            </div>
                            <span className="sr-only ">{title}</span>
                        </Link>
                        <img src="/logo.webp" alt="" className="w-[100px] h-[100px] rounded-full"/>
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium text-black">{title}</h1>
                            <p className="text-muted-foreground text-center text-sm">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
    
    );
}