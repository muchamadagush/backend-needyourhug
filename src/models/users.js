const conn = require("../configs/db");

const getUser = (userId, page, perPage, search) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE id != '${userId}' AND users.name LIKE '%${search}%'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updatePhoneUser = (id, phone) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET phone = '${phone}' WHERE id = '${id}'`, (error, result) =>{
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updateUsernameUser = (id, username) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET username = '${username}' WHERE id = '${id}'`, (error, result) =>{
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updateBioUser = (id, bio) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET bio = "${bio}" WHERE id = '${id}'`, (error, result) =>{
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updateAvatarUser = (id, data) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET avatar = "${data}" WHERE id = '${id}'`, (error, result) =>{
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getUserProfile = (id) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const updateRole = (id, newRole) => new Promise((resolve, reject) => {
  conn.query(`UPDATE users SET role = '${newRole}' WHERE id = '${id}'`, (error, result) =>{
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getPsikolog = () => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE role = 'psikolog' ORDER BY users.name ASC`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const deletePsikolog = (id) => new Promise((resolve, reject) => {
  conn.query(`DELETE FROM users WHERE id = '${id}'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

const getUSerByRole = (role) => new Promise((resolve, reject) => {
  conn.query(`SELECT * FROM users WHERE role != '${role}' AND role != 'admin'`, (error, result) => {
    if (!error) {
      resolve(result)
    } else {
      reject(error)
    }
  })
})

module.exports = {
  getUser,
  updatePhoneUser,
  getUserProfile,
  updateUsernameUser,
  updateBioUser,
  updateAvatarUser,
  updateRole,
  getPsikolog,
  deletePsikolog,
  getUSerByRole
}