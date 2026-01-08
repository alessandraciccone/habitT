import React from "react";

const Footer = () => (
  <footer className="bg-green-200 w-full py-4 mt-8 text-center text-pink-400 font-serif text-lg shadow-inner flex flex-col items-center gap-2">
    <div>© 2026 Piccoli Ritmi. Tutti i diritti riservati.</div>
    <div className="flex gap-4 justify-center">
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.018.005 2.046.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a href="mailto:info@piccoliritmi.com" aria-label="Email">
        <svg className="w-6 h-6 inline" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 13.065L2.4 6.6A2 2 0 0 1 4 6h16a2 2 0 0 1 1.6.6l-9.6 6.465zm9.6-4.665A2 2 0 0 1 22 8v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 .4-1.2l9.6 6.465L21.6 8.4z" />
        </svg>
      </a>
    </div>
    <div>
      <a href="/privacy" className="underline hover:text-pink-600">
        Privacy Policy
      </a>
    </div>
  </footer>
);

export default Footer;
