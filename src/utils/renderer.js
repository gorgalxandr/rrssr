console.log('Renderer installed')

export default function render(title, state = {}, app = '', footer) {
  let scripts = ''

  if (app) {
    scripts = ` <script>
        window.__STATE__ = ${JSON.stringify(state)}
      </script>
      <script src='bundle.js'></script>`
  } else {
    scripts = ` <script src='bundle.js'> </script> `
  }

  return `<!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='utf-8'>
      <title> ${title} </title>
      <style>
      .fouc {
        visibility: hidden;
      }
      </style>
      ${process.env.NODE_ENV === 'production'
        ? '<link rel=\'stylesheet\' type=\'text/css\' href=\'/styles/server.css\'>'
        : ''
      }
      <link href="styles/server.css" rel="stylesheet">
    </head>
    <body class='fouc'>
      <div id='app' class='u-full-width u-full-height'>
        <!--- magic happens here -->  ${app}
      </div>
    ${scripts}
    ${footer}
    </body>
    </html>`
}
