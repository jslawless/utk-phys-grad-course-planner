"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Droppable = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@dnd-kit/core");
function Droppable(props) {
    const { isOver, setNodeRef } = (0, core_1.useDroppable)({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };
    return (react_1.default.createElement("div", { ref: setNodeRef, style: style }, props.children));
}
exports.Droppable = Droppable;
