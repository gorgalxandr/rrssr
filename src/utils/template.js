export default function template(title, initialState = {}, content = '') {
  let scripts = ''

  if (content) {
    scripts = ` <script>
                   window.__STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script src='client.js'></script>
                `
  } else {
    scripts = ` <script src='bundle.js'> </script> `
  }

  let page = `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="utf-8">
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
                  <!--- magic happens here -->  ${content}
                </div>
              <footer>Coming from template.js</footer>
              ${scripts}
              </body>
              </html>
              `

  return page
}