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
    <link key={4} href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css" />,
    <link key={5} rel="stylesheet" href={assetUrl("assets/main.css")} />
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
