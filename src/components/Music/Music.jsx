import React, {PropTypes} from 'react'
import ReactDOM from "react-dom";
import "./Music.less"

const Music = React.createClass({
    onClickItem(e) {
        // e.stopPropagation();
        // e.preventDefault();
        let audio = ReactDOM.findDOMNode(this.refs.musicPlay);
        if (audio.paused) {
            this.refs.musicCont.className = "music play";
            audio.play();
        } else {
            this.refs.musicCont.className = "music";
            audio.pause();
        }
    },
    getInitialState() {
        return {play: true}
    },
    componentWillMount() {},

    componentDidUpdate() {},
    componentDidMount() {
        let This = this;
        document.body.onclick = function() {
            if (This.state.play) {
                This.onClickItem();
                This.setState({play: false});
            }
        }
    },

    render() {
        return (
            <div className="MusicBox">
                <span className="music" ref="musicCont" onClick={this.onClickItem}>
                    <audio ref="musicPlay" autoplay={false} src='res/bx.mp3' loop="loop"></audio>
                </span>
            </div>
        )
    }
})

export default Music
