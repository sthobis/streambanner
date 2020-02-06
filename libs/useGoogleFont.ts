import { useState, useEffect, useRef } from "react";
import WebFont from "webfontloader";
import EventEmitter from "eventemitter3";

let cachedFonts: Array<string> = [];
let loadingFonts: {
  [key: string]: EventEmitter<FontEventEmitterTypes>;
} = {};

type FontEventEmitterTypes = "loaded" | "error";

export const useGoogleFont = (fontFamily: string) => {
  // Keeping track of font loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  // Use dynamic import to load webfont to prevent undefined window error
  // on SSR
  const WebFontRef = useRef<typeof WebFont>();
  useEffect(() => {
    WebFontRef.current = require("webfontloader");
  }, []);

  useEffect(
    () => {
      // If cachedFonts array already includes fontFamily that means another instance ...
      // ... of this hook already loaded this font, so no need to load again.
      if (cachedFonts.includes(fontFamily)) {
        setState({
          loaded: true,
          error: false
        });
      } else {
        let fontEE: EventEmitter<FontEventEmitterTypes>;

        // Create font only if one is not being loaded
        if (loadingFonts[fontFamily]) {
          fontEE = loadingFonts[fontFamily];
        } else {
          fontEE = new EventEmitter<FontEventEmitterTypes>();

          WebFontRef.current.load({
            google: {
              families: [fontFamily]
            },
            active: () => {
              fontEE.emit("loaded");
            },
            inactive: () => {
              fontEE.emit("error");
            }
          });

          // Add font to loadingScripts
          loadingFonts[fontFamily] = fontEE;
        }

        fontEE.on("loaded", () => {
          // Add font to cachedFonts if it's not already exist
          // without checking, duplicates may happen when multiple components
          // try to load the same font in a same page
          if (!cachedFonts.includes(fontFamily)) {
            cachedFonts.push(fontFamily);
          }

          // Remove from loadingFonts
          delete loadingFonts[fontFamily];

          console.log("font loaded", fontFamily);
          setState({
            loaded: true,
            error: false
          });
        });

        fontEE.on("error", () => {
          // Remove from loadingFonts we can try loading again
          delete loadingFonts[fontFamily];

          setState({
            loaded: true,
            error: true
          });
        });

        // Remove listeners and font from loadingFonts on cleanup if not yet loaded
        // Also reset loaded and error value to inital state
        return () => {
          setState({
            loaded: false,
            error: false
          });
          // Remove from loadingFonts
          delete loadingFonts[fontFamily];

          fontEE.removeAllListeners("loaded");
          fontEE.removeAllListeners("error");
        };
      }
    },
    [fontFamily] // Only re-run effect if font fontFamily changes
  );

  return [state.loaded, state.error];
};
