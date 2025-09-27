using {s4EpmProducts as external} from './external/s4EpmProducts.csn';

service ProductService {
    @cds.persistence.skip
    entity Products as projection on external.Products {
        key Id, Name, Description, StockQuantity, QuantityUnit, Price
    };

}