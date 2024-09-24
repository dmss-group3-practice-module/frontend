# Frontend (Practice Module)

### Getting Started

1. Ensure node is installed on your machine
2. Install Prettier extention on VSCode

### Commands

#### npm

`npm i` - install project dependencies  
`npm run prepare` to setup husky (one-time setup)  
`npm run dev` - start application locally on localhost:3000

#### Docker

```sh
# build a docker container named feats-frontend with the latest tag
docker build -t feats-frontend .

# run the docker container on port 3000
docker run -d -p 3000:80 feats-frontend
```

### Running Tests

Run unit tests by running the following command:
`npm run test`

### Folder Structure

```
🗂️── __tests__               Unit tests
🗂️── dist                    Compiled files
🗂️── src                     Source files
|  ├──🗂️ __mock              Mock data
|  ├──🗂️ components          Components used throughout the application
|  ├──🗂️ hooks               Custom React hooks
|  ├──🗂️ layouts             Overall application presentation layer
|  ├──🗂️ pages               Specific pages of application
|  ├──🗂️ routes              Routing for different pages
|  ├──🗂️ sections            Module-specific views
|  ├──🗂️ theme               Themes for components and application
|  ├──🗂️ utils               Other helpful utility functions
|  ├── README.md
|  └── package.json          Project dependencies
└── ...
```

### Commit Message Guidelines

`husky` is used as a commit linting tool to check and enforce a [commit message guideline](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

Get husky setup by running `npm run prepare`.

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Example:

```
feat: add user login page
```

## Continuous Integration

The project is using [GitHub Actions](https://docs.github.com/en/actions) for the Continuous Integration (CI) pipeline.

Refer to `.github/workflows/build.yml` file for the detailed steps in the CI pipeline.

The following diagram illustrates the overview of the CI workflow:

```mermaid
flowchart LR
    A[Build] --> B[Run tests] --> C[Build Docker Containers] --> D[Deploy to DockerHub]
```

```mermaid
flowchart LR
    A[Scanning]
    A -->|SAST| B[1- Aikido Scan
2. Linting with JSHint]
    A -->|SCA| C[Aikido Scan]
    A -->|DAST| D[ZAP scan]
```

**TODO**: to deploy to DigitalOcean Container Registry instead of DockerHub
