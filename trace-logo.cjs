const potrace = require('potrace');
const fs = require('fs');
const src = 'public/brand/logo-symbol.png';
const params = {
  turdSize: 60,
  optTolerance: 0.4,
  threshold: 160,
  blackOnWhite: true,
  color: '#2d6be5',
  background: 'transparent',
};
potrace.trace(src, params, (err, svg) => {
  if (err) { console.error('ERR', err); process.exit(1); }
  fs.writeFileSync('public/brand/logo-trace.svg', svg);
  const paths = (svg.match(/<path/g) || []).length;
  const vb = svg.match(/viewBox="[^"]*"/);
  console.log('paths:', paths, vb ? vb[0] : '(no viewBox)', 'bytes:', svg.length);
});
