// import React from "react";
// import { LayoutGrid, User, LogOut } from "lucide-react";

// const UserMenu = ({ user, onLogout, onNavigate }) => {
//     // Default fallback data matching the UI
//     const userData = user || {
//         name: "MD Arefur Rahman Khan",
//         email: "aref0171personal@gmail.com",
//         role: "student",
//         initials: "MA",
//     };

//     return (
//         <div className="w-80 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#0c0a09] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-zinc-800 transition-colors duration-200">
//             {/* Header Section */}
//             <div className="p-5 flex items-center gap-4 bg-gradient-to-b from-rose-50/50 to-transparent dark:from-rose-950/20 dark:to-transparent">
//                 {/* Avatar */}
//                 <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
//                     {userData.initials}
//                 </div>

//                 {/* User Details */}
//                 <div className="flex flex-col overflow-hidden">
//                     <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
//                         {userData.name}
//                     </h3>
//                     <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mb-1.5">
//                         {userData.email}
//                     </p>
//                     <span className="inline-block w-fit px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-medium leading-tight">
//                         {userData.role}
//                     </span>
//                 </div>
//             </div>

//             {/* Navigation Options */}
//             <div className="py-2 px-3">
//                 <button
//                     onClick={() => onNavigate?.("dashboard")}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/60 text-gray-700 dark:text-zinc-300 font-medium text-sm transition-colors"
//                 >
//                     <LayoutGrid className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
//                     <span>Studio Dashboard</span>
//                 </button>

//                 <button
//                     onClick={() => onNavigate?.("profile")}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800/60 text-gray-700 dark:text-zinc-300 font-medium text-sm transition-colors"
//                 >
//                     <User className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
//                     <span>Profile</span>
//                 </button>
//             </div>

//             {/* Divider */}
//             <div className="border-t border-gray-100 dark:border-zinc-800/80 my-1" />

//             {/* Logout Action */}
//             <div className="p-3 pt-2">
//                 <button
//                     onClick={onLogout}
//                     className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition-colors"
//                 >
//                     <LogOut className="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:text-red-600" />
//                     <span className="tracking-wide">Logout</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserMenu;
