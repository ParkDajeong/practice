import React, { Component } from "react";
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
  id = 3;
  // rerendering이 필요한 것만 state 값으로..
  state = {
    information: [
      {
        id: 0,
        name: "Hermione Granger",
        phone: "010-0000-0001",
      },
      {
        id: 1,
        name: "Harry Potter",
        phone: "010-0000-0002",
      },
      {
        id: 2,
        name: "Ron Weasley",
        phone: "010-0000-0003",
      },
    ],
    keyword: "",
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({
        ...data,
        id: this.id++,
      }),
    });
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id),
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) => {
        if (info.id === id) {
          return {
            id,
            ...data,
          };
        }
        return info;
      }),
    });
  };

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate} />
        <input //
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="검색..."
        />
        <PhoneInfoList //
          data={this.state.information.filter((info) => {
            const name = info.name.toLowerCase();
            const keyword = this.state.keyword.toLowerCase();
            return name.indexOf(keyword) > -1;
          })}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
