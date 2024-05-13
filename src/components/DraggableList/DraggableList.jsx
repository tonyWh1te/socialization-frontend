import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableListItem from './DraggableListItem/DraggableListItem';

const DraggableList = ({
  data,
  classNameList,
  renderItemContent,
  onDragEnd,
  withDragHandle = false,
}) => (
  <DndContext
    onDragEnd={onDragEnd}
    collisionDetection={closestCorners}
  >
    <ul className={classNameList}>
      <SortableContext
        items={data}
        strategy={verticalListSortingStrategy}
      >
        {data.map((item, index) => (
          <DraggableListItem
            key={item?.id || index}
            index={item?.id || index}
            withDragHandle={withDragHandle}
          >
            {renderItemContent && renderItemContent(item, index)}
          </DraggableListItem>
        ))}
      </SortableContext>
    </ul>
  </DndContext>
);

export default DraggableList;
