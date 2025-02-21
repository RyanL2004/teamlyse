import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../context/UserContext";

const CustomNavUser = ({ user }) => {
    const [ open, setOpen ] = useState(false);
    const navigate = useNavigate();
    const { setUser} = useContext(UserContext);

    const handleToggle = () => {
        setOpen((prev) => !prev); 
    }

    const handleLogout = () => {
        // Call the logout API or clear local Storage/ context then redirect
        fetch("/api/users/logout", {
            method: "POST",
            credentials: "include",
        })
        .then((res) => res.json())
        .then(() => {
            setUser(null)
            //clear User Context if needed and redirect to home/login page
            navigate("/login")
        })
        .catch((err)=> {
                console.error("Error Logging out:", err);
        })
        
    };
    
    return (
        <div className="relative">
            <button
            onClick={handleToggle}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 transition"
            >
                <Avatar className="h-10 w-10">
                    <AvatarImage src = {user.profilePhoto} alt={user.name} />
                        <AvatarFallback>
                            {user.name.charAt(0)}
                        </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-semibold">
                    {user.name}
                </span>
                <ChevronDownIcon className = "h-5 w-5" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-4 border-b border-gray-200">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500"> {user.email} </p>
                    </div>
                    <ul className="py-2">
                        <li>
                            <Link to="/account" className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                            >
                                Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/billing" className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                            >
                            Billing
                            </Link>
                        </li>
                        <li>
                            <Link to="/notifications" className="block px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                            >
                                Notifications
                            </Link>
                        </li>
                        <li>
                            <button
                            onClick = {handleLogout}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                Log out
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};
export default CustomNavUser