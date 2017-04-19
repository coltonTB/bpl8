import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { A, P } from '../style/util';
import { COLORS } from '../constants';

const StyledAnchor = styled.a`
  color: ${ COLORS.gold };
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${ COLORS.gold_light }
  }
`;

const SourceLink = React.createClass({

  defaultProps: {
    offset: 0
  },

  componentDidMount() {
    this.props.onMount(this.payload);
  },

  onClick() {
    this.props.onClick(this.payload);
  },

  render() {
    return (
      <StyledAnchor
        ref={ el => {
          this.payload = {
            id: this.props.id,
            el: ReactDOM.findDOMNode(el),
            customOffset: this.props.offset
          };
        }}
        onClick={this.onClick}
      >
        { this.props.id }
      </StyledAnchor>
    );
  }
});

export const Machine1 = React.createClass({

  componentDidMount() {
    this.props.onSourceLinksMounted(this.sourceLinks);
  },

  onLinkMount(link) {
    if (!this.sourceLinks) {
      this.sourceLinks = [];
    }
    this.sourceLinks.push(link);
  },

  render() {
    const BoundLink = p => (
      <SourceLink {...p}
        onMount={ this.onLinkMount }
        onClick={ this.props.onLinkClick }/>
    );
    return (
      <P color={ COLORS.white } onClick={ e => e.stopPropagation() }>
        Thousands of characters. No alphabet. Millions of customers
        await whoever solves the puzzle first. How would you design a
        Chinese typewriter? <BoundLink id="01" /> Lore moluptaest et as nos et ut volorro
        volores tibus, core voluptur adignam qui il magnihiti cor rempore
        liasped que volori re aut vit volorercil in porerspis et odis ma pera
        nesed ut eos dit quide sitio iur aut ipsa eos
        <br/>
        <br/>

        Tam lab ipsant perae. Nequi nis modis non porecti cus aut
        anda dolliae laut rectem et hario mosam faciatu scimus audis
        eaquame nihit apeliqui to bea doluptae con estior re, aut atur?
        Del maioritem est, eos undit ut ipsaest occus sitaqui ut quo
        blabor am non rempore nam hita nam as exerferovidi <BoundLink id="02" />
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
        rporeptat. <BoundLink id="03" offset={-20}/>
        <br/>
        <br/>

        Loris quasperio blaudan diciis sum expligni tecuptiscia si qui
        dolupti simolut laccupt atiusant estrum simi, si cum am aut
        voluptatum inctur? <BoundLink id="04" offset={80}/>
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
