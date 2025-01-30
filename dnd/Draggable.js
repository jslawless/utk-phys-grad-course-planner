"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draggable = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@dnd-kit/core");
const utilities_1 = require("@dnd-kit/utilities");
function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = (0, core_1.useDraggable)({
        id: props.id,
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: utilities_1.CSS.Translate.toString(transform),
    };
    return (react_1.default.createElement("button", Object.assign({ ref: setNodeRef, style: style }, listeners, attributes), props.children));
}
exports.Draggable = Draggable;
