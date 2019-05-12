import React, {Component} from 'react'
import {Stage, Layer, Text, Rect} from 'react-konva'
import Toolbar from './Toolbar'
import {getPageContentThunk, deselectCanvasElement } from '../store/content'
import {connect, ReactReduxContext, Provider} from 'react-redux'
import CanvasMedia from './CanvasMedia'
import CanvasText from './CanvasText'
import {createSinglePageThunk, setNextAndPrevious} from '../store/scrapbooks'
import MediaResizer from './MediaResizer'

class Canvas extends Component {
  constructor() {
    super()
    this.handlePageSubmit = this.handlePageSubmit.bind(this)
    this.state = {
      rectangles: [
        {
          x: 10,
          y: 10,
          width: 100,
          height: 100,
          fill: 'red',
          name: 'rect1'
        },
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          fill: 'green',
          name: 'rect2'
        }
      ],
      selectedShapeName: ''
    }
  }

  componentDidMount() {
    console.log('Our Id', this.props.match.params.id)
    this.props.getPageContent(this.props.match.params.id)
    this.props.setNextAndPrevious()
    // get from state
  }

  handlePageSubmit() {
    this.props.addPage()
  }

  handleStageMouseDown = e => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ''
      })
      return
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer'
    if (clickedOnTransformer) {
      return
    }

    // refactoring code to select image by id
    // find image by id
    const id = e.target.id()
    const image = this.props.allMedia.find(i => i.id === id)
    if(image) {
      if (image) {
        this.setState({
          selectedShapeName: id
        })
      } else {
        this.setState({
          selectedShapeName: ''
        })
      }
    }

    // find clicked rect by its name
    const name = e.target.name()
    const rect = this.state.rectangles.find(r => r.name === name)
    const images = this.props.allMedia
    if (rect || images) {
      this.setState({
        selectedShapeName: name
      })
    } else {
      this.setState({
        selectedShapeName: ''
      })
    }
  }

  //clicking on canvas deselects text and media
  handleOnClickLayer = () => {
    this.props.deselectCanvasElement()
  }

  render() {
    return (
      <ReactReduxContext.Consumer>
        {({store}) => (
          <div className="tile is-ancestor canvas">
            <div className="tile">
              <Toolbar scrapbookId={this.props.match.params.id} />
            </div>
            <div className="tile is-parent is-vertical">
              <div className="tile is-child">
                <button
                  className="button is-primary is-fullwidth add-page-button"
                  onClick={this.handlePageSubmit}
                  type="submit"
                >
                  Add Page
                </button>
              </div>
              <div className="tile is-child">
                <Stage
                  className="box"
                  width={1300}
                  height={500}
                  onMouseDown={this.handleStageMouseDown}
                  onClick={this.handleOnClickLayer}
                >
                  <Provider store={store}>
                    <Layer>
                      {this.props.allText.map(text => {
                        return (
                          <CanvasText
                            key={text.id}
                            content={text.content}
                            x_coord={text.x_coord}
                            y_coord={text.y_coord}
                            tilt={text.tilt}
                            color={text.color}
                            size={text.size}
                            id={text.id}
                          />
                        )
                      })}
                      {this.props.allMedia.map(media => {
                        return (
                          <CanvasMedia
                            key={media.id}
                            src={media.path}
                            x={media.x_coord}
                            y={media.y_coord}
                            width={media.width}
                            height={media.height}
                            tilt={media.tilt}
                            filter={media.filter}
                            name='rect'
                          />
                        )
                      })}
                      {this.state.rectangles.map((rect, i) => (
                        <Rectangle key={i} {...rect} />
                      ))}
                      <MediaResizer selectedShapeName={this.state.selectedShapeName} />
                    </Layer>
                  </Provider>
                </Stage>
              </div>
            </div>
          </div>
        )}
      </ReactReduxContext.Consumer>
    )
  }
}

const mapState = state => {
  return {
    allText: state.content.allText,
    allMedia: state.content.allMedia,
    editorText: state.content.editorText,
    singlePage: state.scrapbooks.singlePage
  }
}

const mapDispatch = dispatch => {
  return {
    getPageContent: (pageId) => dispatch(getPageContentThunk(pageId)),
    addPage: () => dispatch(createSinglePageThunk()),
    deselectCanvasElement: () => dispatch(deselectCanvasElement()),
    setNextAndPrevious: () => dispatch(setNextAndPrevious())
  }
}

export default connect(mapState, mapDispatch)(Canvas)

class Rectangle extends Component {
  render() {
    return (
      <Rect
        x={this.props.x}
        y={this.props.y}
        width={this.props.width}
        height={this.props.height}
        fill={this.props.fill}
        name={this.props.name}
        draggable
      />
    );
  }
}
