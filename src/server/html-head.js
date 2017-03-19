import React from 'react';

export const asArray = ({assetUrl}) => (
  [
    <title key={1}>
      Radical Machines
    </title>,

    <meta key={2} name="description" content="" />,

    <meta key={3} name="author" content="" />,

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
      href={assetUrl("assets/style.css")}
    />,

    <link
      key={6}
      rel="icon"
      type="image/png"
      href="http://d1tug40blkttrl.cloudfront.net/icons/dot.ico"
    />
  ]
);
