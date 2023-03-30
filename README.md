# Employee Management System

## Description

This application is a CLI intended to help users keep track of a business. It is seeded with fictional departments, roles, and employees for demonstration, and is capable of displaying database info in the console as a table, as well as editing said info based on user input.

[screenshot of CLI](./assets/images/Screenshot%20(6).png)

## Table of Contents
- [Usage](#usage)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Usage

This application is intended to be run in the command line on the user's machine. It uses MySQL, JavaScript, and the npm Inquirer package to turn user input into database manipulation with ease.

## Installation

After cloning this repo to your local machine, simply run `npm i` in the terminal, log into MySQL, and seed the database by running `SOURCE db/schema.sql;` followed by `SOURCE db/seeds.sql;` then `node index` to start.
