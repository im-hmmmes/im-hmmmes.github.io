const fs = require('fs');
const path = require('path');

hexo.extend.generator.register('list-files', function(locals) {
  const sourceDir = hexo.source_dir;
  const files = [];

  function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        walk(fullPath);
      } else {
        files.push(fullPath.replace(sourceDir, ''));
      }
    });
  }

  walk(sourceDir);

  const content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>文件列表</title>
</head>
<body>
  <h1>文件列表</h1>
  <ul>
    ${files.map(file => `<li><a href="/${file}">${file}</a></li>`).join('')}
  </ul>
</body>
</html>
`;

  return {
    path: 'list-files/index.html',
    data: content,
    layout: false
  };
});
