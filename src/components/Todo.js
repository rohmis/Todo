import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Stack,
} from "react-bootstrap";
import axios from "axios";

export default function Todo() {
    const initialData={
        title: "", description: ""
      }
  const [apiData, setApiData] = useState([]);
  const [newTodo, setNewTodo] = useState(initialData);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://127.0.0.1:8000/api/Todo/")
      .then((response) => {
        setApiData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  console.log(apiData);

  

  // Add Todo

  const handleAddTodo = () => {
    axios
      .post("http://127.0.0.1:8000/api/Todo/", newTodo)
      .then((response) => {
        setApiData([...apiData, response.data]);
        setNewTodo({ title: "", description: "" }); // Clear input fields after adding
      })
      .catch((error) => {
        console.error("Error adding Todo: ", error);
      });
  };

  // Edit  Todo

  const handleEdit = (id) => {
    // Find the todo to edit by ID
    const todoToEdit = apiData.find((todo) => todo.id === id);
    setEditTodo(todoToEdit);
  };

  const handleUpdateTodo = () => {
    axios
      .put(`http://127.0.0.1:8000/api/Todo/${editTodo.id}/`, editTodo)
      .then((response) => {
        // Update the todo in the state after editing
        const updatedData = apiData.map((todo) =>
          todo.id === editTodo.id ? response.data : todo
        );
        setApiData(updatedData);
        setEditTodo(null); // Clear edit state after updating
      })
      .catch((error) => {
        console.error("Error updating Todo: ", error);
      });
  };

  // Delete Todo

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/Todo/${id}/`)
      .then(() => {
        // Remove the deleted todo from the state
        const updatedData = apiData.filter((todo) => todo.id !== id);
        setApiData(updatedData);
      })
      .catch((error) => {
        console.error("Error deleting Todo: ", error);
      });
  };

  

  return (
    <>
      {/* Todo Form */}

      <Container fluid>
        <Row className="justify-content-center align-items-center ">
          <Col xs={12} md={6} style={{ width: "40%" }}>
            <Card className="bg-dark text-white my-3 mx-auto rounded-3">
              <Card.Body className="p-3 d-flex flex-column align-items-center">
                <h2 className="fw-bold mb-4 text-uppercase">Todo</h2>


                {editTodo ? ( // Show edit form if editTodo is not null
          <Form className="w-100">
            {/* Edit Form Fields */}
            <Form.Group className="mb-4">
              <Form.Label className="text-white">Title :</Form.Label>
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
              <Form.Label className="text-white">Description :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                size="lg"
                value={editTodo.description}
                onChange={(e) =>
                  setEditTodo({ ...editTodo, description: e.target.value })
                }
              />
            </Form.Group>
            <div style={{ marginLeft: "40%" }}>
              <Button
                variant="outline-light"
                className="px-4 mb-4"
                onClick={handleUpdateTodo}
                type="button"
              >
                Update
              </Button>
            </div>
          </Form>
        ) : (
          // Show add form if editTodo is null
          <Form className="w-100">
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Title :</Form.Label>
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
            <Form.Label className="text-white">Description :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              size="lg"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo({ ...newTodo, description: e.target.value })
              }
            />
          </Form.Group>
          <div style={{ marginLeft: "40%" }}>
            <Button
              variant="outline-light"
              className="px-4 mb-4"
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
      </Container>

      {/* Show form data */}

      <Container fluid>
        <Row className="justify-content-center align-items-center ">
          <Col>
            <h1 style={{ textAlign: "center" }}>Todo List</h1>
            <Table striped bordered hover className="table">
              {/* Table content */}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {apiData.map((data) => (
                  <tr key={data.id} style={{ height: "50px" }}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.description}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        variant="outline-dark"
                        style={{ marginRight: "20px" }}
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
                        {" "}
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
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Button,
//   Card,
//   Table,
// } from "react-bootstrap";
// import axios from "axios";

// export default function Todo() {
//   const [apiData, setApiData] = useState([]);
//   const [newTodo, setNewTodo] = useState({ title: "", description: "" });
//   const [editTodo, setEditTodo] = useState(null); // To store the todo being edited

//   useEffect(() => {
//     // Fetch data from the API
//     axios
//       .get("http://127.0.0.1:8000/api/Todo/")
//       .then((response) => {
//         setApiData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   const handleAddTodo = () => {
//     axios
//       .post("http://127.0.0.1:8000/api/Todo/", newTodo)
//       .then((response) => {
//         setApiData([...apiData, response.data]);
//         setNewTodo({ title: "", description: "" }); // Clear input fields after adding
//       })
//       .catch((error) => {
//         console.error("Error adding Todo: ", error);
//       });
//   };

//   const handleEdit = (id) => {
//     // Find the todo to edit by ID
//     const todoToEdit = apiData.find((todo) => todo.id === id);
//     setEditTodo(todoToEdit);
//   };

//   const handleUpdateTodo = () => {
//     axios
//       .put(`http://127.0.0.1:8000/api/Todo/${editTodo.id}/`, editTodo)
//       .then((response) => {
//         // Update the todo in the state after editing
//         const updatedData = apiData.map((todo) =>
//           todo.id === editTodo.id ? response.data : todo
//         );
//         setApiData(updatedData);
//         setEditTodo(null); // Clear edit state after updating
//       })
//       .catch((error) => {
//         console.error("Error updating Todo: ", error);
//       });
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://127.0.0.1:8000/api/Todo/${id}/`)
//       .then(() => {
//         // Remove the deleted todo from the state
//         const updatedData = apiData.filter((todo) => todo.id !== id);
//         setApiData(updatedData);
//       })
//       .catch((error) => {
//         console.error("Error deleting Todo: ", error);
//       });
//   };

//   return (
//     <>
//       {/* Todo Form */}
//       <Container fluid>
//         {/* ... */}
//         {editTodo ? ( // Show edit form if editTodo is not null
//           <Form className="w-100">
//             {/* Edit Form Fields */}
//             <Form.Group className="mb-4">
//               <Form.Label className="text-white">Title :</Form.Label>
//               <Form.Control
//                 type="text"
//                 size="lg"
//                 value={editTodo.title}
//                 onChange={(e) =>
//                   setEditTodo({ ...editTodo, title: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-4">
//               <Form.Label className="text-white">Description :</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 size="lg"
//                 value={editTodo.description}
//                 onChange={(e) =>
//                   setEditTodo({ ...editTodo, description: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <div style={{ marginLeft: "40%" }}>
//               <Button
//                 variant="outline-light"
//                 className="px-4 mb-4"
//                 onClick={handleUpdateTodo}
//                 type="button"
//               >
//                 Update
//               </Button>
//             </div>
//           </Form>
//         ) : (
//           // Show add form if editTodo is null
//           <Form className="w-100">
//             {/* Add Form Fields */}
//             {/* ... */}
//           </Form>
//         )}
//         {/* ... */}
//       </Container>

//       {/* Show form data */}
//       <Container fluid>
//         {/* ... */}
//         <Table striped bordered hover className="table">
//           {/* ... */}
//           <tbody>
//             {apiData.map((data) => (
//               <tr key={data.id} style={{ height: "50px" }}>
//                 {/* ... */}
//                 <td style={{ textAlign: "center" }}>
//                   <Button
//                     variant="outline-dark"
//                     style={{ marginRight: "20px" }}
//                     title="Edit"
//                     onClick={() => handleEdit(data.id)}
//                   >
//                     <i className="fas fa-edit"></i>
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     title="Delete"
//                     onClick={() => handleDelete(data.id)}
//                   >
//                     <i className="fas fa-trash-alt"></i>
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         {/* ... */}
//       </Container>
//     </>
//   );
// }
