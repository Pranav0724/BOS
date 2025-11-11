const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const {userName, email, password} = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    user = new User({ userName, email, password });

    await user.save();
    
    res.status(200).json({success:true});
   
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (!user){
      return res.status(401).json({ msg: 'Invalid Email' });
    }

    
    if (password!=user.password) {
      return res.status(401).json({ msg: 'Invalid Password' });
    }

    res.status(200).json({msg: 'Login Successfully'});
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

