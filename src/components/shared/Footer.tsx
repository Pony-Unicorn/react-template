export function Footer() {
  return (
    <footer className="mt-auto py-4 border-t border-border/40">
      <p className="text-sm text-muted-foreground text-center">
        © {new Date().getFullYear()} Bolt. All rights reserved.
      </p>
    </footer>
  )
}
