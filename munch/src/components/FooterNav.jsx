import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FooterNav = () => {
  const location = useLocation();
  const links = [
    { path: '/', label: 'Swipe', icon: '🔥' },
    { path: '/explore', label: 'Explore', icon: '🔍' },
    { path: '/social', label: 'Social', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-slate-100 border-t shadow-lg flex justify-around py-2">
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={`flex flex-col items-center text-sm ${
            location.pathname === link.path ? 'text-blue-800 font' : 'text-gray-500'
          }`}
        >
          <span>{link.icon}</span>
          <span className="font-bold">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default FooterNav;
