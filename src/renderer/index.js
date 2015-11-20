document.body.textContent = `We are using node ${process.versions.node},
  Chrome ${process.versions.chrome},
  and Electron ${process.versions.electron}.`;

if ('serviceWorker' in navigator) {
  console.log('serviceWorker enable.');
}
