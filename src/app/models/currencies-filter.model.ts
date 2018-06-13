
import { IHttpParamsBuilder } from './ihttp-params-builer';
import { HttpParams } from '@angular/common/http';

export enum FilterType {
    Id = 'id',
    Code = 'code',
    Name = 'name',
    Type = 'type'
}

export class CurrenciesFilter implements IHttpParamsBuilder {
    type: FilterType;
    filter: string;

    constructor(type?: FilterType, filter?: string) {
        if (type !== undefined) {
            this.type = type;
        }

        if (filter !== undefined) {
            this.filter = filter;
        }
    }

    getParams(): HttpParams {
        let parms = new HttpParams();

        switch (this.type) {
            case FilterType.Id:
            parms = parms.append('filter[search]', this.filter);
            break;
            case FilterType.Code:
            parms = parms.append('filter[code_iso_alpha3]', this.filter);
            break;
            case FilterType.Name:
            parms = parms.append('filter[search]', this.filter);
            break;
            case FilterType.Type:
            parms = parms.append('filter[currency_type]', this.filter);
            break;
        }

        return parms;
    }

    isEmptyFilter(): boolean {
        return this.filter === undefined || this.filter === '';
    }
}
