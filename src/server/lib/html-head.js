import React from 'react';

export default (req, res, next) => {

  const title = () => (
    <title key={1}>Radical Machines</title>
  );

  const meta = () => [
    <meta key={2} name="description" content="" />,
    <meta key={3} name="author" content="" />
  ];

  const link = (assetUrl) => [
    <link
      key={4}
      href="//fonts.googleapis.com/css?family=Raleway:400,300,600"
      rel="stylesheet"
      type="text/css"
    />,
    <link
      key={5}
      rel="stylesheet"
      type="text/css"
      href={assetUrl("assets/main.css")}
    />,
    <link
      key={6}
      rel="icon"
      type="image/png"
      href="http://d1tug40blkttrl.cloudfront.net/icons/dot.ico"
    />
  ];

  res.locals.header = {
    render() {
      return [
        title(),
        meta(),
        link(res.locals.assetUrl),
      ];
    }
  };

  next();
}
