using dynamicListSaveSearch as my from '../db/data-model';

service CatalogService {
     action TestAc(Name : String, Class : String) returns String;
     action Signup(name : String,email : String,password : String) returns String;
     action Login(email : String,password : String) returns String;
     entity TablesList      as projection on my.TablesList;
     entity ColumnSettings  as projection on my.ColumnSettings;
     // entity TableFeatures as projection on my.TableFeatures;
     entity FeatureSettings as projection on my.FeatureSettings;
     entity Users           as projection on my.Users;
}