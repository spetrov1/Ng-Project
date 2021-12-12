# Recipes App with learning objective

#### Project development included consideration of topics like:

* Components & Directives
* Eventbinding & Databinding
* Dependency injection
* Routing
* Observables
* Handling Form - Template-driven approach & Reactive approach
* Pipes
* HttpRequests
* NgRx approach for managing app state (NgRxIntegration branch uses it)


### Steps on starting the App via Docker

1. Navigate terminal to Project root directory

2. Run --> docker build -t ng-project-img .

3. Run --> docker run --name ng-project-container -p 80:80 -d --rm ng-project-img

4. Visit --> https://localhost:80