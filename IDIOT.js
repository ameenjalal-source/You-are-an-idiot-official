(function() {
  const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR_AzCN6eWwsNwLGL3VasEkhJS1c76N_2mfmjLywlMvqp-Qy4GMwa3anY&s=10';
  const NUM_WINDOWS = 15;
  const windowsArray = [];

  // Turn current webpage into the image
  document.body.innerHTML = `<img src="${imageUrl}" style="width:100%; height:100%; object-fit: contain; margin: 0; padding: 0;">`;

  // Create a fixed window for hackertyper
  const hackWin = window.open('', '', 'width=400,height=300,left=10,top=10');
  hackWin.document.write(`
    <style>
      body {
        margin: 0;
        padding: 10px;
        background-color: black;
        color: lime;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        height: 100%;
        overflow: auto;
      }
    </style>
    <div id="hackText"></div>
  `);

  // Generate hacker-style animated text
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()[]{}|;:,.<>?';
  function generateLine(length) {
    let line = '';
    for (let i = 0; i < length; i++) {
      line += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return line;
  }

  // Continuously update hackertyper window
  function updateHackText() {
    const hackDiv = hackWin.document.getElementById('hackText');
    let lines = '';
    for (let i = 0; i < 20; i++) {
      lines += generateLine(60) + '<br>';
    }
    hackDiv.innerHTML = lines;
    setTimeout(updateHackText, 200);
  }
  updateHackText();

  // Function to create bouncing windows
  function createWindow() {
    const width = 200;
    const height = 200;
    const x = Math.random() * (window.screen.availWidth - width);
    const y = Math.random() * (window.screen.availHeight - height);
    const win = window.open('', '', `width=${width},height=${height},left=${x},top=${y}`);
    win.document.write(`
      <style>
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: black;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <img src="${imageUrl}" alt="Image" />
    `);
    const speedMultiplier = 4; 
    return { window: win, x, y, vx: (Math.random() * 4 + 1) * speedMultiplier * (Math.random() < 0.5 ? -1 : 1), vy: (Math.random() * 4 + 1) * speedMultiplier * (Math.random() < 0.5 ? -1 : 1) };
  }

  // Create all bouncing windows
  for (let i = 0; i < NUM_WINDOWS; i++) {
    windowsArray.push(createWindow());
  }

  // Animate bouncing windows
  function animate() {
    for (const w of windowsArray) {
      if (w.window.closed) continue;
      w.x += w.vx;
      w.y += w.vy;

      const width = w.window.innerWidth;
      const height = w.window.innerHeight;
      const screenWidth = window.screen.availWidth;
      const screenHeight = window.screen.availHeight;

      if (w.x <= 0 || w.x + width >= screenWidth) {
        w.vx *= -1;
      }
      if (w.y <= 0 || w.y + height >= screenHeight) {
        w.vy *= -1;
      }

      w.window.moveTo(w.x, w.y);
    }
    setTimeout(animate, 30);
  }

  animate();
})();
