import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '⊞', exact: true },
  { to: '/books', label: 'Books', icon: '📚' },
  { to: '/books/add', label: 'Add Book', icon: '＋', sub: true },
  { to: '/members', label: 'Members', icon: '🎓' },
  { to: '/members/register', label: 'Register', icon: '＋', sub: true },
  { to: '/issues', label: 'Issue Book', icon: '↗' },
  { to: '/returns', label: 'Return Book', icon: '↩' },
]

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-paper">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-ink/10 flex flex-col bg-paper-50 sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 pt-7 pb-6 border-b border-ink/8">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl font-bold italic text-ink">Librarium</span>
          </div>
          <p className="font-mono text-[10px] text-ink/35 tracking-widest mt-0.5 uppercase">Management System</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-sm text-sm font-body transition-all duration-100
                ${item.sub ? 'ml-4 text-xs' : ''}
                ${isActive
                  ? 'bg-ink text-paper-50 shadow-book'
                  : 'text-ink/60 hover:text-ink hover:bg-ink/5'
                }`
              }
            >
              <span className="text-base leading-none opacity-70">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-ink/8">
          <p className="font-mono text-[10px] text-ink/25 uppercase tracking-widest">Library v1.0</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8 page-enter">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
