import { useState } from "react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const DUMMY = [
  {
    id: "123",
    items: [
      { id: "1", name: "item 1" },
      { id: "2", name: "item 2" },
      { id: "3", name: "item 3" },
      { id: "4", name: "item 4" },
      { id: "5", name: "item 5" },
    ],
  },
  {
    id: "456",
    items: [
      { id: "6", name: "item 6" },
      { id: "7", name: "item 7" },
    ],
  },
];

function App() {
  const [data, updateData] = useState(DUMMY);

  const handleOnDragEnd = (res) => {
    console.log(res);
    if (!res.destination) {
      return;
    }

    if (
      res.source.droppableId === res.destination.droppableId &&
      res.source.index === res.destination.index
    ) {
      return;
    }

    if (res.source.droppableId !== res.destination.droppableId) {
      const sourceDroppableIndex = data.findIndex(
        (item) => item.id === res.source.droppableId
      );
      const destinationDroppableIndex = data.findIndex(
        (item) => item.id === res.destination.droppableId
      );
      const sourceItems = [...data[sourceDroppableIndex].items];
      const destinationItems = [...data[destinationDroppableIndex].items];
      const [reorderedItem] = sourceItems.splice(res.source.index, 1);
      destinationItems.splice(res.destination.index, 0, reorderedItem);

      const temp = [...data];
      temp[sourceDroppableIndex] = {
        ...data[sourceDroppableIndex],
        items: sourceItems,
      };

      temp[destinationDroppableIndex] = {
        ...data[destinationDroppableIndex],
        items: destinationItems,
      };

      updateData(temp);
      return;
    }

    const destinationIndex = data.findIndex(
      (data) => res.destination.droppableId === data.id
    );
    const destinationItems = [...data[destinationIndex].items];
    const [reorderedItem] = destinationItems.splice(res.source.index, 1);
    destinationItems.splice(res.destination.index, 0, reorderedItem);
    const newData = [...data];
    newData[destinationIndex] = {
      ...data[destinationIndex],
      items: destinationItems,
    };
    updateData(newData);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="main-container">
        <Droppable droppableId={data[0].id} direction="horizontal">
          {(provided) => (
            <ul
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data[0].items.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        className="container-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        <Droppable droppableId={data[1].id} direction="horizontal">
          {(provided) => (
            <ul
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data[1].items.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        className="container-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
