import axios from 'axios'


enum OutputFormat {
    json,
    xml
}

type ResultFormat = {
    lat: (number: number) => number,
    lng: (number: number) => number,
    formattedAddress: string,
    viewport: object,
    placeId: string
}


class ConvertAddressToGeocodes {
    _endpoint: string = 'https://maps.googleapis.com/maps/api/geocode'
    _apiKey: string 
    _outputFormat: OutputFormat = 0 // json as default

    constructor(initApiKey: string) {
        this._apiKey = initApiKey 
    }

    set outputFormat(newOutputFormat: OutputFormat) {
        this._outputFormat = newOutputFormat
    }

    getParams(newAddress: string): string {
        const params: string = [
            `address=${newAddress}`,
            `key=${this._apiKey}`
        ].join('&')
        return params
    }

    formatResultData(data: google.maps.GeocoderResult[]): ResultFormat[] {
        return data.map((datum: google.maps.GeocoderResult): ResultFormat => {
            return {
                lat: datum.geometry.location.lat,
                lng: datum.geometry.location.lng,
                formattedAddress: datum.formatted_address,
                viewport: datum.geometry.viewport,
                placeId: datum.place_id
            }
        })
    }

    async getGeocodesForAddress(newAddress: string) {
        if (!newAddress) return // return error 
        const newParams = this.getParams(newAddress)
        const url = this._endpoint + '/' + this._outputFormat + '?' + newParams
        const res = await axios ({
            url: url,
            method: 'get',
            headers: {
                'Accept': `application/${this._outputFormat}`
            }
        })
        if (res.status !== 200) return Promise.reject(res)
        return Promise.resolve({
            data: this.formatResultData(res.data.result),
            status: res.status,
            statusText: res.statusText
        })
    }
}


export { ConvertAddressToGeocodes }
