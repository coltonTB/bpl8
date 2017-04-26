import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { A, P } from '../style/util';
import { COLORS } from '../constants';

const StyledAnchor = styled.a`
  color: ${ COLORS.gold };
  text-decoration: underline;
  font-weight: bold;
`;

const SourceLink = React.createClass({
  defaultProps: {
    offset: 0
  },
  render() {
    return (
      <StyledAnchor>
        { this.props.children }
      </StyledAnchor>
    );
  }
});

export const Machine1 = React.createClass({

  propTypes: {
    onSourceLinksMounted: React.PropTypes.func,
    onLinkClick: React.PropTypes.func
  },

  componentDidMount() {
    const sourceLinks = Object.keys(this.refs).map(ref => ({
      id: ref,
      el: ReactDOM.findDOMNode(this.refs[ref]),
      customOffset: this.refs[ref].props.offset
    }));
    this.props.onSourceLinksMounted(sourceLinks);
  },

  render() {
    return (
      <P color={ COLORS.white } onClick={ e => e.stopPropagation() }>
        Thousands of characters. No alphabet. Millions of customers
        await whoever solves the puzzle first. How would you design a
        Chinese typewriter? <SourceLink ref="01">01</SourceLink> Lore moluptaest et as nos et ut volorro
        volores tibus, core voluptur adignam qui il magnihiti cor rempore
        liasped que volori re aut vit volorercil in porerspis et odis ma pera
        nesed ut eos dit quide sitio iur aut ipsa eos
        <br/>
        <br/>

        Tam lab ipsant perae. Nequi nis modis non porecti cus aut
        anda dolliae laut rectem et hario mosam faciatu scimus audis
        eaquame nihit apeliqui to bea doluptae con estior re, aut atur?
        Del maioritem est, eos undit ut ipsaest occus sitaqui ut quo
        blabor am non rempore nam hita nam as exerferovidi <SourceLink ref="02">02</SourceLink>
        <br/>
        <br/>

        omnienis ex est aute lia solenet veliquaecum qui sequundam,
        quia volest antureperrum dolestis di omnis res et of c tenimpere
        lab iligenisHenduciatur modisitatus nullest iorporrum vitibusdanit
        maio voluptus reratur si voluptatus corem quaesciis dolora vidic
        totatiunt il ipsam, nos ad expernatqui quamet antorpos nate ped
        ut fugiasin con rescita speliti onsequam vene ditin cust aut aut
        es destia ipiciis vendae nos sequi doloriti blab is nus.
        Maxime volore solloria sedit voloresti se natem erio quiducit
        quiae aut dolorro et untibusdaes ma sitinus cum ea quaesequiam
        qui dicil illabo. It, of c te peratum latem hita vendistioria ium is
        consedit, suntior itempore ditincium ne nissunti dolupti onsecto
        rporeptat. <SourceLink ref="03" offset={-20}>03</SourceLink>
        <br/>
        <br/>

        Loris quasperio blaudan diciis sum expligni tecuptiscia si qui
        dolupti simolut laccupt atiusant estrum simi, si cum am aut
        voluptatum inctur? <SourceLink ref="04" offset={80}>04</SourceLink>
        <br/>
        <br/>

        Nem am fugitatur, voluptatenia cusam debit et la nis re paris
        rem quodi sequi volupta tendior eritata dellaut et ut molendae.
        Num inctotaerrum untem. Ipsam, cor as et ut quat modis autecta
        ssumque ipit ant res autendernam ut fugias eaquo mi, nullecu
        sandictur?
      </P>
    );
  }
});
