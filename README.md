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


### Steps on deploying the App on local Kubernetes cluster (TODO not sure if it is 100% correctly said)

1. Navigate terminal to Project root directory

2. minikube start

3. Run --> kubectl apply -f deployment.yaml -f service.yaml

4. Run --> minikube service recipes-app-service

5. Visit --> Displayed URL