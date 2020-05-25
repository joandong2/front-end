import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Container, Grid, Card, Message } from "semantic-ui-react";
import Sidebar from "./Sidebar";

import { getArticles } from "../actions/articles";
import { deleteArticle } from "../actions/articles";

const Articles = (props) => {
    useEffect(() => {
        props.getArticles();
    }, []);

    //console.log("..", props.articles);
    return (
        <Container className="dashboard">
            <Grid columns={2} divided>
                <Grid.Row>
                    <Sidebar />
                    <Grid.Column width={13}>
                        {props.message ? (
                            <Message size="tiny" color="red">
                                {props.message}
                            </Message>
                        ) : null}
                        <Grid columns={4} className="articles">
                            <Grid.Row>
                                {props.isLoaded ? (
                                    props.articles.map((article) => {
                                        return (
                                            <Grid.Column
                                                className="article"
                                                key={article.id}
                                            >
                                                <Card>
                                                    <Card.Content
                                                        href={article.url}
                                                        target="_blank"
                                                        header={article.name}
                                                        meta={article.publisher}
                                                        description={article.description.substr(
                                                            0,
                                                            35
                                                        )}
                                                    />
                                                    <div className="card-buttons">
                                                        <a
                                                            type="button"
                                                            href={`/edit-article/${article.id}`}
                                                        >
                                                            <i
                                                                aria-hidden="true"
                                                                className="brown edit circular inverted icon"
                                                            ></i>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            onClick={() => {
                                                                props.deleteArticle(
                                                                    article.id
                                                                );
                                                            }}
                                                        >
                                                            <i
                                                                aria-hidden="true"
                                                                className="brown trash circular inverted icon"
                                                            ></i>
                                                        </a>
                                                    </div>
                                                </Card>
                                            </Grid.Column>
                                        );
                                    })
                                ) : (
                                    <p>Loading articles..</p>
                                )}
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

// hook up the connect to our store
const mapStateToProps = (state) => {
    console.log("article state", state);
    return {
        isLoading: state.articles.isLoading,
        isLoaded: state.articles.isLoaded,
        articles: state.articles.articles,
        message: state.articles.message,
    };
};

export default connect(mapStateToProps, { getArticles, deleteArticle })(
    Articles
);
