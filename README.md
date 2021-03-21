## Description

A wrapper to convert an address to geocodes using Google Maps Geocoding API.

## Installation

Step 1: Clone the repo 

```
git clone https://github.com/surferwat/react-hoc-dropzone-items-list.git
```

Step 2: Install the dependecies

```
cd <package_name>
npm install
```

Step 3: Build 
```
npm run-script build:clean
```

Step 4: Go to app folder and install the module

```
npm install /file/path/to/module
```

## Usage

```javascript
import { ConvertAddressToGeocodes } from 'package'


const address = 'correctly formatted address'
const apiKey = process.env.GOOGLE_MAPS_API_KEY 

const convertAddressToGeocodes = new ConvertAddressToGeocodes(apiKey)

await convertAddressToGeocodes
    .getGeoCodesForAddress(address)
    .then(data => console.log(data))
    .catch(e => console.error(e))
```

## Todo 

* [ ] Add error handling
* [ ] Add tests
* [ ] Add optional parameters for geocoding request


## References

* [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview#component-filtering)
* [Typescript and Google Maps](https://developers.google.com/maps/documentation/javascript/using-typescript)
  