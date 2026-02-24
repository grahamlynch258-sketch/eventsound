import { ExternalLink } from "lucide-react";

interface Brand {
  name: string;
  logo: string;
  url: string;
}

const ALL_BRANDS: Record<string, Brand> = {
  "l-acoustics": { name: "L-Acoustics", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939473597-5ql2bebsagj.jpg", url: "https://www.l-acoustics.com" },
  "shure": { name: "Shure", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939476256-hug0kxmivq.png", url: "https://www.shure.com" },
  "sennheiser": { name: "Sennheiser", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939475921-9g4u4iopmp.webp", url: "https://www.sennheiser.com" },
  "allen-heath": { name: "Allen & Heath", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939470162-10wrx9f1h2na.png", url: "https://www.allen-heath.com" },
  "ld-systems": { name: "LD Systems", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939473917-u1kpe9p8rah.png", url: "https://www.ld-systems.com" },
  "unilumin": { name: "Unilumin", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939476897-kvmxtb2ikho.jpg", url: "https://www.unilumin.com" },
  "absen": { name: "Absen", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939470837-xu7foqnvpyg.png", url: "https://www.absen.com" },
  "novastar": { name: "Novastar", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939474237-hqp9alpp426.png", url: "https://www.novastar.tech" },
  "pixelhue": { name: "Pixelhue", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939474588-5s1dzt7o4fx.jpg", url: "https://www.pixelhue.com" },
  "samsung": { name: "Samsung", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939475577-ag36v7xd01l.png", url: "https://www.samsung.com" },
  "chamsys": { name: "Chamsys", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939471828-cb1yeyeea2r.png", url: "https://chamsys.co.uk" },
  "robe": { name: "Robe", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939474916-98o6oyuu57u.png", url: "https://www.robe.cz" },
  "chauvet": { name: "Chauvet", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939472185-9mhdnhlig2w.png", url: "https://www.chauvetprofessional.com" },
  "adj": { name: "ADJ", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939471166-rluib8wxa7.jpg", url: "https://www.adj.com" },
  "favolite": { name: "Favolite", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939472518-3xsmbsizwg.png", url: "https://www.favolite.com" },
  "blackmagic": { name: "Blackmagic Design", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939471497-2bbygg0pt11.png", url: "https://www.blackmagicdesign.com" },
  "sony": { name: "Sony", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939476559-fv4rsnn23z5.png", url: "https://pro.sony" },
  "roland": { name: "Roland", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939475257-ot59tgvbtig.png", url: "https://proav.roland.com" },
  "guild": { name: "Guild", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939473257-6gyblfbhpal.jpg", url: "#" },
  "gorilla": { name: "Gorilla Design", logo: "https://blhxvtmhhvrorajkszhy.supabase.co/storage/v1/object/public/site-images/1771939472876-omrk05jrzib.png", url: "#" },
};

const SERVICE_BRANDS: Record<string, string[]> = {
  "led-video-walls": ["unilumin", "absen", "novastar", "pixelhue", "samsung"],
  "av-production": ["l-acoustics", "shure", "sennheiser", "allen-heath", "unilumin", "chamsys"],
  "lighting-design": ["chamsys", "robe", "chauvet", "adj", "favolite"],
  "staging-pipe-drape": ["guild", "gorilla"],
  "event-production": ["l-acoustics", "unilumin", "chamsys", "blackmagic"],
  "video-production": ["blackmagic", "sony", "roland", "samsung"],
  "virtual-events": ["blackmagic", "roland", "sony"],
};

interface BrandSidebarProps {
  serviceKey: string;
}

export function BrandSidebar({ serviceKey }: BrandSidebarProps) {
  const brandKeys = SERVICE_BRANDS[serviceKey] || [];
  const brands = brandKeys.map((k) => ALL_BRANDS[k]).filter(Boolean);

  if (brands.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Brands We Use</h3>
      <div className="space-y-3">
        {brands.map((brand) => (
          <a
            key={brand.name}
            href={brand.url}
            target={brand.url === "#" ? undefined : "_blank"}
            rel={brand.url === "#" ? undefined : "noopener noreferrer"}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md flex items-center justify-center p-1.5">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{brand.name}</span>
            {brand.url !== "#" && <ExternalLink className="h-3 w-3 text-muted-foreground/50 ml-auto" />}
          </a>
        ))}
      </div>
    </div>
  );
}
