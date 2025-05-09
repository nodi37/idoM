class StyleLoader {
  cache = new Map();

  // TODO: Extensive check for race conditions
  async load(path) {
    try {
      if (this.cache.get(path)) {
        console.log(`File ${path} is cached`);
        return;
      }

      // Mark the path as being fetched to prevent duplicate fetches.
      this.cache.set(path, true);

      // Get styles
      const response = await fetch(path);
      if (!response.ok) {
        this.cache.set(path, false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const styles = await response.text();

      // Create and inject style element
      const styleSheet = document.createElement("style");
      styleSheet.textContent = styles;

      // Append styles
      document.head.appendChild(styleSheet);
    } catch (error) {
      this.cache.set(path, false);
      console.error("Error loading styles with path: " + path, error);
    }
  }
}

/**
 * Catches styles loading
 * @example
 * styleLoader.load('/path/to/style.css')
 */
export const styleLoader = new StyleLoader();
