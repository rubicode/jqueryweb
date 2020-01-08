var express = require('express');
var router = express.Router();
var data = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json(data)
});

router.post('/', (req, res) => {
  let id = Date.now().toString();
  let nama = req.body.nama;
  let umur = req.body.umur;
  let dataAdd = {id, nama, umur};
  data.push(dataAdd);
  res.status(201).json({err: false, data : dataAdd})
})

router.get('/:id', function(req, res, next) {
  res.status(200).json(data.filter((item => item.id == req.params.id))[0])
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let deletedItem = data.filter((item => item.id == id))
  console.log(data, deletedItem);
  data = data.filter((item => item.id != id))
  res.status(201).json({
    err: deletedItem.length > 0 ? false : true,
    data: deletedItem[0]
  })
})

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let dataEdit = {id, nama: req.body.nama, umur: req.body.umur}
  data = data.map((item) => {
    if(item.id == id){
      return dataEdit;
    }else{
      return item;
    }
  })
  res.status(201).json({err: false, data : dataEdit});
})



module.exports = router;
