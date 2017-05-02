import React from 'react';
import ReactDOM from 'react-dom';
import ReactSVG from 'react-svg'
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { FlexContainer } from '../../style/flexbox';
import { Div } from '../../style/util'
import { Hideable } from '../../style/hideable';
import { scrollLimit, scrollToTop } from '../../style/scroll-helpers';
import { getEventManagerInstance } from '../../style/event-manager';

import { Content, ContentLeft } from '../../style/content-column';
import { CenterNav, CenterNavBackground } from '../center-nav';
import { Footer } from '../footer'

import { Machine } from './machine';
import { MachineDetails } from './machine-details';
import { ExpandableCenterNav } from './expandable-center-nav';
import { SourceLink } from './source-link';

const TOP_SECTION_HEIGHT = 210;
const LEFT_OFFSET = "690px";
const stopProp = e => e.stopPropagation();
const eventMangerInstance = getEventManagerInstance();

const ImagesLeft = styled(ContentLeft)`
  flex-wrap: nowrap;
  flex-direction: column;
  align-self: flex-start;
  padding: 12px;
`;
const ImagesRight = styled(Content)`
  flex-wrap: nowrap;
  flex-direction: column;
  align-self: flex-start;
  padding: 12px;
`;
const MachinesContainer = styled(Div)`
  display: flex;
  flex-wrap: nowrap;
  height: 2050px;
  max-width: 1200px;
  margin-top: 80px;
  position: relative;
`;

const Overview = React.createClass({

  getInitialState() {
    return {
      selectedMachine: null,
      selectedSourceLink: null,
      visibleSourceLink: null,
      sourceLinks: []
    }
  },

  handleMachineClick(data) {
    const selectedMachine = data.id === this.state.selectedMachine ? null : data.id;
    this.setState({
      selectedMachine
    });
    scrollToTop();
  },

  handleSourceLinkClick(id) {
    this.setState({
      selectedSourceLink: id
    });
    scrollToTop();
  },

  renderSourceLinks(links) {
    this.setState({
      sourceLinks: links
    })
  },

  getVisibleSourceLink() {
    let visibleSourceLink = null;
    const sourceLinkCenter = ReactDOM.findDOMNode(this.refs.sourceLinkCenter);
    if (sourceLinkCenter) {
      const offset = sourceLinkCenter.offsetTop;
      const offsetAbsoluteHeight = window.scrollY + offset - 200;
      this.state.sourceLinks.forEach((srcLink, i) => {
        const linkOffset = srcLink.el.offsetTop;
        if (offsetAbsoluteHeight > linkOffset) {
          visibleSourceLink = i;
        }
      });
      const lastSourceLink = this.state.sourceLinks[this.state.sourceLinks.length - 1];
      const lastSourceLinkOffset = lastSourceLink.el.offsetTop;
      if (offsetAbsoluteHeight > lastSourceLinkOffset + 300) {
        visibleSourceLink = null;
      }
    }
    this.setState({visibleSourceLink});
  },

  clearState() {
    this.setState(this.getInitialState());
  },

  componentDidMount() {
    this.eventId = eventMangerInstance.addEvent(() => this.getVisibleSourceLink());
  },

  componentWillUnmount() {
    this.eventId && eventMangerInstance.removeEvent(this.eventId);
  },

  render() {
    const content = key => this.context.localContext.getContent('overview', key);
    return (
      <Div background={ COLORS.black } onClick={ this.clearState }>

        <ExpandableCenterNav
          onClick={ stopProp }
          selectedMachine={ this.state.selectedMachine }
          selectedSourceLink={ this.state.selectedSourceLink }
          onCloseClick={ () => this.handleSourceLinkClick(null) }
        />

        <CenterNav fixed isExpanded={ () =>
          this.state.selectedMachine === null &&
          scrollLimit(TOP_SECTION_HEIGHT)()
        }/>

        <FlexContainer height={TOP_SECTION_HEIGHT + 'px'}>
          <ContentLeft align="flex-start">
            <h2>
              { content('title') }
            </h2>
          </ContentLeft>
          <CenterNavBackground />
          <Content color={ COLORS.gold } align="flex-start">
            <h5>
              { content('subtitle') }
            </h5>
          </Content>
        </FlexContainer>

        <Hideable hideInitially isVisible>

          <FlexContainer>
            <MachinesContainer>
              <ImagesLeft>
                <Machine
                  data={ content('machines')[0] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  top="600px"
                  data={ content('machines')[2] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  top="1170px"
                  data={ content('machines')[4] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
              </ImagesLeft>

              <CenterNavBackground flexDirection="column" onClick={stopProp}>
                {
                  this.state.selectedMachine !== null &&
                  this.state.selectedSourceLink === null &&
                  this.state.sourceLinks.length &&
                    <SourceLink
                      ref='sourceLinkCenter'
                      {...this.state.sourceLinks[this.state.visibleSourceLink]}
                      onClick={this.handleSourceLinkClick}
                    />
                }
              </CenterNavBackground>

              <ImagesRight color={ COLORS.gold }>
                <Hideable
                  isVisible={ this.state.selectedMachine !== null }
                  delay="0.3s"
                >
                  {
                    this.state.selectedMachine !== null &&
                      <MachineDetails
                        leftOffset={ LEFT_OFFSET }
                        data={ content('machineDetails') }
                        selectedMachine={ this.state.selectedMachine }
                        onSourceLinksMounted={ this.renderSourceLinks }
                      />
                  }
                </Hideable>
                <Machine
                  left={LEFT_OFFSET}
                  data={ content('machines')[1] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="870px"
                  data={ content('machines')[3] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
                <Machine
                  left={LEFT_OFFSET}
                  top="1520px"
                  data={ content('machines')[5] }
                  onClick={ this.handleMachineClick }
                  selectedMachine={this.state.selectedMachine}
                />
              </ImagesRight>
            </MachinesContainer>
          </FlexContainer>
        </Hideable>

        <Footer />

      </Div>
    );
  }
});

Overview.contextTypes = {
  localContext: React.PropTypes.object
};

export default Overview;
