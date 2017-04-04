const Scaffold = (props, reactContent) =>
`
  <!doctype html>
  <html lang="en">

    <head>
      <title>Radical Machines</title>
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css"/>
      <link rel="stylesheet" type="text/css" href=${props.localContext.assetUrl("/assets/style.css")} />
      <link rel="icon" type="image/png" href="http://d1tug40blkttrl.cloudfront.net/icons/dot.ico"/>

      <script type="text/javascript">
        window.__locals__=${JSON.stringify(props.localContext)}
      </script>
    </head>

    <body>
      <div id="app-content">${reactContent}</div>
      <script type="text/javascript" src="${props.localContext.assetUrl("/assets/browser-bundle.js")}"></script>
    </body>

  </html>
`

export default Scaffold;
