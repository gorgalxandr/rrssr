export default function render(title, app = '', state = {}) {
  let scripts = ''

  if (app) {
    scripts = ` <script>
        window.__STATE__ = ${state}
      </script>
      <script src='bundle.js' async></script>`
  } else {
    scripts = ` <script src='bundle.js' async> </script> `
  }

  console.log('Renderer run ...')

  return `<!DOCTYPE html>
    <html lang='${state.locale}'>
      <head>
        <meta charset='utf-8'>
        <title>${title}</title>
        <style>
        .fouc {
          visibility: hidden;
        }
        </style>
        ${process.env.NODE_ENV === 'production'
          ? '<link rel=\'stylesheet\' type=\'text/css\' href=\'/styles/server.css\'>'
          : ''
        }
      </head>
      <body class='fouc'>
        <div id='app' class='u-full-width u-full-height'>
          <!--- magic happens here -->  ${app}
        </div>
        ${scripts}
      </body>
    </html>`
}
