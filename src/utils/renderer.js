export default function render(
  title,
  header,
  app = '', 
  state = {},
  footer
  ) {
  let scripts = ''

  if (app) {
    scripts = ` <script>
        window.__STATE__ = ${state}
      </script>
      <script src='bundle.js'></script>`
  } else {
    scripts = ` <script src='bundle.js'> </script> `
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
        ${header}
        <div id='app' class='u-full-width u-full-height'>
          <!--- magic happens here -->  ${app}
        </div>
        ${footer}
        ${scripts}
      </body>
    </html>`
}
