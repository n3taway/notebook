class Button extends React.Component {
    state = {
        rippleX: 0,
        rippleY: 0,
        rippleH: 0,
        rippleW: 0,
    }

    componentDidMount() {
        this.rippleNode = document.querySelector('.ripple');
    }

    handleClick = (e) => {
        this.rippleNode.classList.remove('rippleEffect');
        const {
            x, y, width, height,
        } = e.target.getBoundingClientRect();
        const offSetX = e.clientX - x;
        const offSetY = e.clientY - y;
        const rippleSide = width >= height ? width : height;
        this.setState({
            rippleH: rippleSide,
            rippleW: rippleSide,
            rippleX: offSetY - rippleSide / 2,
            rippleY: offSetX - rippleSide / 2,
        }, this.rippleDoAnimation);
    }


    rippleDoAnimation = () => {
        this.rippleNode.classList.add('rippleEffect');
    }

    render() {
        const {
            rippleX,
            rippleY,
            rippleH,
            rippleW,
        } = this.state;
        return (
            <div className="btn-warp">
                <div
                    className="btn-content"
                    onClick={this.handleClick}
                >
                    {this.props.children}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: rippleX,
                        left: rippleY,
                        height: rippleH,
                        width: rippleW,
                        background: 'skyblue',
                        pointerEvents: 'none',
                    }}
                    className="ripple"
                />
            </div>
        );
    }
}