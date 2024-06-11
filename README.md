
# RD Log Web

This is a web application for managing a logistics module. It allows transportation companies to register, log in, edit their details, and accept or decline orders assigned to them.

## Table of Contents

-   [Technologies](#technologies)
-   [Dependencies](#dependencies)
-   [Installation and Usage](#installation-and-usage)
-   [API Endpoints](#api-endpoints)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)
-   [License](#license)

## 🚀 Technologies

-   **Frontend**: JavaScript, React
-   **Backend**: Java, Spring
-   **Database**: PostgreSQL
-   **Mock API**: JSON Server (for order data)

## ⚠️ Dependencies

Before you begin, ensure you have the following tools installed on your machine:

-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)
-   [Java](https://www.java.com/)
-   [Maven](https://maven.apache.org/)
-   [PostgreSQL](https://www.postgresql.org/)
-   An editor like [IntelliJ](https://www.jetbrains.com/idea/) or [Visual Studio Code](https://code.visualstudio.com/) (optional, but recommended for development)


## 📥  Installation  and usage

```bash  
  # Clone this repository  
$ git clone https://github.com/thamirescandidabarbosa/rd-log-web


# Access the project folder in your terminal
$ cd rd-log-web


# Install frontend dependencies 
$ npm install


# Start the React application 
$ npm start


# The application will be accessible at http://localhost:3000/

```  

##  📖 API Endpoints

### Authentication

The backend API handles company, admin operations and is implemented with Java + Spring. The order data is handled by a mock API using JSON Server. The backend API's repository can be found [here](https://github.com/pmagalhaes2/rd-log-api).


### Logistic Companies

-   `GET /logistic-companies`: Retrieves a list of all logistic companies.
-   `GET /logistic-companies/{id}`: Retrieves a logistic company by ID.
-   `POST /logistic-companies`: Registers a new logistic company.
-   `POST /logistic-companies/login`: Login using the new logistic company registration.
-   `PUT /logistic-companies/{id}`: Updates a logistic company's information.
-   `DELETE /logistic-companies/{id}`: Deletes a logistic company.

### Orders (Mock API)

-   `GET /orders`: Retrieves a list of all orders.
-   `GET /orders/{id}`: Retrieves an order by ID.
-   `PUT /orders/{id}`: Updates an order's status (accept or decline).

To start the mock API server for orders:
```bash
$ npm run server
```

## 🔧 Environment Variables

To run the application, you will need to configure the following environment variables:

### Backend (Spring)

-   `DB_URL`: URL of the database connection.
-   `DB_USERNAME`: Database username.
-   `DB_PASSWORD`: Database password.

Example configuration in a `.env` file:

```bash
DB_URL=jdbc:postgresql://localhost:5432/logistic
DB_USERNAME=postgres
DB_PASSWORD=password
```

### Frontend (React)

-   `REACT_APP_API_URL`: URL of the backend API.
-   `REACT_APP_ORDER_API_URL`: URL of the mock order API.
-   `REACT_APP_CALCULATE_DISTANCE_KEY`: API Key of Distance Matrix API. 

Example `.env` file for frontend:


```bash 
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ORDER_API_URL=http://localhost:3001
REACT_APP_CALCULATE_DISTANCE_KEY= 
```

## Contributing

If you would like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch with your feature or fix: `git checkout -b my-feature`.
3.  Commit your changes: `git commit -m 'Add some feature'`.
4.  Push to the branch: `git push origin my-feature`.
5.  Open a pull request.

Please make sure to update tests as appropriate.

  ---

Feito por [Patricia Magalhães](https://github.com/pmagalhaes2), [Cristina Giardini](https://github.com/cristina-giardini), [Thamires Barbosa](https://github.com/thamirescandidabarbosa), [Katherine Uchoas](https://github.com/katherineuchoas) e [Sophia Contesini](https://github.com/sophiacontesini) 💙