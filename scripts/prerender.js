process.env.NODE_ENV = 'production';

const fs = require('node:fs');
const path = require('node:path');
const webpack = require('webpack');

const root = path.resolve(__dirname, '..');
const build = path.join(root, 'build');
const template = fs.readFileSync(path.join(build, 'index.html'), 'utf8');
const { files } = JSON.parse(fs.readFileSync(path.join(build, 'asset-manifest.json'), 'utf8'));
const temporary = fs.mkdtempSync(path.join(build, '.prerender-'));

function assetFilename({ filename }) {
  // Match CRA's hashed URLs so static HTML and hydration use the same assets.
  const asset = files[`static/media/${path.basename(filename)}`];
  if (!asset) {
    throw new Error(`Missing production asset for ${filename}`);
  }
  return asset.replace(/^\//, '');
}

const compiler = webpack({
  mode: 'production',
  target: 'node',
  entry: path.join(root, 'src/prerender.jsx'),
  output: {
    path: temporary,
    filename: 'render.cjs',
    library: { type: 'commonjs2' },
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  externals: [({ request }, callback) => {
    if (!request.startsWith('.') && !path.isAbsolute(request)) {
      return callback(null, `commonjs ${request}`);
    }
    callback();
  }],
  module: {
    rules: [{
      oneOf: [
        {
          test: /\.jsx?$/,
          include: path.join(root, 'src'),
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              presets: [require.resolve('@babel/preset-react')]
            }
          }
        },
        { test: /\.css$/, type: 'asset/source' },
        {
          test: /\.(bmp|gif|jpe?g|png|avif)$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 10000 } },
          generator: { emit: false, filename: assetFilename }
        },
        { type: 'asset/resource', generator: { emit: false, filename: assetFilename } }
      ]
    }]
  }
});

async function main() {
  try {
    await new Promise((resolve, reject) => {
      compiler.run((error, stats) => {
        if (error) return reject(error);
        if (stats.hasErrors()) return reject(new Error(stats.toString({ all: false, errors: true })));
        resolve();
      });
    });
    const { pages, site, renderPage } = require(path.join(temporary, 'render.cjs'));
    if (!template.includes('<div id="root"></div>')) {
      throw new Error('Production template is missing its empty React root.');
    }
    for (const page of pages) {
      const { body, head } = renderPage(page.path);
      const html = template
        .replace('</head>', () => `${head}</head>`)
        .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
      const directory = path.join(build, page.path);
      fs.mkdirSync(directory, { recursive: true });
      fs.writeFileSync(path.join(directory, 'index.html'), html);
    }
    const urls = pages.filter(page => page.index)
      .map(page => `  <url><loc>${site.url}${page.path}</loc></url>`).join('\n');
    fs.writeFileSync(path.join(build, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
    console.log(`Prerendered ${pages.length} pages and generated sitemap.xml.`);
  } finally {
    await new Promise((resolve, reject) => compiler.close(error => error ? reject(error) : resolve()));
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
