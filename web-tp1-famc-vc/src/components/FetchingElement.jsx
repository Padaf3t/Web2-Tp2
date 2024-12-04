import React from "react";
import { Spinner, Fade } from "react-bootstrap";

/**
 * Composant permettant d'afficher un visuel lorsque les données sont en cours de récupération
 * @param isFetching - si les données sont présentement en récupération
 * @returns {Element}
 * @constructor
 */
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