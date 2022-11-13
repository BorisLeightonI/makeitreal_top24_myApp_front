import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ModalEdit({flagState, handleModal, category, setFlag}) {
  const [show, setShow] = useState(flagState);
  const [name, setName] = useState(category.name);
  

  const handleClose = () => {
    setShow(false); 
    const timer = setTimeout(()=>{
      handleModal();
      return ()=>clearTimeout(timer)
    }, 700)
  };
  const handleShow = () => setShow(true);
  const handleEdit = (e) => {
    e.preventDefault();
    console.dir(e.target)
    axios.put(`http://localhost:8080/api/categories/${category._id}`,{name: name})
        .then(res => setFlag(res.data.data.updatedAt))
        .catch(err => console.error(err))
        .finally(() => handleClose())
  }
  const handleName = (e) => {
    setName(name => e.target.value);
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleEdit}>
              <label>
                <input className="form-control" name="name" placeholder={category.name} onChange={handleName}/>
              </label>
              <button className="btn btn-outline-info">Edit</button>
            </form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalEdit;