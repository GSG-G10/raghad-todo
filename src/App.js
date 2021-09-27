import React, { useState } from "react";
import {
  Checkbox,
  DatePicker,
  Card,
  Button,
  notification,
  Modal,
  Form,
  Input,
  Divider,
  PageHeader,
  Typography,
} from "antd";
import { EditOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import "./app.css";

function App() {
  const [isForm, setIsForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState([]);
  const [editableStr, setEditableStr] = useState("");

  // const [isAllChecked, setIsAllChecked] = useState(false);
  // const [checkedList, setCheckedList] = useState([]);
  // const [indeterminate, setIndeterminate] = useState(true);
  // const [checkAll, setCheckAll] = useState(false);
  const { TextArea } = Input;
  const { Paragraph } = Typography;

  const showForm = () => {
    setIsForm(true);
  };

  const cancelForm = () => {
    setIsForm(false);
  };

  const handleInputsChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  function handleDateChange(date, dateString) {
    setDate(dateString);
  }

  const openNotification = (title, description) => {
    notification["success"]({
      message: `New To-Do Added`,
      description: `${title}:  ${description}`,
    });
  };

  const addToDo = () => {
    setTodos((prev) => {
      return setTodos([
        {
          id: Math.random() * 1000 + Math.random() * 1000,
          title: title,
          description: description,
          date: date,
        },
        ...prev,
      ]);
    });
    setIsForm(false);
    openNotification(title, description);
  };

  // const plainOptions = todos.map((elem) => elem.title);
  // const onChange = (list) => {
  //   setCheckedList(list);
  //   setIndeterminate(!!list.length && list.length < plainOptions.length);
  //   setCheckAll(list.length === plainOptions.length);
  // };

  // const onCheckAllChange = (e) => {
  //   setCheckedList(e.target.checked ? plainOptions : []);
  //   setIndeterminate(false);
  //   setCheckAll(e.target.checked);
  // };

  const deleteTodo = (i) =>
    setTodos((prev) => {
      const newState = prev.filter((elem) => elem.id !== i);
      return setTodos(newState);
    });

  const editTodo = (id) => {
    setEdit(id);
  };

  return (
    <>
      <PageHeader className="page-header" title="To-Do" />

      <section className={todos.length ? "add-container" : "todo-page"}>
        {todos.length ? (
          <>
            <Button type="primary" size="large" onClick={showForm}>
              Add To-Do
            </Button>
            <Checkbox
            // indeterminate={indeterminate}
            // onChange={onCheckAllChange}
            >
              Check all
            </Checkbox>
          </>
        ) : (
          <div>
            <Button type="primary" size="large" onClick={showForm}>
              Add To-Do
            </Button>
          </div>
        )}
      </section>

      <section className="todos-container">
        <Divider />
        {todos.map((elem) => {
          return (
            <Card
              style={{
                margin: "6vh 0",
                borderRadius: "5px",
                boxShadow: "1px 4px 5px #b9b8b88a",
              }}
              title={<Checkbox key={elem.id}>{elem.title}</Checkbox>}
              extra={
                <>
                  <Button
                    style={{ backgroundColor: "#de7676" }}
                    onClick={() => deleteTodo(elem.id)}
                  >
                    Delete
                  </Button>
                  <EditOutlined
                    style={{ margin: "0 0 0 15px", fontSize: "20px" }}
                    onClick={() => editTodo(elem.id)}
                  />
                </>
              }
            >
              {edit === elem.id ? (
                <Paragraph
                  editable={{ onChange: setEditableStr }}
                  style={{
                    margin: "0 0 50px 0px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {editableStr ? editableStr : elem.description}
                </Paragraph>
              ) : (
                <Paragraph style={{ marginBottom: "30px" }}>
                  {elem.description}
                </Paragraph>
              )}

              {elem.date ? (
                <span style={{ color: "#939494" }}>{elem.date}</span>
              ) : null}
            </Card>
          );
        })}

        {/* <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        /> */}
      </section>

      <Modal
        title="Add a new To-Do"
        visible={isForm}
        footer={[
          <Button key="submit" type="primary" onClick={addToDo}>
            Add
          </Button>,
          <Button type="primary" onClick={cancelForm}>
            Cancel
          </Button>,
        ]}
      >
        <Form onChange={handleInputsChange}>
          <Form.Item
            label="Title"
            name="title"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Please add a title!" }]}
          >
            <Input value={title} name="title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Please add a description!" }]}
          >
            <TextArea rows={4} value={description} name="description" />
          </Form.Item>
          <Form.Item
            label="Date"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
          >
            <DatePicker onChange={handleDateChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default App;
