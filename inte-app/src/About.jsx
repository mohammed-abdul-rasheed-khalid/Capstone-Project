export default function About() {
    return (
        <div style={{ padding: "20px", lineHeight: "1.6" }}>
            <h2>About This Project</h2>
            <p>
                This project is a <strong>web-based application</strong> that integrates directly with the 
                <strong> ServiceNow platform</strong> to provide seamless Incident Management.
                It allows users to <strong>view, create, update, and delete (CRUD)</strong> incidents 
                in real time through an easy-to-use interface.
            </p>

            <p>
                The system connects to the <strong>ServiceNow REST API</strong>, enabling two-way 
                communication between this portal and the ServiceNow instance. All operations performed here — 
                such as creating a new incident, editing details, or deleting records — are automatically 
                reflected in the connected ServiceNow environment.
            </p>

            <h3>Key Features</h3>
            <ul>
                <li> <strong>Real-Time Integration:</strong> Uses ServiceNow REST API for live data synchronization.</li>
                <li> <strong>Incident Listing:</strong> Displays all incidents fetched directly from the ServiceNow table.</li>
                <li> <strong>CRUD Operations:</strong> Create, Read, Update, and Delete incidents directly from the web app.</li>
                <li> <strong>Secure Access:</strong> API authentication handled safely using credentials and headers.</li>
                <li> <strong>User-Friendly Interface:</strong> Simple layout for efficient IT service management.</li>
            </ul>

            <h3>Technology Stack</h3>
            <ul>
                <li><strong>Frontend:</strong> React, Material UI</li>
                <li><strong>Backend:</strong> Node.js / Express.js (BFF) (connected via REST API), OAuth2.0</li>
                <li><strong>Platform Integration:</strong> ServiceNow (Incident Table: <code>incident</code>)</li>
                <li><strong>API Communication:</strong> RESTful API with JSON data format</li>
            </ul>

            <h3>Purpose</h3>
            <p>
                The main goal of this project is to <strong>simplify the management of incidents</strong> 
                for IT teams by providing a lightweight external interface connected to ServiceNow.
                It demonstrates complete API-driven operations while maintaining data consistency 
                between systems.
            </p>
        </div>
    );
}
