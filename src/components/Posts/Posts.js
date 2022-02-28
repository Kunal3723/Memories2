import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles";
import Post from "./Post/Post.js";
import { useEffect } from 'react';
function Posts({ setCurrentId }) {
    let posts = useSelector((state) => state.posts);
    
    useEffect(() => {
         
    }, [posts]);

    const classes = useStyles();
    return (
        !posts.length ? <CircularProgress></CircularProgress>
            : <Grid className={classes.container} container alignItems="stretch" spacing={3}>{
                posts.map(function (post) {
                    return <Grid key={post._id} item xs={12} sm={6} md={6}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                })
            }</Grid>
    );
}

export default Posts;
