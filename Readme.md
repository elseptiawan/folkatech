### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [docker](https://www.docker.com/)

### How to run on local
1. Clone this repository
2. Run `npm install` in the root directory
3. Create `.env` file in the root directory
4. Copy the content of `.env.example` to `.env`
5. Configure the `.env` file
6. Run `npm run start` in the root directory
7. Run API on http://localhost:3000

### How to run on docker
1. Clone this repository
2. Make Sure Docker is running
3. Run `docker-compose up` in the root directory
4. Run API on http://localhost:3000

### Request List
1. Generate Token
    - Endpoint: `/api/generate-token`
    - Method: `GET`
2. Create User
    - Endpoint: `/api/users`
    - Method: `POST`
    - Authorization : `bearer token`
    - Body:
        ```json
        {
            "userName" : "TonyStark",
            "accountNumber" : 1234567890,
            "emailAddress" : "tonystark@gmail.com",
            "identityNumber" : 1234567890
        }
        ```
3. Update User
    - Endpoint: `/api/users/:id`
    - Method: `PUT`
    - Authorization : `bearer token`
    - Body:
        ```json
        {
            "userName" : "TonyStark",
            "accountNumber" : 1234567890,
            "emailAddress" : "tonystart@gmail.com",
            "identityNumber" : 1234567890
        }
        ```
4. Get All Users
    - Endpoint: `/api/users`
    - Method: `GET`
5. Get User By ID
    - Endpoint: `/api/users/:id`
    - Method: `GET`
6. Get User By Account Number
    - Endpoint: `/api/users/account-number/:accountNumber`
    - Method: `GET`
7. Get User By Identity Number
    - Endpoint: `/api/users/identity-number/:identityNumber`
    - Method: `GET`
8. Delete User
    - Endpoint: `/api/users/:id`
    - Method: `DELETE`
