import React from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';

import CenterNav from './center-nav';
import {Px, PxTitle, PxSection, PxLayer} from './parallax';

const HeroBgImage = styled(PxLayer)`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-x: 50%;
  height: 100%;
  width: 100%;
`;

const Home = (props, context) => (
  <div className="rm--home">
    <Px>

      <PxSection style={{zIndex: 5}}>
        <CenterNav />
        <PxLayer depth={-1}>
          <PxTitle> <h1>Radical Machines</h1><h1>It's a thing</h1></PxTitle>
        </PxLayer>
        <HeroBgImage depth={-2} imageUrl={context.localContext.assetUrl('/images/RAD.jpg')} />
      </PxSection>

      <PxSection style={{zIndex: 2}}>
        <CenterNav style={{transform: 'translateY(156px)'}}/>

        <PxLayer depth={0}>
          <PxTitle> Mid</PxTitle>
        </PxLayer>
        <PxLayer depth={-4} style={{background: 'green'}}>
          <PxTitle> Background</PxTitle>
        </PxLayer>
      </PxSection>

      <PxSection style={{zIndex: 4}}>
        <PxLayer depth={3}>
          <PxTitle> Foreground</PxTitle>
        </PxLayer>
        <PxLayer depth={0} style={{background: 'purple'}}>
          <PxTitle> Background</PxTitle>
        </PxLayer>
      </PxSection>

      <PxSection style={{zIndex: 3}}>
        <PxLayer depth={-2}>
          <PxTitle> Foreground</PxTitle>
        </PxLayer>
        <PxLayer depth={0}>
          <PxTitle> Mid</PxTitle>
        </PxLayer>
        <PxLayer depth={-5} style={{background: 'red'}}>
          <PxTitle> Background</PxTitle>
        </PxLayer>
      </PxSection>

    </Px>
  </div>
);

Home.contextTypes = {
  localContext: React.PropTypes.object
}

export default Home;
