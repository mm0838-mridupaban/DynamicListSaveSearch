// namespace my.bookshop;

// entity Books {
//   key ID : UUID;
//   title  : String;
//   stock  : Integer;
// }

namespace dynamicListSaveSearch;

entity TablesList {
    key table_id : String;
    description : String;
    entitySelected : String;
    // Table : Association to many ColumnSettings on Table.column_id = $self.table_id;
      AllColumns:Association to many ColumnSettings on  AllColumns.table_id = table_id;  
      Features:Association to many FeatureSettings on  Features.table_id = table_id;  
}

entity ColumnSettings {
    key column_id : Integer;
    table_id : String;
    column_name : String;
    display_order : Integer;
    is_visible : Boolean;
    // Association to "TablesList" entity
    Table : Association to TablesList on Table.table_id = $self.table_id;
}

// entity TableFeatures {
//     key feature_id : String;
//     table_id : String;
//     feature_name : String;
//     is_enabled : Boolean;
//     // Association to "TablesList" entity
//     Table : Association to TablesList on Table.table_id = $self.table_id;
// }


entity FeatureSettings {
    key setting_id : Integer;
    table_id : String;
    column_name : String;
    feature_name : String;
    setting_name : String ;
    setting_value : String;
    // Table : Association to TablesList on Table.table_id = $self.table_id;

    // column_id : String; // New column
    // Foreign key referencing "column_id" in the "Tables List" table
    // Column : Association to ColumnSettings on Column.column_id = $self.column_id;
    // Association to TableFeatures entity
    // Feature : Association to TableFeatures on Feature.feature_id = $self.feature_id;
}


entity Users {
    key id : UUID;
    name : String;
    email : String;
    password : String;
}
