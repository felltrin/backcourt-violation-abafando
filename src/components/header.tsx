import { Button } from "~/components/ui/button"
import { Bell, Plus, Search, Menu } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary-foreground">
                <path d="M3 18L12 3L21 18H3Z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold text-xl">TrackFit</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Training
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Explore
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="hidden sm:inline-flex" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Upload
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
