import React, { useState } from 'react';

const ToggleButton = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className="flex items-center justify-center w-full my-8">
            <span className="text-xs mx-5">Toggle me!</span>
            <label htmlFor="toggle" className="flex items-center cursor-pointer">
                <input 
                    type="checkbox" 
                    id="toggle" 
                    className="sr-only peer" 
                    checked={isChecked} 
                    onChange={handleToggle} 
                />
                <div className="block relative bg-white w-16 h-9 p-1 rounded-full before:absolute before:bg-red-600 before:w-7 before:h-7 before:p-1 before:rounded-full before:transition-all before:duration-500 before:left-1 peer-checked:before:left-8 peer-checked:before:bg-white peer-checked:bg-red-900"></div>
            </label>
        </div>
    );
};

export default ToggleButton;
