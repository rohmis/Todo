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
  // Initial state for Todo and form fields
  const initialData = {
    title: "",
    description: "",
  };

  // States to manage Todos, form data, and editing state
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState(initialData);
  const [editTodo, setEditTodo] = useState(null);

  // Fetch Todos from API on component mount
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

  // Function to add a new Todo
  const handleAddTodo = () => {
    // Send a POST request to add a new Todo
    axios
      .post("http://127.0.0.1:8000/api/Todo/", newTodo)
      .then((response) => {
        // Update Todos state with the newly added Todo
        setTodos([...todos, response.data]);
        // Reset form fields to initial state
        setNewTodo(initialData);
      })
      .catch((error) => {
        console.error("Error adding Todo: ", error);
      });
  };

  // Function to handle editing of a Todo
  const handleEdit = (id) => {
    // Find the Todo to edit by ID and set it to editTodo state
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
  };

  // Function to update an existing Todo
  const handleUpdateTodo = () => {
    // Send a PUT request to update the Todo
    axios
      .put(`http://127.0.0.1:8000/api/Todo/${editTodo.id}/`, editTodo)
      .then((response) => {
        // Update Todos state with the updated Todo
        const updatedData = todos.map((todo) =>
          todo.id === editTodo.id ? response.data : todo
        );
        setTodos(updatedData);
        // Reset editTodo state after updating
        setEditTodo(null);
      })
      .catch((error) => {
        console.error("Error updating Todo: ", error);
      });
  };

  // Function to delete a Todo
  const handleDelete = (id) => {
    // Send a DELETE request to remove the Todo
    axios
      .delete(`http://127.0.0.1:8000/api/Todo/${id}/`)
      .then(() => {
        // Filter out the deleted Todo and update Todos state
        const updatedData = todos.filter((todo) => todo.id !== id);
        setTodos(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting Todo: ", error);
      });
  };

  return (
    <Container fluid>
      {/* Todo Form */}
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className="w-40">
          <Card className="bg-dark text-white my-3 mx-auto rounded-3">
            <Card.Body className="p-3 d-flex flex-column align-items-center">
              <h2 className="fw-bold mb-4 text-uppercase">Todo</h2>
              <Form className="w-100">
                {/* Form fields for Title and Description */}
                <Form.Group className="mb-4">
                  <Form.Label>Title :</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    value={editTodo ? editTodo.title : newTodo.title}
                    onChange={(e) =>
                      editTodo
                        ? setEditTodo({ ...editTodo, title: e.target.value })
                        : setNewTodo({ ...newTodo, title: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Description :</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    size="lg"
                    value={
                      editTodo ? editTodo.description : newTodo.description
                    }
                    onChange={(e) =>
                      editTodo
                        ? setEditTodo({
                            ...editTodo,
                            description: e.target.value,
                          })
                        : setNewTodo({
                            ...newTodo,
                            description: e.target.value,
                          })
                    }
                  />
                </Form.Group>
                {/* Add or Update Todo Button */}
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-light"
                    className="btn1 px-3 py-2 mb-4 btn-sm  m-auto"
                    onClick={editTodo ? handleUpdateTodo : handleAddTodo}
                    type="button"
                  >
                    {editTodo ? "Update" : "Add"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Todo List */}
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
              {/* Displaying Todos in a Table */}
              {todos.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td className="text-center">
                    {/* Buttons for Edit and Delete */}
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
