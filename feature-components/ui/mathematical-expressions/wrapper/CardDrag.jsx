import React, {memo} from 'react';
import {DragSource, DropTarget} from 'react-dnd';

export const ItemTypes = {
  CARD: 'card',
}

const styleElementDrag = {
  background: "transparent",
  borderRadius: 8
}

const CardDrag = memo(({_text, isDragging, connectDragSource, connectDropTarget, children}) => {
  const opacity = isDragging ? 0 : 1;
  return connectDragSource(connectDropTarget(<div style={{...styleElementDrag, opacity}}>{children}</div>));
});

export default DropTarget(ItemTypes.CARD, {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    if (draggedId !== props.id) {
      props.moveCard(draggedId, props.id);
    }
  },
}, (connect) => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource(ItemTypes.CARD, {
  beginDrag: (props) => ({id: props.id}),
}, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(CardDrag));
