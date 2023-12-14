import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import axios from "axios";

export default function Todo() {
  const initialData = {
    title: "",
    description: "",
  };

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(initialData);
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = () => {
    axios
      .get("http://127.0.0.1:8000/api/Todo/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = () => {
    axios
      .post("http://127.0.0.1:8000/api/Todo/", newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo(initialData);
      })
      .catch((error) => {
        console.error("Error adding Todo: ", error);
      });
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
  };

  const handleUpdateTodo = () => {
    axios
      .put(`http://127.0.0.1:8000/api/Todo/${editTodo.id}/`, editTodo)
      .then((response) => {
        const updatedData = todos.map((todo) =>
          todo.id === editTodo.id ? response.data : todo
        );
        setTodos(updatedData);
        setEditTodo(null);
      })
      .catch((error) => {
        console.error("Error updating Todo: ", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/Todo/${id}/`)
      .then(() => {
        const updatedData = todos.filter((todo) => todo.id !== id);
        setTodos(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting Todo: ", error);
      });
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className="w-40">
          <Card className="bg-dark text-white my-3 mx-auto rounded-3">
            <Card.Body className="p-3 d-flex flex-column align-items-center">
              <h2 className="fw-bold mb-4 text-uppercase">Todo</h2>
              {editTodo ? (
                <Form className="w-100">
                  <Form.Group className="mb-4">
                    <Form.Label>Title :</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      value={editTodo.title}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Description :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      size="lg"
                      value={editTodo.description}
                      onChange={(e) =>
                        setEditTodo({
                          ...editTodo,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-light"
                      className="btn1 px-3 py-2 mb-4 btn-sm  m-auto"
                      onClick={handleUpdateTodo}
                      type="button"
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form className="w-100">
                  <Form.Group className="mb-4">
                    <Form.Label>Title :</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      value={newTodo.title}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Description :</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      size="lg"
                      value={newTodo.description}
                      onChange={(e) =>
                        setNewTodo({
                          ...newTodo,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-light"
                      className="btn1 px-3 py-2 mb-4 btn-sm  m-auto"
                      onClick={handleAddTodo}
                      type="button"
                    >
                      Add
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center">
        <Col>
          <h2 className="fw-bold mb-4 text-uppercase text-center">Todo List</h2>
          <Table striped bordered hover className="table w-75 mx-auto">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-dark"
                      className="me-2"
                      title="Edit"
                      onClick={() => handleEdit(data.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      title="Delete"
                      onClick={() => handleDelete(data.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
