import React from "react";
import { Spinner, Fade } from "react-bootstrap";

const FetchingElement = ({ isFetching }) => {
    return (
        <div style={{ marginTop: "30%", textAlign: "center" }}>
            <Fade in={isFetching}>
                <div>
                    <Spinner animation="border" role="status" style={{ marginBottom: "1rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <div>Fetching data</div>
                </div>
            </Fade>
        </div>
    );
};

export default FetchingElement;