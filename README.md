# CUSTOS
![Server Continuous Integration](https://github.com/dcsil/Custos/workflows/Server%20Continuous%20Integration/badge.svg)
![Client Continuous Integration](https://github.com/dcsil/Custos/workflows/Client%20Continuous%20Integration/badge.svg)
![Deploy to Heroku](https://github.com/dcsil/Custos/workflows/Deploy%20to%20Heroku/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7168a13ecb7ac8f3c498/test_coverage)](https://codeclimate.com/repos/5f6d4b5bb5607a511c00428c/test_coverage)

![Team Logo](./logo.png)

![Alternate Logo](./logo-2.png)

Custos (meaning 'guard' in Latin) is a company founded in the cybersecurity industry. Custos aims to prevent dataloss within your company allowing you to operate with ease of mind.

Table of Contents
---

- [People](./team/)
- [Diversity](./team/diversity.md)
- [Product & Research](./product_research/)
    - [User Research](./product_research/user-research.md)
    - [Roadmap](./product_research/roadmap.md)
- [Getting Started](#getting-started)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Run](#run)
    - [Testing](#testing)
- [Architecture Diagram](#architecture-diagram)


## Getting Started

[View web application demo here](https://custos-client.herokuapp.com/)

### Requirements
To run this app locally, you will need:

* Docker

To develop this app, you will need:
* JavaScript (React)
* Python (Flask)

For testing:
* NPM and Jest
* PyTest

### Installation

To install application for development, clone repository using

```
git clone https://github.com/dcsil/Custos.git
```

### Run 

To run the app locally:
```
sudo bash script/bootstrap
```

To run either client or server individually:
```
cd client && sudo bash run_docker.sh
```
```
cd server && sudo bash run_docker.sh
```

### Testing

To run all tests:
```
sudo bash script/run_all_tests
```

 To test client:
 ```
 cd client && npm test
 ```

 To test server:

 ```
 cd server && pytest
 ```


## Architecture Diagram

![Architecture](./architecture-diagram.png)
