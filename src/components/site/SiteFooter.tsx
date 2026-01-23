import { cn } from "@/lib/utils";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold tracking-tight">StageSpark</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Event production gear + crew — delivered, installed, and supported.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} StageSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
