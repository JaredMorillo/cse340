const pool = require("../database/"); //This line finds the index.js in the database folder and stores its values, methods, etc in a variable named pool. This is in order for us to be able to use the query method in the pool object already built in the index.js inside de database folder, so that we do not have to write it, including the initialization of the pool object every time we need.

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM public.classification ORDER BY classification_name"
  );
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
  }
}

/* ***************************
 *  Get all vehicle details by inv_Id
 * ************************** */

async function getVehicleByInventoryId(inventory_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM inventory WHERE inv_id = $1`, [inventory_id]
    );
    return data.rows
  } catch (error) {
    console.error("getVehicleDetailsByInventoryId" + error)
  }
}



module.exports = {getClassifications, getInventoryByClassificationId, getVehicleByInventoryId};