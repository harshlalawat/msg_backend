# workspace

Welcome to the Workspace backend repository! This project aims to provide a backend solution for managing discussions within a workspace environment. It is built using Express, a popular Node.js framework for building web applications and APIs, coupled with PostgreSQL as our database of choice.

## Setup Instructions

To set up the Workspace backend locally, follow these steps:

#### 1. Clone The Repo:
   
   ```bash
   git clone https://github.com/CQ-Dev-Team/workspace.git
   ```
   
   OR

   ```bash
   gh repo clone CQ-Dev-Team/workspace
   ```
#### 2. Install Dependencies:

   ```bash
   cd workspace && npm i
   ```
#### 3. Config Enviroment Variable

   1. Create a .env file in the root dir and in config dir.
   2. Please Check env.example for the required fields.
   3. For Local env.example can be used directly


#### 4. Config Database
   1. Install PostgreSQL on your computer if you haven't already. You can download it from the [official PostgreSQL website.](https://www.postgresql.org/download/)
   2. Create a new database named "workspace" within PostgreSQL. You can do this using a PostgreSQL administration tool like pgAdmin or by running SQL commands in your terminal.
   3. Replace placeholders in the package.json file with your actual credentials. Look for <user> and <password> placeholders and substitute them with your PostgreSQL username and password respectively.
   4. Ensure PostgreSQL is running on the correct port. By default, PostgreSQL runs on port 5432. If your PostgreSQL instance is running on a different port, make sure to update the configuration accordingly
   5. After configuring your database, navigate to the project directory in your terminal.
   6. Run migrations using the following command:
   ```bash
      npm run up
   ```

#### 5. Starting Server

   ```bash
   npm run start:dev
   ```

   Can be used to start the server.
   By default it will start on port 5555, but can be changed by providing port.

   ###### Example :->

   ```bash
   npm run start:dev 6000
   ```
   
   This will start server on port 6000

## Contribution Guidlines

If you'd like to contribute to this project, feel free to submit pull requests or open issues. Please follow the exisiting code styles and ensure your changes are well-tested.


<hr>

#### Sending Email

For local development, you can utilize [Etherial Mail](https://ethereal.email/), a simulated SMTP service. It functions as a faux mail delivery system, meaning no emails are actually sent; instead, they are displayed in a message list for inspection. You can either employ the pre-configured account provided in the .env.example file or create your own account through the [Etherial Mail](https://ethereal.email/) website for testing purposes.

<hr>

<br>
<br>

Shield: [![CC BY-NC 4.0][cc-by-nc-shield]][cc-by-nc]

This work is licensed under a
[Creative Commons Attribution-NonCommercial 4.0 International License][cc-by-nc].

[![CC BY-NC 4.0][cc-by-nc-image]][cc-by-nc]

[cc-by-nc]: https://creativecommons.org/licenses/by-nc/4.0/
[cc-by-nc-image]: https://licensebuttons.net/l/by-nc/4.0/88x31.png
[cc-by-nc-shield]: https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg