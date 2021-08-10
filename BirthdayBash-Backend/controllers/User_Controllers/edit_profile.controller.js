const createError = require("http-errors");
const db = require("../../db/index");
const bcrypt = require("bcrypt");
const { userEditSchema } = require("../../helper/validation");

module.exports = {
  editProfile: async (req, res, next) => {
    try {
      const result = await userEditSchema.validateAsync(req.body);

      const { newUsername, newBio, newPassword } = result;

      const { user_id } = req.payload;
      const paramToUpdate = [];
      const argsArr = [];
      const funcReturnArr = [];

      // const usernameChangeCountCheck = async () => {
      //   const res = await db.query(
      //     "SELECT username_change_count FROM users where user_id = $1",
      //     [user_id]
      //   );
      //   const count = res.rows[0].username_change_count;

      //   if (count == 2) {
      //     return createError.BadRequest(
      //       "Username can only be changed two times a week"
      //     );
      //   } else {
      //     const newCount = count + 1;
      //     await db.query(
      //       "UPDATE users SET username_change_count = $1 WHERE user_id = $2",
      //       [newCount, user_id]
      //     );
      //   }
      // };

      argsArr.push(user_id);

      if (newUsername) {
        // usernameChangeCountCheck();
        // paramToUpdate.push("username");
        // argsArr.push(newUsername);
        // funcReturnArr.push("username");
        const client = await db.connect();
        try {
          await client.query("BEGIN");
          await client.query("UPDATE users SET username=$1 WHERE user_id=$2", [
            newUsername,
            user_id,
          ]);
          await client.query(
            "UPDATE followers SET dest_username=$1 WHERE dest_user_id=$2",
            [newUsername, user_id]
          );
          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          next(error);
        } finally {
          client.release();
        }
      }

      if (newPassword) {
        paramToUpdate.push("password");
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        argsArr.push(hashedPassword);
      }

      if (newBio) {
        paramToUpdate.push("bio");
        argsArr.push(newBio);
        // funcReturnArr.push("bio");
      }

      if (newBio || newPassword) {
        let mainQuery = `UPDATE users SET ${paramToUpdate.map(
          (col, i) => `${col} = $${2 + i}`
        )} WHERE user_id = $1`;
        await db.query(mainQuery, argsArr);
      }
      // let returnQuery = `RETURNING ${funcReturnArr.join(", ")} `;

      // let finalQuery;

      // if (newBio) {
      //   finalQuery = mainQuery + " " + returnQuery;
      // } else {
      //   finalQuery = mainQuery;
      // }

      // const queryResult =await db.query(mainQuery, argsArr);

      // res.json(queryResult.rows[0]);
      res.send("Updated Details Successfully");
    } catch (error) {
      if (error.isJoi == true) {
        const details = error.details;
        const errors = details.map((i) => i.message).join(",");

        return next(createError.NotAcceptable(errors));
      }
      next(error);
    }
  },
};
