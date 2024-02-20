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
}

entity ColumnSettings {
    key column_id : String;
    table_id : String;
    column_name : String;
    display_order : Integer;
    is_visible : Boolean;
    // Association to "TablesList" entity
    Table : Association to TablesList on Table.table_id = $self.table_id;
}

entity TableFeatures {
    key feature_id : String;
    table_id : String;
    feature_name : String;
    is_enabled : Boolean;
    // Association to "TablesList" entity
    Table : Association to TablesList on Table.table_id = $self.table_id;
}


entity FeatureSettings {
    key setting_id : String;
    feature_id : String;
    setting_name : String;
    setting_value : String;
    column_id : String; // New column
    // Foreign key referencing "column_id" in the "Tables List" table
    Column : Association to ColumnSettings on Column.column_id = $self.column_id;
    // Association to TableFeatures entity
    Feature : Association to TableFeatures on Feature.feature_id = $self.feature_id;
}








// entity FeatureSettings {
//     key setting_id : String;
//     feature_id : String;
//     setting_name : String;
//     setting_value : String;
//     // Association to TableFeatures entity
//     Feature : Association to TableFeatures on feature_id = $self.feature_id;
// }
