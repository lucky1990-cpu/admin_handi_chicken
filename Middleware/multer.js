const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'FoodImages')
    },
    filename: function (req, file, cb) {
      
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix)
      var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
      const file_name = file.fieldname+'-'+Date.now() + '-'+Math.random().toString() + ext;
      console.log(file_name)

      cb(null,file_name)
    }
  })
  
  const upload = multer({ storage: storage })

module.exports= upload
