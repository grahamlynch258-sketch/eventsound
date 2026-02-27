import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor,
  Volume2,
  Lightbulb,
  Layout,
  Users,
  Settings,
  Radio,
  Clapperboard,
  Frame,
  Wand2,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { FC } from "react";

const ICON_MAP: Record<string, FC<LucideProps>> = {
  monitor: Monitor,
  "volume-2": Volume2,
  lightbulb: Lightbulb,
  layout: Layout,
  users: Users,
  settings: Settings,
  radio: Radio,
  clapperboard: Clapperboard,
  frame: Frame,
  wand2: Wand2,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = ICON_MAP[icon] ?? Monitor;
  return (
    <Card className="p-6 h-full">
      <CardContent className="p-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 mb-4">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
