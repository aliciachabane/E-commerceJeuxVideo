import { usePage } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useCallback } from 'react';
// import { usePage, Head } from '@inertiajs/react';


export default function AppLayout({ children }) {
  const { props } = usePage();
  const platformItems = [
    { title: 'Toutes', icon: null },
    { title: 'Nintendo Switch', icon: null },
    { title: 'PlayStation', icon: null },
    { title: 'Xbox', icon: null },
    { title: 'PC', icon: null },
  ];

  const handlePlatformClick = useCallback((platform) => {
    // ta logique ici
  }, []);

  const handleSearch = useCallback((query) => {
    // ta logique ici
  }, []);

  return (
    <SidebarProvider>
      {/* <Head title={props.title || 'Mon App'}> */}
    {/* <meta name="csrf-token" content={document.querySelector('meta[name="csrf-token"]')?.content} />
    </Head> */}
     
      <div className="bg-gradient-to-r to-red-500 from-orange-500 w-full flex-col items-center justify-center relative overflow-x-hidden">
        <header className="absolute top-10 left-0 w-full z-50">
          <NavMain
            items={platformItems}
            onPlatformClick={handlePlatformClick}
            onSearch={handleSearch}
          />
        </header>
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}
