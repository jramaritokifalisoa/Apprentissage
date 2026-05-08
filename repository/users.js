const db = require("../db");
module.exports.getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users WHERE role = $1", [
    "user",
  ]);
  return result;
};
module.exports.userAllDetail = async (id) => {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1 AND role = $2",
    [id, "user"],
  );
  return result;
};
module.exports.removeAllUser = async (id) => {
  const client = await db.connect();
  try{
     await client.query("BEGIN");

  await client.query("DELETE FROM roles WHERE user_id = $1", [id]);

  const result = await client.query(
    "DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *",
    [id, "user"],
  );

  await client.query("COMMIT");

  return result;
  }catch(err){
    await client.query("ROLLBACK");
    throw err;
  }finally {
    client.release();
  }
 
};
