import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Navbar />
      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        {/* Subtle gradient background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(65, 96, 240, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 103, 0, 0.03) 0%, transparent 50%)',
          }}
        />
        
        {/* Content container with proper padding */}
        <div className="relative z-10 max-w-[1920px] mx-auto px-6 py-6 lg:px-8 lg:py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

