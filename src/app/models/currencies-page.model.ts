import { IPage } from "./ipage";
import { CurrenciesPageItem } from "./currencies-page-item.model";

export class CurrenciesPage implements IPage<CurrenciesPageItem> {
    data         :CurrenciesPageItem[];
    total        :number;
    pages        :number;
}