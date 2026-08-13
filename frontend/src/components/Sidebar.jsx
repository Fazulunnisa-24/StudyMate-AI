import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  User,
  Sparkles,
  Settings,
} from "lucide-react";

function Sidebar() {
  const mainItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Notes",
      path: "/upload",
      icon: BookOpen,
    },
  ];

  const learningItems = [
    {
      name: "Quizzes",
      path: "/quiz",
      icon: ClipboardCheck,
    },
  ];

  const planningItems = [
    {
      name: "Study Planner",
      path: "/planner",
      icon: CalendarDays,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  const NavItem = ({ item }) => {
    const Icon = item.icon;

    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl mb-1.5 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
          }`
        }
      >
        <Icon size={19} strokeWidth={2} />
        <span>{item.name}</span>
      </NavLink>
    );
  };

  const SectionTitle = ({ children }) => (
    <p className="px-4 mb-2 mt-7 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
      {children}
    </p>
  );

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800 z-50">

      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-sm">
            <Sparkles size={21} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              StudyMate
            </h1>

            <p className="text-[11px] text-slate-500">
              AI Learning Assistant
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">

        {/* Main */}
        <SectionTitle>
          Main
        </SectionTitle>

        {mainItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
          />
        ))}

        {/* Learn */}
        <SectionTitle>
          Learn
        </SectionTitle>

        {learningItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
          />
        ))}

        {/* Plan */}
        <SectionTitle>
          Plan
        </SectionTitle>

        {planningItems.map((item) => (
          <NavItem
            key={item.path}
            item={item}
          />
        ))}

      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5">

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <User size={19} strokeWidth={2} />
          <span>Profile</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Settings size={19} strokeWidth={2} />
          <span>Settings</span>
        </NavLink>

        {/* User Card */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900 border border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold">
              S
            </div>

            <div className="min-w-0">

              <p className="text-sm font-medium text-white truncate">
                Student
              </p>

              <p className="text-xs text-slate-500 truncate">
                Keep learning 🚀
              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;