module.exports = async (page, scenario) => {
    // Apply custom styles to the page for overlay and opacity
    await page.addStyleTag({
      content: `
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5); /* Black overlay with 50% opacity */
          pointer-events: none; /* Allow interaction with underlying content */
          z-index: 9999; /* Ensure it's on top of other content */
        }
        .adjusted-opacity {
          opacity: 0.8; /* Adjust opacity for comparison */
        }
      `
    });
  
    // Optionally add overlays or adjust opacity dynamically
    await page.evaluate(() => {
      // Add overlay
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
  
      // Adjust opacity
      document.body.classList.add('adjusted-opacity');
    });
  };
  