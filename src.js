"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// Example();
const e = react_1.default.createElement;
class LikeButton extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }
    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }
        return e('button', { onClick: () => this.setState({ liked: true }) }, 'Like');
    }
}
const domContainer = document.querySelector('#like_button_container');
//@ts-ignore
const root = ReactDOM.createRoot(domContainer);
root.render(e(LikeButton));
