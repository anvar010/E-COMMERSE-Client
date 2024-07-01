import React from 'react';

const PageNotFound = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-3"></div>
                    <div className="col-span-12 md:col-span-6 text-center">
                        <div className="text-7xl md:text-8xl lg:text-9xl bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-400">
                            404
                        </div>
                        <div className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
                            PAGE NOT FOUND
                        </div>
                        <div className="text-center">
                            <a href="/" className="btn btn-outline-primary py-3 px-6 rounded-lg text-white font-bold hover:bg-red-400 transition duration-300">BACK TO HOME</a>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-3"></div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
