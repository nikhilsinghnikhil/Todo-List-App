
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';



export default function Title() {
    const [Task, setTask] = useState([]);
    const [newTask, setnewTask] = useState([""]);
    const [newDesc, setnewDesc] = useState([""]);
    const [editId, setEditId] = useState(null);

    let updateTask = (event) => {
        setnewTask(event.target.value);
    }

    let updateDesc = (event) => {
        setnewDesc(event.target.value);
    }

    let markAsDone = (id) => {
        setTask(Task.map(Task =>
            Task.id === id ? { ...Task, done: !Task.done } : Task
        ));
    };

    const deleteTask = (id) => {
        setTask(Task.filter(Task => Task.id !== id));
    }

    const addOrUpdateTask = (event) => {
        event.preventDefault();
        if (newTask.trim() && newDesc.trim()) {
            if (editId) {
                // Edit existing task
                setTask(Task.map(item =>
                    item.id === editId ? { ...item, task: newTask, desc: newDesc } : item
                ));
                setEditId(null);
            } else {
                // Add new task
                const newItem = {
                    id: uuidv4(),
                    task: newTask,
                    desc: newDesc,
                    done: false
                };
                setTask([...Task, newItem]);
            }
            setnewTask("");
            setnewDesc("");
        }
    };

    const startUpdate = (id) => {
        const taskToEdit = Task.find(item => item.id === id);
        setnewTask(taskToEdit.task);
        setnewDesc(taskToEdit.desc);
        setEditId(id);
    };



    return (
        <div>  
        <form onSubmit={addOrUpdateTask}>
            <input type="text" placeholder="Enter your Task here " id='text' value={newTask} required onChange={updateTask} /> <br /><br />
            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                placeholder='Enter your Description for Task'
                value={newDesc}
                onChange={updateDesc}
                required

            />
            <br /><br />
            <Button variant="contained" type="submit">Add Task</Button> <br /><br />
            {Task.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong> Marks as Done
                                </strong></TableCell>
                                <TableCell><strong>S.No</strong></TableCell>
                                <TableCell><strong>Task</strong></TableCell>
                                <TableCell><strong>Description</strong></TableCell>
                                <TableCell><strong>Delete</strong></TableCell>
                                <TableCell><strong>Update</strong></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Task.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell><Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => markAsDone(item.id)}
                                    >
                                        {item.done ? "Undo" : "Mark Done"}

                                    </Button></TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.task}</TableCell>
                                    <TableCell>{item.desc}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            size="small"
                                            onClick={() => deleteTask(item.id)}
                                            sx={{ ml: 1 }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            onClick={() => startUpdate(item.id)}
                                            sx={{ ml: 1 }}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </form>
        <br /><br />
             
        </div>
    )
}