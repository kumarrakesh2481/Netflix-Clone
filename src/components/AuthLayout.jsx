
const AuthLayout = ({ children, title }) => {
    return (
        <div className="relative min-h-screen bg-black bg-opacity-50 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-black bg-opacity-75 p-8 rounded-lg shadow-2xl space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-netflix-red mb-2">NETFLIX</h1>
                        <h2 className="text-2xl font-bold text-white">{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
