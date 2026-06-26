import Link from 'next/link';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const NabarDrawer = ({
  menuItems,
  isLoggedIn,
  mobileMenu,
  setMobileMenu,
  user,
  handleSignOut,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition ${
        mobileMenu ? 'visible' : 'invisible'
      }`}
    >
      {/* Overlay */}
      <div
        onClick={() => setMobileMenu(false)}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          mobileMenu ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white border-l border-black shadow-2xl transform transition-transform duration-300 ${
          mobileMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black">
          <h2 className="text-xl font-bold text-black">Menu</h2>

          <button
            onClick={() => setMobileMenu(false)}
            className="p-2 rounded-lg hover:bg-zinc-100 transition"
          >
            <RxCross2 className="text-2xl text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col p-5 gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenu(false)}
              className="px-4 py-3 rounded-lg text-black font-medium hover:bg-black hover:text-white transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}

          <div className="border-t border-zinc-300 my-4"></div>

          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                onClick={() => setMobileMenu(false)}
                className="w-full py-3 text-center rounded-lg border border-black text-black font-medium hover:bg-zinc-100 transition"
              >
                Login
              </Link>

              <Link
                href="/auth/registration"
                onClick={() => setMobileMenu(false)}
                className="w-full py-3 text-center rounded-lg bg-black text-white font-medium hover:bg-zinc-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* User Info */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-zinc-300">
                <FaUserCircle className="text-4xl text-black" />

                <div>
                  <p className="font-semibold text-black">
                    {user?.name}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleSignOut}
                className="mt-4 w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-zinc-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NabarDrawer;