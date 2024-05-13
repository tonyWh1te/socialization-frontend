import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bars3Icon } from '@heroicons/react/16/solid';

const DraggableListItem = ({ index, withDragHandle, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return withDragHandle ? (
    <li
      ref={setNodeRef}
      style={style}
      /* eslint-disable */
      {...attributes}
      {...listeners}
      /* eslint-enable */
    >
      {children}
    </li>
  ) : (
    <li
      className="relative"
      ref={setNodeRef}
      style={style}
    >
      <div
        /* eslint-disable */
        {...attributes}
        {...listeners}
        /* eslint-enable */
        className="group absolute left-0 right-0 z-10 cursor-move pt-1"
      >
        <Bars3Icon className="invisible m-auto h-4 w-4 stroke-gray-300 group-hover:visible" />
      </div>
      {children}
    </li>
  );
};

export default DraggableListItem;
