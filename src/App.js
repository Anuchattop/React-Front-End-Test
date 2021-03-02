import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        text: todo,
        completed: false,
      },
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === "") return;
    addTodo();
    setTodo("");
  };

  const removeTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  //updatedTodos done
  const toggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Space>
          <Input
            style={{ width: 400 }}
            placeholder="Enter Task Name"
            onChange={handleChange}
            value={todo}
          />
          <button type="submit">Add</button>
        </Space>
      </form>
      <br />
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <br />
            <Card
              style={{ width: 600 }}
              onClick={() => toggleTodo(todo.id)}
              title={todo.text}
              extra={
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
              }
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space>
                  <Input
                    placeholder="Enter Subtask Name"
                    style={{ width: 400 }}
                  />
                  <Button type="primary">Add Subtask</Button>
                </Space>
                <Divider />
                <Row>
                  <Col span={16}></Col>
                  <Col span={8}></Col>
                </Row>
              </Space>
            </Card>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default App;
