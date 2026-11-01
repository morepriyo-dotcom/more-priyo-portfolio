"use client";

import { useEffect, useState, useRef } from "react";

type CommandItem = {
  id: string;
  label: string;
  group: "Navigation" | "Projects" | "Actions";
  glyph: string;
  shortcut?: string;
  action: () => void;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const copyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("morepriyo@gmail.com");
      showToast("Copied morepriyo@gmail.com to clipboard!");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Attach 1-click copy enhancement to existing email links and auto-close mobile menu
    const onDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".contact-email");
      if (target) {
        e.preventDefault();
        copyEmail();
      }
      const navLink = (e.target as HTMLElement).closest(".mobile-menu nav a");
      if (navLink) {
        const details = navLink.closest("details");
        if (details) details.removeAttribute("open");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onDocumentClick);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    { id: "nav-about", label: "About More Priyo", group: "Navigation", glyph: "01", action: () => scrollTo("about") },
    { id: "nav-work", label: "Featured Projects", group: "Navigation", glyph: "02", action: () => scrollTo("work") },
    { id: "nav-skills", label: "Skills & Toolkit", group: "Navigation", glyph: "03", action: () => scrollTo("skills") },
    { id: "nav-journey", label: "Education & Journey", group: "Navigation", glyph: "04", action: () => scrollTo("journey") },
    { id: "nav-resume", label: "Download Résumé", group: "Navigation", glyph: "05", action: () => scrollTo("resume") },
    { id: "nav-contact", label: "Contact & Links", group: "Navigation", glyph: "06", action: () => scrollTo("contact") },

    // Projects
    { id: "prj-jansetu-live", label: "JanSetu AI · Open Live Platform", group: "Projects", glyph: "↗", action: () => openUrl("https://jansetu-gray.vercel.app") },
    { id: "prj-jansetu-git", label: "JanSetu AI · View GitHub Repository", group: "Projects", glyph: "⌘", action: () => openUrl("https://github.com/morepriyo-dotcom/JanSetu-AI") },
    { id: "prj-back2u-live", label: "Back2U · Open Live Platform", group: "Projects", glyph: "↗", action: () => openUrl("https://back2-u-eta.vercel.app/") },
    { id: "prj-back2u-git", label: "Back2U · View GitHub Repository", group: "Projects", glyph: "⌘", action: () => openUrl("https://github.com/morepriyo-dotcom/Back2U") },
    { id: "prj-skillbridge-live", label: "SkillBridge · Open Live Platform", group: "Projects", glyph: "↗", action: () => openUrl("https://skillbridge-sih-rho.vercel.app/") },

    // Actions
    { id: "act-copy-email", label: "Copy Email (morepriyo@gmail.com)", group: "Actions", glyph: "✉", shortcut: "Copy", action: copyEmail },
    { id: "act-download-cv", label: "Download Résumé (PDF)", group: "Actions", glyph: "↓", shortcut: "PDF", action: () => {
      const a = document.createElement("a");
      a.href = "/More-Priyo-Resume.pdf";
      a.download = "More-Priyo-Resume.pdf";
      a.click();
      showToast("Downloading résumé...");
    }},
    { id: "act-linkedin", label: "Open LinkedIn Profile", group: "Actions", glyph: "in", action: () => openUrl("https://www.linkedin.com/in/more-priyo-758b1737a") },
    { id: "act-github", label: "Open GitHub Profile", group: "Actions", glyph: "⌘", action: () => openUrl("https://github.com/morepriyo-dotcom") },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.group.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating subtle trigger button */}
      <button
        type="button"
        className="cmd-trigger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Open Command Palette"
      >
        <span>Command Menu</span>
        <span className="cmd-trigger-kbd">{isMac ? "⌘K" : "Ctrl K"}</span>
      </button>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="portfolio-toast" role="status" aria-live="polite">
          <span>✓</span>
          <p>{toastMessage}</p>
        </div>
      )}

      {/* Command Palette Modal */}
      {isOpen && (
        <div
          className="cmd-palette-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-input-row">
              <span className="cmd-icon">⌘</span>
              <input
                ref={inputRef}
                className="cmd-input"
                placeholder="Type a command or jump to a project..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <span className="cmd-kbd-esc">ESC</span>
            </div>

            <div className="cmd-list" role="listbox">
              {filtered.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center", color: "#6c748a", fontSize: "12px" }}>
                  No matching commands found.
                </div>
              ) : (
                filtered.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      className={`cmd-item ${isSelected ? "active" : ""}`}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="cmd-item-left">
                        <span className="cmd-item-glyph">{cmd.glyph}</span>
                        <span>{cmd.label}</span>
                      </div>
                      {cmd.shortcut && (
                        <span className="cmd-item-shortcut">{cmd.shortcut}</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="cmd-footer">
              <span>Use ↑ ↓ to navigate, ↵ to select</span>
              <span>More Priyo · Portfolio</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
