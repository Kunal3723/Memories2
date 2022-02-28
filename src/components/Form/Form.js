import React, { useState, useEffect } from 'react';
import useStyles from "./styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../redux/actions/posts';
function Form({ currentId, setCurrentId }) {

    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const [postData, setPostData] = useState({

        title: "",
        message: "",
        tags: '',
        selectedFile: ""
    });
    const User = JSON.parse(localStorage.getItem("profile"));
    const classes = useStyles();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);


    const dispatch = useDispatch();
    function handleSubmit(e) {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: User.result.name }));
            setCurrentId(null);
        }
        else {
            dispatch(createPost({ ...postData, name: User.result.name }));
        }
        clear();
    }
    function clear() {
        setPostData({

            title: "",
            message: "",
            tags: '',
            selectedFile: ""
        });
        setCurrentId(null);
    }

    if (!User?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return <div>
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={function (e) { handleSubmit(e); }}>
                <Typography variant="h6">{!currentId ? "Create " : "Update"} a Memory</Typography>

                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={function (e) { setPostData({ ...postData, title: e.target.value }) }} />

                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={function (e) { setPostData({ ...postData, message: e.target.value }) }} />

                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={function (e) { setPostData({ ...postData, tags: e.target.value.split(",") }) }} />

                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={function () { clear() }} fullWidth>Clear</Button>
            </form>
        </Paper>
    </div>;
}

export default Form;
