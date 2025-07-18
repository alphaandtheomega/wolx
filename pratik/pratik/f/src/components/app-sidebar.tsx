import * as React from "react";
import { useEffect, useState } from "react";
import {
  Home,
  Box,
  Users,
  Wallet,
  FileText,
  Settings,
  Check,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { NavUser } from "@/components/nav-user";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { accessToken, user, setUser, authenticatedFetch } = useAuth();
  const [filteredNavMain, setFilteredNavMain] = useState<any[]>([]);
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["Cari Modülü"])
  );
  const { isMobile, setOpenMobile } = useSidebar();

  // Menü verisi sabit olarak tekrar eklendi
  const navMain = [
    {
      title: "Ana Sayfa",
      url: "/",
    },
    {
      title: "Stok Modülü",
      url: "#",
      items: [
        { title: "Installation", url: "a" },
        { title: "Project Structure", url: "a" },
      ],
    },
    {
      title: "Cari Modülü",
      url: "#",
      items: [
        { title: "Cari Ekle", url: "cariekle" },
        { title: "Cari Liste", url: "cariliste" },
        { title: "Cari Hareketler", url: "carihareketler" },
        { title: "Virman İşlemleri", url: "virmanhareketleri" },
        {
          title: "Cari Raporlar",
          url: "#",
          items: [
            { title: "Genel Rapor", url: "cari-rapor/genel" },
            { title: "Ekstre Raporu", url: "cari-rapor/ekstre" },
            { title: "Bakiye Raporu", url: "kitaplik" },
          ],
        },
      ],
    },
    {
      title: "Kasa Modülü",
      url: "#",
      items: [
        { title: "Modul Ekle", url: "modulekle" },
        { title: "Kullanıcı Ekle", url: "kullaniciekle" },
        { title: "Kitaplık", url: "kitaplik" },
        { title: "Components", url: "a" },
        { title: "File Conventions", url: "a" },
        { title: "Functions", url: "a" },
      ],
    },
    {
      title: "Fatura Modülü",
      url: "#",
      items: [
        { title: "Accessibility", url: "a" },
        { title: "naber raporu", url: "a" },
      ],
    },
    {
      title: "Ayarlar",
      url: "#",
      items: [{ title: "Genel Ayarlar", url: "ayarlar" }],
    },
  ];

  // Arama işlevi (recursive)
  const filterMenuRecursive = (items: any[], query: string): any[] => {
    const q = query.toLowerCase();
    return items
      .map((item) => {
        if (item.items) {
          // Alt item'larda arama
          const filteredSub: any[] = filterMenuRecursive(item.items, query);
          if (
            item.title.toLowerCase().includes(q) ||
            filteredSub.length > 0
          ) {
            return {
              ...item,
              items: filteredSub,
            };
          }
          return null;
        } else {
          // Alt item yoksa sadece başlıkta arama
          if (item.title.toLowerCase().includes(q)) {
            return item;
          }
          return null;
        }
      })
      .filter(Boolean);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredNavMain(navMain);
      setOpenSections(new Set(["Cari Modülü"]));
      return;
    }

    const filtered = filterMenuRecursive(navMain, query);
    setFilteredNavMain(filtered);

    // Arama sonucunda eşleşen tüm başlıkları aç
    const collectOpenSections = (items: any[], parentKey = ""): string[] => {
      let keys: string[] = [];
      items.forEach((item, idx) => {
        const key = parentKey + item.title + idx;
        if (item.items && item.items.length > 0) {
          keys.push(key);
          keys = keys.concat(collectOpenSections(item.items, key));
        }
      });
      return keys;
    };
    const openKeys = collectOpenSections(filtered);
    setOpenSections(new Set(openKeys));
  };

  const handleSectionToggle = (sectionTitle: string, isOpen: boolean) => {
    const newOpenSections = new Set(openSections);
    if (isOpen) {
      newOpenSections.add(sectionTitle);
    } else {
      newOpenSections.delete(sectionTitle);
    }
    setOpenSections(newOpenSections);
  };

  useEffect(() => {
    // İlk yüklemede tüm menüyü göster
    setFilteredNavMain(navMain);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (accessToken && !user) {
        try {
          const res = await authenticatedFetch("/api/profile");
          if (res.ok) {
            const data = await res.json();
            setUser(data);
          }
        } catch (e) {
          // Hata yönetimi
        }
      }
    };
    fetchProfile();
  }, [accessToken, user, setUser, authenticatedFetch]);

  // Mobilde menüden seçim yapınca sidebar'ı kapat
  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  // Recursive menü render fonksiyonu
  const renderMenuItems = (items: any[], parentKey = "") => {
    return items.map((item, idx) => {
      const key = parentKey + item.title + idx;
      if (item.items && item.items.length > 0) {
        return (
          <Collapsible
            key={key}
            open={openSections.has(key)}
            onOpenChange={(isOpen) => handleSectionToggle(key, isOpen)}
            className="group/collapsible"
          >
            <SidebarMenuItem
              className={
                openSections.has(key) ? "sidebar-menu-item-active" : ""
              }
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground">
                  {/* Ana ikonlar sadece ana seviyede gösterilsin */}
                  {item.title === "Stok Modülü" && parentKey === "" && (
                    <Box className="size-5 mr-2" />
                  )}
                  {item.title === "Cari Modülü" && parentKey === "" && (
                    <Users className="size-5 mr-2" />
                  )}
                  {item.title === "Kasa Modülü" && parentKey === "" && (
                    <Wallet className="size-5 mr-2" />
                  )}
                  {item.title === "Fatura Modülü" && parentKey === "" && (
                    <FileText className="size-5 mr-2" />
                  )}
                  {item.title === "Ayarlar" && parentKey === "" && (
                    <Settings className="size-5 mr-2" />
                  )}
                  {item.title} {" "}
                  <ChevronRight className="ml-auto group-data-[state=closed]/collapsible:inline group-data-[state=open]/collapsible:hidden" />
                  <ChevronDown className="ml-auto group-data-[state=open]/collapsible:inline group-data-[state=closed]/collapsible:hidden" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {renderMenuItems(item.items, key)}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      } else {
        return (
          <SidebarMenuItem key={key}>
            <NavLink
              to={item.url || "/"}
              end
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-md px-2 py-2 transition-colors w-full text-left text-sm font-medium outline-none
                text-sidebar-foreground hover:text-sidebar-accent-foreground
                ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground sidebar-active-effect"
                    : "hover:bg-sidebar-accent"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="sidebar-active-bar"></span>}
                  {isActive && <Check className="mr-1 size-4 text-white" />}
                  {/* Ana Sayfa ikonu sadece ana seviyede gösterilsin */}
                  {item.title === "Ana Sayfa" && parentKey === "" && (
                    <Home className="size-5 mr-2" />
                  )}
                  {item.title}
                </>
              )}
            </NavLink>
          </SidebarMenuItem>
        );
      }
    });
  };

  return (
    <Sidebar
      {...props}
      className="bg-sidebar border-r border-sidebar-border text-sidebar-foreground"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/" onClick={handleNavClick}>
                <div className="flex items-center gap-2">
                  <img
                    src="/logotrans.png"
                    alt="Tropik Yazılım Logo"
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Tropik Yazılım</span>
                    <span className="">v1.0.1</span>
                  </div>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm onSearch={handleSearch} />
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarMenu>
            {renderMenuItems(filteredNavMain)}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-sidebar border-t border-sidebar-border">
        <div className="flex items-center gap-2 w-full">
          {user ? (
            <NavUser
              user={{
                name: user.username,
                email: user.email,
                avatar: "/avatars/logo.jpg",
              }}
            />
          ) : (
            <span>Kullanıcı Bilgisi Yükleniyor...</span>
          )}
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
