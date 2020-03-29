# GraphQL Server for NY Times covid-19 data set
[GraphQL Playground](https://graph-cv19.iscottrichardson.com/)

This is a GraphQL server that consumes the NY Times data source for covid-19 and serves it using GraphQL queries.

## Getting Started
__Visit https://graph-cv19.iscottrichardson.com/ to use the server__  
or  
__Create your own__  
```sh
$ git clone https://github.com/scottjr632/graph-covid-19.git && cd $_
$ yarn install
$ # development environment
$ yarn start:dev
$ # productin
$ yarn build
$ yarn start:prod
```

__You can navigate to http://localhost:4000 to get to the GraphQL explorer to explorer the API.__

### Disclaimer: This is not an official server of the NYTimes
### Link to data-source [covid-19-data](https://github.com/nytimes/covid-19-data)
