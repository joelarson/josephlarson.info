import React from 'react';
import { Link } from 'react-router';


const Temp = ({ children }) => (
    <section className="projects">
        <article>
            Welcome to root! <br/>
            <Link to="/projects/">View Projects</Link>
        </article>
    </section>
);


export default Temp;
