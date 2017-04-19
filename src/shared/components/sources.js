import React from 'react';

import { Img, Div } from '../style/util';

export const Source1Text = props => (
  <div>
    <h3>
      Source Text, or Extra/ Additional Information on the Machine Itself
    </h3>
    <p>
      Thousands of characters. No alphabet. Millions of customers await whoever solves the puzzle  rst. How would you design a Chinese typewriter? 01 Lore moluptaest et as nos et ut volorro volores tibus, core voluptur adignam qui il magnihiti cor rempore liasped que volori re aut vit volorercil in porerspis et odis ma pera nesed ut eos dit quide sitio iur aut ipsa eos
      <br/>
      <br/>
      Tam lab ipsant perae. Nequi nis modis non porecti cus aut anda dolliae laut rectem et hario mosam faciatu scimus audis eaquame nihit apeliqui to bea doluptae con estior re, aut atur? Del maioritem est, eos undit ut ipsaest occus sitaqui ut quo blabor am non rempore nam hita nam as exerferovidi 02
      <br/>
      <br/>
      omnienis ex est aute lia solenet veliquaecum qui sequundam, quia volest antureperrum dolestis di omnis res et of c tenimpere lab iligenisHenduciatur modisitatus nullest iorporrum vitibusdanit maio voluptus reratur si voluptatus corem quaesciis dolora vidic totatiunt il ipsam, nos ad expernatqui quamet antorpos nate ped ut fugiasin con rescita speliti onsequam vene ditin cust aut aut es destia ipiciis vendae nos sequi doloriti blab is nus.
      Maxime volore solloria sedit voloresti se natem erio quiducit quiae aut dolorro et untibusdaes ma sitinus cum ea quaesequiam qui dicil illabo. It, of c te peratum latem hita vendistioria ium is consedit, suntior itempore ditincium ne nissunti dolupti onsecto rporeptat. 03
      <br/>
      <br/>
      Loris quasperio blaudan diciis sum expligni tecuptiscia si qui dolupti simolut laccupt atiusant estrum simi, si cum am aut voluptatum inctur? 04
      <br/>
      <br/>
      Nem am fugitatur, voluptatenia cusam debit et la nis re paris
      rem quodi sequi volupta tendior eritata dellaut et ut molendae. Num inctotaerrum untem. Ipsam, cor as et ut quat modis autecta ssumque ipit ant res autendernam ut fugias eaquo mi, nullecu sandictur?
    </p>
  </div>
);

export const Source1Images = (props, {localContext}) => (
  <div>
    <Img width="100%" src={ localContext.assetUrl('/images/src_1_img_1.png') } />
    <Div textAlign="center" color="black" margin="14px 0 60px 0">
      <strong>The man behind the exhibition</strong><br/>
      <span>Thousands of characters. No alphabet. Millions of customers await whoever solves the puzzle first</span>
    </Div>

    <Img width="100%" src={ localContext.assetUrl('/images/src_1_img_2.png') } />
    <Div textAlign="center" color="black" margin="14px 0 60px 0">
      <strong>The man behind the exhibition</strong><br/>
      <span>Thousands of characters. No alphabet. Millions of customers await whoever solves the puzzle first</span>
    </Div>

  </div>
);

Source1Images.contextTypes = {
  localContext: React.PropTypes.object
};
