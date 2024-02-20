using dynamicListSaveSearch as my from '../db/data-model';

service CatalogService {
     entity TablesList as projection on my.TablesList;
     entity ColumnSettings as projection on my.ColumnSettings;
     entity TableFeatures as projection on my.TableFeatures;
     entity FeatureSettings as projection on my.FeatureSettings;
}
