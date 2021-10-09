import React, { Component } from "react";
import "./App.css";
import FormInput from "./components/FormInput";
import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import EditTodo from "./components/EditTodo";
// import ConfirmModal from "./components/ConfirmModal";

export default class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "reading book",
      },
      {
        id: 2,
        title: "play game",
      },
    ],
    isEdit: false,
    isModalConfirm: false,
    editTodo: {
      id: "",
      title: "",
    },
  };

  // function for delete
  deleteTask = (id) => {
    this.setState({
      todos: this.state.todos.filter(item => item.id !== id)
    })
  };

  // function for add
  addTask = (dataTitle) => {
    const id = this.state.todos.length;
    const newData = {
      id: id + 1,
      title: dataTitle,
    };
    this.setState({
      todos: [...this.state.todos, newData],
    });
  };

  // function for open modal edit
  openModalEdit = (id, data) => {
    this.setState({
      isEdit: true,
      editTodo: {
        id,
        title: data,
      },
    });
  };
  // function for close modal edit
  closeModalEdit = () => {
    this.setState({
      isEdit: false,
    });
  };

  // function for set data edit
  setEditTitle = (e) => {
    this.setState({
      editTodo: {
        ...this.state.editTodo,
        title: e.target.value,
      },
    });
  };

  // function for push modal edit
  update = () => {
    const { id, title } = this.state.editTodo;
    const newData = { id, title };
    const newTodos = this.state.todos;
    newTodos.splice(id - 1, 1, newData);
    this.setState({
      todos: newTodos,
      isEdit: false,
      editTodo: {
        id: "",
        title: "",
      },
    });
  };

  render() {
    const { todos } = this.state;
    return (
      <div className="app">
        <Header />
        <div className="list">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              todoData={item}
              del={this.deleteTask}
              editModal={this.openModalEdit}
            />
          ))}
        </div>
        <div className="input-form">
          <FormInput add={this.addTask} />
        </div>
        <EditTodo
          edit={this.state.isEdit}
          close={this.closeModalEdit}
          changeTitile={this.setEditTitle}
          data={this.state.editTodo}
          update={this.update}
        />
      </div>
    );
  }
}
