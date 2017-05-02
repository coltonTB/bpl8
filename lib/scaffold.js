const Scaffold = (props, reactContent) =>
`
  <!doctype html>
  <html lang="en">

    <head>
      <title>Radical Machines</title>
      <meta name="description" content="" />
      <meta name="author" content="" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

      <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css"/>
      <link rel="stylesheet" type="text/css" href=${props.localContext.assetUrl("/assets/style.css")} />
      <link rel="icon" type="image/png" href="http://d1tug40blkttrl.cloudfront.net/icons/dot.ico"/>

      <!- StyledComponents ->
        <style type="text/css">${props.styleSheet.getCSS()}</style>
      <!- StyledComponents ->

      <script type="text/javascript">
        window.__locals__=${JSON.stringify({...props.localContext, imageUrls: props.imageUrls})}
      </script>
    </head>

    <body>
      <div id="app-content">${reactContent}</div>
      <script type="text/javascript" src="${props.localContext.assetUrl("/assets/browser-bundle.js")}"></script>
    </body>

  </html>
`

export default Scaffold;
