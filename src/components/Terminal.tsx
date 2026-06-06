"use client";

import React, { useState, useEffect, useRef } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success";
}

interface TerminalProps {
  title: string;
  initialCommand?: string;
  autoExecute?: boolean;
}

export default function Terminal({ title, initialCommand = "whoami", autoExecute = true }: TerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTypingInitial, setIsTypingInitial] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Command database
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const primaryCmd = parts[0];
    const args = parts.slice(1);

    const newLines: TerminalLine[] = [
      { text: `> ${cmd}`, type: "input" }
    ];

    if (primaryCmd === "clear") {
      setHistory([]);
      return;
    }

    switch (primaryCmd) {
      case "help":
        newLines.push(
          { text: "Available commands:", type: "output" },
          { text: "  whoami   - Display details about Rony", type: "output" },
          { text: "  connect  - Show links to contact / social platforms", type: "output" },
          { text: "  skills   - List technical/creative skillset", type: "output" },
          { text: "  projects - List selected feature works", type: "output" },
          { text: "  clear    - Clear terminal screen", type: "output" }
        );
        break;

      case "whoami":
        newLines.push(
          { text: "Name:       Rony Imanuel Sihombing", type: "output" },
          { text: "Role:       Multimedia Explorer", type: "output" },
          { text: "Focus:      Photography / Design / Development / AI Exploration", type: "output" },
          { text: "Status:     Computer Engineering Student", type: "output" },
          { text: "Location:   Indonesia", type: "output" }
        );
        break;

      case "skills":
        newLines.push(
          { text: "Core skills & tools:", type: "output" },
          { text: "  [Code]    JS, C++, Python, Java, HTML/CSS, Next.js, React, TypeScript, Node.js", type: "output" },
          { text: "  [Design]  Figma, Photoshop, Lightroom, Premiere Pro", type: "output" },
          { text: "  [Sys]     Custom ROM, Kernel Dev, Linux Administration", type: "output" }
        );
        break;

      case "projects":
        newLines.push(
          { text: "Selected projects:", type: "output" },
          { text: "  * WhatsApp Bot Development - Active NodeJS/Baileys framework bot", type: "output" },
          { text: "  * Nebula Poster            - Digital art concept in graphic design", type: "output" },
          { text: "  * Urban Mood Showcase     - Street photography exhibition series", type: "output" }
        );
        break;

      case "connect":
        if (args.length === 0) {
          newLines.push(
            { text: "Social networks & touchpoints:", type: "output" },
            { text: "  * instagram  - instagram.com/ronnanakibu", type: "output" },
            { text: "  * github     - github.com/ronnanakibu", type: "output" },
            { text: "  * email      - ronnanakibu@gmail.com", type: "output" },
            { text: "  * linkedin   - linkedin.com/in/ronnanakibu", type: "output" },
            { text: "Type 'connect <platform>' (e.g. 'connect github') to visit profile.", type: "output" }
          );
        } else {
          const platform = args[0];
          const links: Record<string, string> = {
            instagram: "https://instagram.com/ronnanakibu",
            github: "https://github.com/ronnanakibu",
            email: "mailto:ronnanakibu@gmail.com",
            linkedin: "https://linkedin.com/in/ronnanakibu",
            ig: "https://instagram.com/ronnanakibu",
            li: "https://linkedin.com/in/ronnanakibu"
          };

          if (links[platform]) {
            newLines.push(
              { text: `Connecting to ${platform}...`, type: "output" },
              { text: "Connection established.", type: "success" },
              { text: "Redirecting...", type: "success" }
            );
            setTimeout(() => {
              window.open(links[platform], "_blank");
            }, 800);
          } else {
            newLines.push({ text: `Error: Platform '${platform}' not found. Try 'github', 'instagram', 'linkedin', or 'email'.`, type: "error" });
          }
        }
        break;

      case "":
        // empty input, do nothing
        break;

      default:
        newLines.push({ text: `command not found: ${trimmed}. Type 'help' for options.`, type: "error" });
        break;
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Run initial command on mount with a simulated typing speed
  useEffect(() => {
    if (autoExecute && initialCommand) {
      setIsTypingInitial(true);
      let index = 0;
      setInputVal("");
      
      const interval = setInterval(() => {
        if (index < initialCommand.length) {
          setInputVal((prev) => prev + initialCommand[index]);
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            executeCommand(initialCommand);
            setInputVal("");
            setIsTypingInitial(false);
          }, 200);
        }
      }, 70); // typewriter speed

      return () => clearInterval(interval);
    } else {
      setHistory([
        { text: "Welcome to Rony's Interactive Command Line. Type 'help' to begin.", type: "output" }
      ]);
    }
  }, [initialCommand, autoExecute]);

  // Scroll only the internal terminal container, NOT the page window
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTypingInitial) return;
    executeCommand(inputVal);
    setInputVal("");
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Helper trigger to auto-execute commands from outside clicks
  const triggerExternalCommand = (cmdStr: string) => {
    if (isTypingInitial) return;
    setIsTypingInitial(true);
    let index = 0;
    setInputVal("");

    const interval = setInterval(() => {
      if (index < cmdStr.length) {
        setInputVal((prev) => prev + cmdStr[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          executeCommand(cmdStr);
          setInputVal("");
          setIsTypingInitial(false);
        }, 150);
      }
    }, 40);
  };

  return (
    <div 
      onClick={handleContainerClick}
      className="glass-panel w-full rounded-2xl overflow-hidden font-mono text-[14px] shadow-2xl border border-white/10 text-left transition-all duration-300 relative select-text cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="bg-surface-dark px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex space-x-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 block" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 block" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 block" />
        </div>
        <div className="text-text-muted text-xs select-none tracking-wide">{title}</div>
        <div className="w-12" /> {/* spacer to center title */}
      </div>

      {/* Terminal Window Output Panel */}
      <div 
        ref={scrollContainerRef}
        className="p-6 md:p-8 h-[340px] overflow-y-auto space-y-3 relative scroll-smooth text-[14px]"
      >
        {history.map((line, idx) => {
          let colorClass = "text-text-main";
          if (line.type === "input") colorClass = "text-accent-secondary font-semibold";
          else if (line.type === "error") colorClass = "text-red-400";
          else if (line.type === "success") colorClass = "text-accent-success";
          else if (line.type === "output") colorClass = "text-text-muted";
          
          return (
            <div key={idx} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
              {line.text}
            </div>
          );
        })}

        {/* Dynamic Typing/Input Prompt */}
        <form onSubmit={handleSubmit} className="flex items-center text-text-main relative">
          <span className="text-accent-success mr-2 font-bold">&gt;</span>
          <span className="text-text-main flex-1 flex items-center min-w-[20px]">
            {isTypingInitial ? (
              <>
                <span>{inputVal}</span>
                <span className="terminal-cursor" />
              </>
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isTypingInitial}
                className="bg-transparent border-none outline-none p-0 m-0 w-full text-text-main focus:ring-0 focus:border-none select-text focus:outline-none"
                autoComplete="off"
                spellCheck={false}
              />
            )}
          </span>
        </form>
      </div>

      {/* Helper commands dock */}
      <div className="bg-surface-dark/40 px-6 py-3 border-t border-white/5 flex flex-wrap gap-2.5 items-center text-[12px] text-text-muted select-none">
        <span className="font-semibold text-accent-primary mr-1">Quick Exec:</span>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerExternalCommand("whoami"); }}
          className="px-3 py-1 rounded bg-white/5 hover:bg-accent-primary hover:text-white transition duration-200 cursor-pointer"
        >
          whoami
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerExternalCommand("skills"); }}
          className="px-3 py-1 rounded bg-white/5 hover:bg-accent-primary hover:text-white transition duration-200 cursor-pointer"
        >
          skills
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerExternalCommand("projects"); }}
          className="px-3 py-1 rounded bg-white/5 hover:bg-accent-primary hover:text-white transition duration-200 cursor-pointer"
        >
          projects
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerExternalCommand("connect"); }}
          className="px-3 py-1 rounded bg-white/5 hover:bg-accent-primary hover:text-white transition duration-200 cursor-pointer"
        >
          connect
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); triggerExternalCommand("clear"); }}
          className="px-3 py-1 rounded bg-white/5 hover:bg-red-500/20 hover:text-red-300 transition duration-200 cursor-pointer ml-auto"
        >
          clear
        </button>
      </div>
    </div>
  );
}
