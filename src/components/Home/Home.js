import React from 'react'
import { AppBar, Container, Typography, Grow, Grid } from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from "../../styles";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getPosts } from '../../redux/actions/posts';
function Home() {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={4}>
                    <Grid item xs={12} sm={7}>

                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home