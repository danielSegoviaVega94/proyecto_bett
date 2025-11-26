import React from 'react';
import { User, UserRole } from '../types';
import { Dumbbell, Activity, Calendar, Users, LogOut, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface Props {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

export const Layout: React.FC<Props> = ({ children, user, onLogout }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 sm:pb-0 sm:pl-64">
      {/* Mobile Header */}
      <div className="sm:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex items-center justify-between">
        <h1 className="font-bold text-slate-800 tracking-tight">{t.appName}<span className="text-accent">{t.appNameSuffix}</span></h1>
        <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-slate-100 px-2 py-1 rounded text-slate-600">{t.roles[user.role.toLowerCase() as keyof typeof t.roles]}</span>
          <img src={user.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full border border-slate-200" />
        </div>
      </div>

      {/* Sidebar (Desktop) */}
      <aside className="hidden sm:flex flex-col fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 z-40">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight">{t.appName}<span className="text-accent">{t.appNameSuffix}</span></h1>
          <div className="mt-4 flex items-center gap-3">
            <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-700" />
            <div>
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-xs text-slate-500">{t.roles[user.role.toLowerCase() as keyof typeof t.roles]}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem icon={<Activity />} label={t.nav.dashboard} active />
          {user.role === UserRole.ATHLETE && <NavItem icon={<Dumbbell />} label={t.nav.training} />}
          {user.role === UserRole.ATHLETE && <NavItem icon={<FileText />} label={t.nav.nutrition} />}

          {(user.role === UserRole.COACH || user.role === UserRole.NUTRITIONIST) && (
             <NavItem icon={<Users />} label={t.nav.athletes} />
          )}
           {(user.role === UserRole.COACH) && (
             <NavItem icon={<Calendar />} label={t.nav.programBuilder} />
          )}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <LanguageSelector />
          <button onClick={onLogout} className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors w-full p-2 rounded hover:bg-slate-800">
            <LogOut size={18} />
            {t.nav.signOut}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-4 sm:p-8">
        {children}
      </main>

      {/* Mobile Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3 z-50">
        <MobileNavItem icon={<Activity />} label={t.nav.dash} active />
        <MobileNavItem icon={<Dumbbell />} label={t.nav.train} />
        <MobileNavItem icon={<FileText />} label={t.nav.food} />
        <MobileNavItem icon={<LogOut />} label={t.nav.exit} onClick={onLogout} />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-3 w-full p-2 rounded text-sm font-medium transition-colors ${active ? 'bg-accent text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
    {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
    {label}
  </button>
);

const MobileNavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-accent' : 'text-slate-400'}`}>
    {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);
