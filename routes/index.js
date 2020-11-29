var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dashboard');
});

// router.get('/country', function(req, res, next) {
//   res.render('country');
// });
// list page //
router.get('/country', function (req, res, next) {

  try {
    mongoose.model("Drop").find({}, (err, stateObj) => {
      if (err) {
        console.log(err);
      } else {
        res.render('country', { stateObj: stateObj });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/add', function(req, res, next) {
  res.render('Add');
});

// add data//
router.post('/savedata', function (req, res, next) {
  try {
    var reqs = req.body;
    console.log(reqs);
    var state = {
      country_name:reqs.country_name,
      state_name: reqs.state_name,
      district_name:reqs.district_name,
      status: 1
    }
    mongoose.model("Drop").create(state, (err, dropObj) => {
      if (dropObj) {
        console.log(dropObj);
        res.redirect('country');
      } else {
        console.log('failure');
      }
      
    });
  } catch (e) {
    console.log(e);
  }
});


// display page//
router.get('/dropdown', function (req, res, next) {
  try {
    var dataArr = [];
    mongoose.model("Drop").find({}, (err, stateObj) => {
      if (err) {
        console.log(err);
      } else {
        for (let i = 0; i < stateObj.length; i++) {
          console.log(dataArr.indexOf(stateObj[i].country_name))
          if (dataArr.indexOf(stateObj[i].country_name) == -1) {
            dataArr.push(stateObj[i].country_name)
          }
        }
        console.log(dataArr)
        res.render('page', { stateObj: dataArr })
      }
    });

  }
  catch (e) {
    console.log(e);
  }
});

// drop display
router.get('/dropselect', function (req,res,next) {
  res.render('drop select');
});

/* Request For state dropdowm  */
router.post('/getcountryDetail',  function (req, res, next) {
  try {
    let reqs = req.body;
    var dataArr = [];
    console.log(reqs.country_ty);
    mongoose.model('Drop').find({ 'country_name': reqs.country_ty }, function (err, stateArray) {
      if (err) {
        console.log(err);
        res.json({ data: 'Failure' });
      } else {
        if (stateArray) {
          console.log(stateArray)
          for (let i = 0; i < stateArray.length; i++) {
            console.log(dataArr.indexOf(stateArray[i].state_name))
            if (dataArr.indexOf(stateArray[i].state_name) == -1) {
              dataArr.push(stateArray[i].state_name)
            }
          }
          console.log(dataArr)
          res.send({ stateArray: dataArr });
        } else {
          res.json({ data: 'Failure' });
          console.log('Object Failure');
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});


/* Request For district dropdowm  */
router.post('/getstateDetail',  function (req, res, next) {
  try {
    let reqs = req.body;
    console.log(reqs.state_ty);
    mongoose.model('Drop').find({ 'state_name': reqs.state_ty }, function (err, districtArray) {
      if (err) {
        console.log(err);
        res.json({ data: 'Failure' });
      } else {
        if (districtArray) {
          res.send({ districtArray: districtArray });
        } else {
          res.json({ data: 'Failure' });
          console.log('Object Failure');
        }
      }
    });
  } catch (e) {
    console.log(e);
  }
});

router.get('/page_veriy_user', function (req, res, next) {
  var u_id = req.data;
  console.log(req.session)
  if (u_id != '' && u_id != undefined) {
    mongoose.model('Drop').find({}, function (err, data) {
      if (err) { console.log(err) }
      else {
        // console.log(data);
        res.json({ "data": data });
      }

    });
  } else {
    res.send({ massage: 'failure' })
  }

});

router.get('/product', function(req, res, next) {
  res.render('product');
});





module.exports = router;
