const UserModel = require('../model/User')
const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId

exports.register = (data) =>
  new Promise((resolve, reject) =>{
    UserModel.findOne({
      username: data.username
    }).then((user) =>{
      if (user) {
        reject({
          sukses: false,
          pesan: 'User already exists lah'
        })
      }else{
        bcrypt.hash(data.password, 10, (err, hash) => {
          data.password = hash
          UserModel.create(data)
            .then (() => {
              resolve({
                sukses: true,
                pesan: 'Berhasil register'
              })
            }).catch(() => {
              reject({
                sukses: false,
                pesan: 'Gagal register'
              })
            })
          })
      }
    })
   })

exports.login = (data) => 
   new Promise((resolve, reject) => {
     UserModel.findOne({
       username: data.username
     }).then((user) => {
       if (user) {
        if (bcrypt.compareSync(data.password,user.password)){
          resolve({
            sukses: true,
            pesan: 'Berhasil login',
            data: user
          })
        }else{
          reject({
            sukses: false,
            pesan: 'Wrong Passwords'
          })
        }
       }else{
         reject({
           sukses: false,
           pesan: 'User not found'
         })
       }
     })
   })

   exports.tampilUser = () =>
  new Promise((resolve, reject) => {
    UserModel.find()
      .then(data => {
        resolve ({
          sukses: true,
          pesan: 'User has been showed',
          data: data
        })
      }).catch(() => {
        reject ({
          sukses: false,
          pesan: 'User cannot be showed',
          data: {}
        })
      })
  })

exports.editUser = (data, id) =>
  new Promise((resolve, reject) => {
    UserModel.updateOne({
      _id: ObjectId(id)
    }, data).then(() => {
        resolve ({
          sukses: true,
          pesan: 'update success'
        })
      }).catch(() => {
        reject ({
          sukses: false,
          pesan: 'update failed'
        })
      })
    })

exports.tampilUserOne = (id) =>
    new Promise((resolve, reject) => {
      UserModel.findOne({
        _id: ObjectId(id)
      }).then((data) => {
        resolve(data)
      }).catch(() => 
        reject({
          sukses: false,
          pesan: 'gagal memuat data'
        })
      )
    })

exports.hapusData = (id) =>
    new Promise((resolve, reject) => {
      UserModel.deleteOne({
        _id: ObjectId(id)
      }).then(() => {
        resolve({
          sukses: true,
          pesan: 'Delete Success'
        })
      }).catch(() => {
        reject({
          sukses: false,
          pesan: 'Delete Failes'
        })
      })
    })