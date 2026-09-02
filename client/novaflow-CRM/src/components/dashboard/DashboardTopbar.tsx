import {
    LuBell,
    LuSearch,
    LuChevronDown,
    LuMenu,
  } from "react-icons/lu";
  
  export default function DashboardTopbar() {
    return (
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md md:px-6">
        
        {/* Mobile */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden"
        >
          <LuMenu size={19} />
        </button>
  
        {/* Search */}
        <div className="relative hidden sm:block">
          <LuSearch
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
  
          <input
            type="text"
            placeholder="Search NovaFlow..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
  
        {/* Right */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
          >
            <LuBell size={18} />
  
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
          </button>
  
          <div className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />
  
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg p-1.5 transition hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
              AM
            </div>
  
            <div className="hidden text-left lg:block">
              <p className="text-xs font-semibold text-slate-800">
                Alex Morgan
              </p>
  
              <p className="text-[10px] text-slate-500">
                Administrator
              </p>
            </div>
  
            <LuChevronDown
              size={14}
              className="hidden text-slate-400 lg:block"
            />
          </button>
        </div>
      </header>
    );
  }