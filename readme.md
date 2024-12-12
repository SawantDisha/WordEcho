
Blog App
========

This project contains a full-stack blog application with the following components:

*   **Frontend**: React (built with Vite)
*   **Backend**: Python FastAPI
*   **Database**: MySQL with base migration using `db.sql`

Setup Instructions
------------------

### Prerequisites

*   Docker and Docker Compose installed on your machine.

### Build and Run the Application

1.  Clone the repository and navigate to the root directory.
2.  Run the following command to build and start all services:    
    
```
docker-compose up --build
```
    

### Stop the Services

To stop and remove all containers, networks, and volumes created by Docker Compose, run:

```
docker-compose down
```