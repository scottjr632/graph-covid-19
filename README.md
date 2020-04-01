# GraphQL Server for COVID-19 data
[GraphQL Playground](https://graph-cv19.iscottrichardson.com/)

This is a GraphQL server that consumes the NY Times data source and John Hopkins University (JHU CSSE) data source for covid-19 and serves it using GraphQL queries.

[NYT](https://github.com/nytimes/covid-19-data)  
[JHU CSSE](https://github.com/CSSEGISandData/COVID-19)  

### Using this project? [let me know!](https://github.com/scottjr632/graph-covid-19/edit/master/README.md)  
### or if you found an issue or want a new dataset, [create a new issue here](https://github.com/scottjr632/graph-covid-19/issues/new/choose)

## Getting Started
__Visit https://graph-cv19.iscottrichardson.com/ to use the server__  
or  
__Pull Docker image__
```sh
$ docker pull scottjr632/graph-covid-19
```
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

## Querying
### JHU CSSE
```
{
  jhu(filter: {last:10000, country:"us"}) {
    data {
	total
      nodes {
        country
        state
        ...
      }
    }
  }
}
```

### NY Times
```
{
  nytimes {
    counties {
      total
      nodes {
        cases
        ...
      }
    }
  }
  states {
    nodes {
      state
      ...
    }
  }
}
```

### Filters
```
type JHUFilter {
  last: Float = 100
  from: DateTime
  state: String
  sort: SortCovidInputType
  country: String
}
type CountyFilter {
  last: Float = 100
  from: DateTime
  state: String
  sort: SortCovidInputType
  county: String
}
type StateFilter {
  last: Float = 100
  from: DateTime
  state: String
  sort: SortCovidInputType
}
```

### License and Attribution
If you are using NY Times data please follow their [License and Attribution guide](https://github.com/nytimes/covid-19-data#license-and-attribution). Other than that this project is open source and is accepting pull request  and issue request!

#### Disclaimer: This is not an official server of the NYTimes or of JHU
