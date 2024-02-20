// Import necessary modules and setup your database connection
const cds = require('@sap/cds');

// Function to get all data from the Tables List
const getAllTables = async () => {
    try {
        const tablesListData = await cds.read('Tables_List');
        return tablesListData;
    } catch (error) {
        throw new Error('Error fetching data from Tables List');
    }
};

module.exports = {
    getAllTables
};
